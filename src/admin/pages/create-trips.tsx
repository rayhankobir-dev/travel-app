/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import BreadcrumbView from "@/components/ui/custom-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Image, Minus, Plus, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";
import { authAxios, publicAxios } from "@/api";
import { ComboBox } from "@/components/ui/combobox";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const tourSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  overview: Yup.string().required("Overview is required"),
  cost: Yup.number()
    .required("Cost is required")
    .positive("Cost must be positive"),
  discount: Yup.number()
    .required("Discount is required")
    .positive("Discount must be positive"),
  tax: Yup.number()
    .required("Tax is required")
    .min(0, "Tax must be grater than or euqal zero")
    .max(100, "Tax can not 100%"),
  groupSize: Yup.number()
    .required("Group Size is required")
    .positive("Group Size must be positive"),
  startedAt: Yup.date().required("Start date is required"),
  endedAt: Yup.date().required("End date is required"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be positive"),
  minAge: Yup.number()
    .required("Minimum Age is required")
    .positive("Minimum Age must be positive"),
  maxAge: Yup.number()
    .required("Maximum Age is required")
    .positive("Maximum Age must be positive"),
  location: Yup.object().required("Location is required"),
  highlights: Yup.array()
    .of(
      Yup.object().shape({
        highlight: Yup.string().required("Highlight is required"),
      })
    )
    .optional(),
  services: Yup.array()
    .of(
      Yup.object().shape({
        service: Yup.string().required("Service is required"),
      })
    )
    .optional(),
  activities: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Activity title is required"),
      description: Yup.string().optional(),
    })
  ),
  faqs: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      answer: Yup.string().required("Answer is required"),
    })
  ),
  images: Yup.array()
    .of(
      Yup.mixed().test("fileType", "Unsupported File Format", (value: any) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      })
    )
    .min(4, "At least 4 image is required")
    .max(4, "You can upload up to 4 images only")
    .required("Images are required"),
});

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export default function AddTour() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(tourSchema),
    defaultValues: {
      cost: undefined,
      discount: 0,
      tax: undefined,
      minAge: 0,
      maxAge: undefined,
      groupSize: undefined,
      title: undefined,
      slug: undefined,
      location: undefined,
      overview: undefined,
      startedAt: undefined,
      endedAt: undefined,
      duration: undefined,
      highlights: [],
      services: [],
      activities: [],
      images: [],
    },
  });

  const {
    fields: highlightFields,
    append: addHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const {
    fields: serviceFields,
    append: addService,
    remove: removeService,
  } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const {
    fields: activityFields,
    append: addActivity,
    remove: removeActivity,
  } = useFieldArray({
    control: form.control,
    name: "activities",
  });

  const {
    fields: faqsFields,
    append: addFaq,
    remove: removeFaq,
  } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const formData = new FormData();
      if (data.images) {
        Array.from(data.images).forEach((image: any) => {
          formData.append("images", image);
        });
      }

      const res = await authAxios.post("/trips/upload-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formDataWithUrls = {
        ...data,
        highlights: data.highlights.map((item: any) => item.highlight),
        services: data.services.map((item: any) => item.service),
        images: res.data.urls,
      };

      await authAxios.post("/trips", formDataWithUrls);
      toast.success("Trip successfully added");
      form.reset();
    } catch (error: any) {
      const message = error?.message || error.response.data.message;
      toast.error(message || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "startedAt" || name === "endedAt") {
        const startedAt = value.startedAt ? new Date(value.startedAt) : null;
        const endedAt = value.endedAt ? new Date(value.endedAt) : null;
        if (startedAt && endedAt) {
          const differenceMs = Number(endedAt) - Number(startedAt);
          const differenceDays = Math.floor(
            differenceMs / (1000 * 60 * 60 * 24)
          );
          form.setValue("duration", differenceDays);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Update slug whenever the title changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title") {
        form.setValue("slug", slugify(value.title || ""));
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const existingImages = form.getValues("images") || [];
      const updatedImages = existingImages.concat(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      if (updatedImages.length > 4) {
        updatedImages.splice(4);
      }
      form.setValue("images", updatedImages, { shouldValidate: true });
    },
    [form]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 4,
  });

  const fetchLocations = async () => {
    const response = await publicAxios.get("/locations");
    return response.data.data.locations;
  };

  const images = form.watch("images") || [];

  const handleRemoveImage = (index: number) => {
    const existingImages = form.getValues("images") || [];
    const updatedImages = existingImages.filter((_, i) => i !== index);
    form.setValue("images", updatedImages, { shouldValidate: true });
  };

  return (
    <main className="h-full flex flex-col">
      <section className="border-b px-3">
        <BreadcrumbView className="pt-3" />
        <div className="py-3">
          <h2 className="font-medium text-2xl">Create new trips</h2>
          <p className="font-light text-sm">Make them published</p>
        </div>
      </section>
      <section className="p-3 h-full overflow-y-scroll">
        <Card>
          <CardContent className="p-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="px-1 w-full relative"
              >
                <div className="grid grid-cols-3 gap-2.5">
                  <FormField
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-2">
                        <Label htmlFor="title">Title *</Label>
                        <FormControl>
                          <Input
                            id="title"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Trip title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-1">
                        <Label htmlFor="slug">Slug(Auto Genreated) *</Label>
                        <FormControl>
                          <Input
                            id="slug"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Slug identifier"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-3 md:col-span-1">
                    <Label className="block mb-0.5 py-2">Location *</Label>
                    <Controller
                      name="location"
                      control={form.control}
                      render={({ field }: { field: any }) => (
                        <ComboBox
                          options={fetchLocations}
                          selected={field.value}
                          setSelected={(value) =>
                            form.setValue("location", value || {})
                          }
                          value="_id"
                          label="location"
                        >
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                          >
                            {field.value?.location
                              ? field.value.location
                              : "Select Location"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </ComboBox>
                      )}
                    />

                    {form.formState.errors.location && (
                      <p className="font-light text-sm text-rose-500">
                        {form.formState.errors.location.message}
                      </p>
                    )}
                  </div>

                  <FormField
                    name="cost"
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-1">
                        <Label htmlFor="cost">Cost *</Label>
                        <FormControl>
                          <Input
                            id="cost"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Per person fare"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="tax"
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-1">
                        <Label htmlFor="tax">Tax(%) *</Label>
                        <FormControl>
                          <Input
                            id="tax"
                            type="number"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Tax applied"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="groupSize"
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-1">
                        <Label htmlFor="groupSize">Group Size(People) *</Label>
                        <FormControl>
                          <Input
                            id="groupSize"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Group size"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-3 md:col-span-1 space-y-2">
                    <Label className="mb-2">Start At</Label>
                    <Controller
                      name="startedAt"
                      control={form.control}
                      render={({ field }) => (
                        <DatePicker
                          date={field.value}
                          setDate={(value: any) =>
                            form.setValue("startedAt", value)
                          }
                        >
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal text-black",
                              field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Trip start date</span>
                            )}
                          </Button>
                        </DatePicker>
                      )}
                    />

                    {form.formState.errors.startedAt && (
                      <p className="font-light text-sm text-rose-500">
                        {form.formState.errors.startedAt.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-3 md:col-span-1 space-y-2">
                    <Label className="mb-3">End At</Label>
                    <Controller
                      name="endedAt"
                      control={form.control}
                      render={({ field }) => (
                        <DatePicker
                          date={field.value}
                          setDate={(value: any) =>
                            form.setValue("endedAt", value)
                          }
                        >
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal text-black",
                              field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Trip end date</span>
                            )}
                          </Button>
                        </DatePicker>
                      )}
                    />
                    {form.formState.errors.endedAt && (
                      <p className="font-light text-sm text-rose-500">
                        {form.formState.errors.endedAt.message}
                      </p>
                    )}
                  </div>

                  <FormField
                    name="minAge"
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-1">
                        <Label htmlFor="minAge">Minium age Limit *</Label>
                        <FormControl>
                          <Input
                            id="minAge"
                            type="number"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Minimum age limit"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="maxAge"
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-1">
                        <Label htmlFor="maxAge">Maximum age Limit *</Label>
                        <FormControl>
                          <Input
                            id="maxAge"
                            type="number"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Maximum age limit"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="discount"
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-1">
                        <Label htmlFor="discount">Discount(%) *</Label>
                        <FormControl>
                          <Input
                            id="discount"
                            type="number"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Trip discount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="overview"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <Label htmlFor="overview">Overview *</Label>
                        <FormControl>
                          <Textarea
                            id="overview"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Write overview of the trip"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-3 mt-5 mb-2">
                  <Label>Upload Images *</Label>
                </div>
                <div
                  {...getRootProps({
                    className:
                      "border border-dashed rounded-lg p-5 text-center cursor-pointer",
                  })}
                >
                  <input {...getInputProps()} />
                  <p className="flex items-center gap-1.5 font-normal text-sm text-center">
                    <Image size={15} />
                    Drag & drop some files here, or click to select files (up to
                    4 images)
                  </p>
                </div>
                {form.formState.errors.images && (
                  <p className="text-sm font-light text-rose-500">
                    {form.formState.errors.images.message}
                  </p>
                )}

                <div className="flex items-center flex-wrap gap-2.5 mt-2.5">
                  {images?.map((file: any, index) => (
                    <div key={index} className="relative">
                      <img
                        src={file?.preview}
                        alt={`Preview ${index}`}
                        className="h-32 object-cover aspect-square rounded-lg"
                      />
                      <Button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="w-6 h-6 p-1.5 bg-rose-100 text-rose-600 absolute top-1 right-1"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <h3 className="font-medium my-5">
                    Trip Highlights(Optional)
                  </h3>
                  <Button
                    type="button"
                    onClick={() => addHighlight({ highlight: "" })}
                    className="w-fit h-6 flex gap-1 px-2 bg-orange-600 hover:bg-orange-500 text-[.6rem]"
                  >
                    <Plus size={12} /> Add
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
                  {highlightFields.map((item, index) => (
                    <FormField
                      key={item.id}
                      name={`highlights[${index}].highlight` as const}
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="rounded-lg"
                                disabled={loading}
                                placeholder="Highlight"
                                {...field}
                              />
                              <Button
                                type="button"
                                onClick={() => removeHighlight(index)}
                                className="absolute right-0 top-0 h-full px-2.5 bg-red-500 hover:bg-red-400 text-white rounded-l-none rounded-r-lg"
                              >
                                <Minus size={15} />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage className="font-light px-1" />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <h3 className="font-medium my-5">Trip Services(Optional)</h3>
                  <Button
                    type="button"
                    onClick={() => addService({ service: "" })}
                    className="w-fit h-6 flex gap-1 px-2 bg-orange-600 hover:bg-orange-500 text-[.6rem]"
                  >
                    <Plus size={12} /> Add
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
                  {serviceFields.map((item, index) => (
                    <FormField
                      key={item.id}
                      name={`services[${index}].service` as const}
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="rounded-lg"
                                disabled={loading}
                                placeholder="Service"
                                {...field}
                              />
                              <Button
                                type="button"
                                onClick={() => removeService(index)}
                                className="absolute right-0 top-0 h-full px-2.5 bg-red-500 hover:bg-red-400 text-white rounded-l-none rounded-r-lg"
                              >
                                <Minus size={15} />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage className="font-light px-1" />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <h3 className="font-medium my-5">Activities(Optional)</h3>
                  <Button
                    type="button"
                    onClick={() => addActivity({ title: "", description: "" })}
                    className="w-fit h-6 flex gap-1 px-2 bg-orange-600 hover:bg-orange-500 text-[.6rem]"
                  >
                    <Plus size={12} /> Add
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {activityFields.map((item, index) => (
                    <Card
                      key={item.id}
                      className="relative grid md:grid-cols-2 gap-x-3 p-3"
                    >
                      <FormField
                        name={`activities[${index}].title`}
                        render={({ field }) => (
                          <FormItem className="mb-3">
                            <Label htmlFor={`title-${index}`}>Title *</Label>
                            <FormControl>
                              <Input
                                id={`title-${index}`}
                                className="rounded-lg"
                                disabled={loading}
                                placeholder="Title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="font-light px-1">
                              {
                                form.formState.errors?.activities?.[index]
                                  ?.title?.message
                              }
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`activities[${index}].description`}
                        render={({ field }) => (
                          <FormItem className="mb-3">
                            <Label htmlFor={`desc-${index}`}>Description</Label>
                            <FormControl>
                              <Input
                                id={`desc-${index}`}
                                className="rounded-lg"
                                disabled={loading}
                                placeholder="Description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="font-light px-1">
                              {
                                form.formState.errors?.activities?.[index]
                                  ?.description?.message
                              }
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        onClick={() => removeActivity(index)}
                        className="absolute top-2 right-2 h-6 w-6 p-1 bg-red-500 hover:bg-red-400 text-white rounded-md"
                      >
                        <Minus size={15} />
                      </Button>
                    </Card>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <h3 className="font-medium my-5">FAQ's(Optional)</h3>
                  <Button
                    type="button"
                    onClick={() => addFaq({ question: "", answer: "" })}
                    className="w-fit h-6 flex gap-1 px-2 bg-orange-600 hover:bg-orange-500 text-[.6rem]"
                  >
                    <Plus size={12} /> Add
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {faqsFields.map((item, index) => (
                    <Card
                      key={item.id}
                      className="relative grid md:grid-cols-2 gap-x-3 p-3"
                    >
                      <FormField
                        name={`faqs[${index}].question`}
                        render={({ field }) => (
                          <FormItem className="mb-3">
                            <Label htmlFor={`qs-${index}`}>Question *</Label>
                            <FormControl>
                              <Input
                                id={`qs-${index}`}
                                className="rounded-lg"
                                disabled={loading}
                                placeholder="Question"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="font-light px-1">
                              {
                                form.formState.errors?.faqs?.[index]?.question
                                  ?.message
                              }
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`faqs[${index}].answer`}
                        render={({ field }) => (
                          <FormItem className="mb-3">
                            <Label htmlFor={`ans-${index}`}>Reply *</Label>
                            <FormControl>
                              <Input
                                id={`ans-${index}`}
                                className="rounded-lg"
                                disabled={loading}
                                placeholder="Reply"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="font-light px-1">
                              {
                                form.formState.errors?.faqs?.[index]?.answer
                                  ?.message
                              }
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="absolute top-2 right-2 h-6 w-6 p-1 bg-red-500 hover:bg-red-400 text-white rounded-md"
                      >
                        <Trash2 size={15} />
                      </Button>
                    </Card>
                  ))}
                </div>

                <Button
                  disabled={loading}
                  className="w-full md:w-fit px-10 mt-5 ml-auto h-11 flex gap-2 rounded-lg bg-orange-600 hover:bg-orange-500"
                  type="submit"
                >
                  {loading ? "Loading..." : "Add Tour"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
