/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Breadcrumb from "@/components/ui/custom-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { BsFillPatchQuestionFill } from "react-icons/bs";

import { useEffect, useState } from "react";
import { authAxios } from "@/api";
import SpinerLoading from "@/components/ui/spinner-loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

interface LocationFormData {
  location: string;
  country: string;
}

interface Location {
  _id: string;
  location: string;
  country: string;
  countryCode?: string;
  lan?: string;
  lat?: string;
  createdAt: string;
  updatedAt: string;
}

const schema = Yup.object().shape({
  location: Yup.string().required("Location name is required"),
  country: Yup.string().required("Country is required"),
});

export default function Activities() {
  const [isFetching, setIsFetching] = useState(true);
  const [locations, setActivities] = useState<Location[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await authAxios.get("/activities");
        setActivities(res.data.data.locations);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    }
    fetchActivities();
  }, []);

  const form = useForm<LocationFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: { location: "", country: "" },
  });

  const onSubmit = async (payload: LocationFormData) => {
    try {
      const res = await authAxios.post("/activities", payload);
      setActivities((prev) => [...prev, res.data.data.location]);
      form.reset();
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const data = {
      highlightId: id,
    };
    try {
      const res = await authAxios.delete("/activities", { data });
      setActivities(
        (prev) => prev?.filter((location) => location._id !== id) || null
      );
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error?.message);
      toast.error(error?.message);
    }
  };

  return (
    <main>
      <section className="border-b">
        <Breadcrumb className="bg-gray-50 px-3 py-3" />
      </section>
      <section className="p-2 space-y-2">
        <Card className="overflow-hidden">
          <CardHeader className="p-4 bg-gray-50">
            <h1 className="font-medium text-lg">Create new Activities</h1>
            <p className="text-sm font-light">All bookings by customers</p>
          </CardHeader>
          <Separator />
          <CardContent className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-start gap-2 px-1 w-full relative"
              >
                <div className="w-full grid grid-cols-2 items-start gap-2 ">
                  <FormField
                    name="location"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormControl>
                          <div className="relative">
                            <BsFillPatchQuestionFill className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              autoComplete="true"
                              className="pl-12 h-12 rounded-lg"
                              placeholder="Place name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="country"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormControl>
                          <div className="relative">
                            <BsFillPatchQuestionFill className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              autoComplete="true"
                              className="pl-12 h-12 rounded-lg"
                              placeholder="Country name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  size="lg"
                  className="h-11 gap-2 rounded-lg bg-orange-600 hover:bg-orange-500"
                  type="submit"
                >
                  Create
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="p-4 bg-gray-50">
            <h1 className="font-medium text-lg">Trips Activities</h1>
            <p className="text-sm font-light">All bookings by customers</p>
          </CardHeader>
          <Separator />
          <CardContent className="p-3">
            {isFetching ? (
              <SpinerLoading />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {locations.length > 0 ? (
                  locations.map((location) => (
                    <LocationCard key={location._id} location={location} />
                  ))
                ) : (
                  <p>No locations</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function LocationCard({ location }: { location: Location }) {
  return (
    <Card>
      <CardHeader>Delete</CardHeader>
      <CardContent>
        <h3>{location.location}</h3>
        <h3>{location.country}</h3>
        <h3>{location.countryCode}</h3>
        <h3>{location.lat}</h3>
        <h3>{location.lan}</h3>
      </CardContent>
    </Card>
  );
}

interface FaqDeleteBtnProps {
  handleDelete: () => void;
}

function FaqDeleteBtn({ handleDelete }: FaqDeleteBtnProps) {
  return (
    <Button
      onClick={handleDelete}
      className="absolute top-2.5 left-2.5 h-fit w-fit p-1.5 bg-red-50 text-red-500 hover:bg-red-100"
      size="icon"
    >
      <Trash2 size={14} />
    </Button>
  );
}
