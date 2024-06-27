/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import BreadcrumbView from "@/components/ui/custom-breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";

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
    .positive("Tax must be positive"),
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
  location: Yup.string().required("Location is required"),
  highlights: Yup.array().of(Yup.string().required("Highlight is required")),
  services: Yup.array().of(Yup.string().required("Service is required")),
  activities: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Activity title is required"),
      description: Yup.string().required("Activity description is required"),
    })
  ),
  images: Yup.array()
    .of(
      Yup.mixed().test("fileType", "Unsupported File Format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      })
    )
    .min(4, "At least 4 image is required")
    .max(4, "You can upload up to 4 images only")
    .required("Image are required"),
});

// Slugify function
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export default function EditTour() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(tourSchema),
    defaultValues: {
      cost: 0,
      discount: 0,
      tax: 0,
      minAge: 1,
      maxAge: 90,
      groupSize: 100,
      title: "",
      slug: "",
      overview: "",
      startedAt: new Date(),
      endedAt: new Date(),
      duration: 0,
      highlights: [""],
      services: [""],
      activities: [{ title: "", description: "" }],
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

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      console.log(data);
    } catch (error) {
      console.error("Error creating tour:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update slug whenever the title changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title") {
        form.setValue("slug", slugify(value.title));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const existingImages = form.getValues("images") || [];
      const updatedImages = existingImages.concat(
        acceptedFiles.map((file) =>
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

  const images = form.watch("images") || [];

  const handleRemoveImage = (index) => {
    const existingImages = form.getValues("images") || [];
    const updatedImages = existingImages.filter((_, i) => i !== index);
    form.setValue("images", updatedImages, { shouldValidate: true });
  };

  return (
    <main className="h-full overflow-y-scroll">
      <section className="bg-gray-50 p-3 border-b">
        <BreadcrumbView />
      </section>
      <section className="p-3">
        <Card>
          <CardHeader>
            <CardTitle>Add new Trip</CardTitle>
            <CardDescription>
              Create new trip and make is published
            </CardDescription>
          </CardHeader>
          <Separator />
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
                      <FormItem className="col-span-2">
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
                      <FormItem className="col-span-1">
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

                  <FormField
                    name="location"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <Label htmlFor="location">Location *</Label>
                        <FormControl>
                          <Input
                            id="location"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Trip location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="cost"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
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
                      <FormItem className="col-span-1">
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
                      <FormItem className="col-span-1">
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

                  <FormField
                    name="startedAt"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <Label htmlFor="startedAt">Start At *</Label>
                        <FormControl>
                          <Input
                            id="startedAt"
                            type="date"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="Start date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="endedAt"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <Label htmlFor="endedAt">End At *</Label>
                        <FormControl>
                          <Input
                            id="endedAt"
                            type="date"
                            autoComplete="true"
                            className="rounded-lg"
                            disabled={loading}
                            placeholder="End date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="minAge"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
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
                      <FormItem className="col-span-1">
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
                      <FormItem className="col-span-1">
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
                  <p className="font-normal text-sm">
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
                  {images?.map((file, index) => (
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
                    onClick={() => addHighlight("")}
                    className="w-fit h-6 flex gap-1 px-2 bg-orange-600 hover:bg-orange-500 text-[.6rem]"
                  >
                    <Plus size={12} /> Add
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {highlightFields.map((item, index) => (
                    <FormField
                      key={item.id}
                      name={`highlights[${index}]`}
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
                    onClick={() => addService("")}
                    className="w-fit h-6 flex gap-1 px-2 bg-orange-600 hover:bg-orange-500 text-[.6rem]"
                  >
                    <Plus size={12} /> Add
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {serviceFields.map((item, index) => (
                    <FormField
                      key={item.id}
                      name={`services[${index}]`}
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

                <Button
                  disabled={loading}
                  className="w-full md:w-fit px-10 ml-auto h-11 flex gap-2 rounded-lg bg-orange-600 hover:bg-orange-500"
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
