/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

interface ServiceFormData {
  service: string;
}

interface Service {
  _id: string;
  service: string;
  createdAt: string;
  updatedAt: string;
}

const schema = Yup.object().shape({
  service: Yup.string().required("Service is required"),
});

export default function Services() {
  const [isFetching, setIsFetching] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await authAxios.get("/services");
        setServices(res.data.data.services);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    }
    fetchLocations();
  }, []);

  const form = useForm<ServiceFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: { service: "" },
  });

  const onSubmit = async (payload: ServiceFormData) => {
    try {
      const res = await authAxios.post("/services", payload);
      setServices((prev) => [...prev, res.data.data.service]);
      form.reset();
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const data = {
      serviceId: id,
    };
    try {
      const res = await authAxios.delete("/services", { data });
      setServices(
        (prev) => prev?.filter((service) => service._id !== id) || null
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
            <h1 className="font-medium text-lg">Create new Services</h1>
            <p className="text-sm font-light">All bookings by customers</p>
          </CardHeader>
          <Separator />
          <CardContent className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-start gap-2 px-1 w-full relative"
              >
                <div className="w-full grid grid-cols-1 items-start gap-2 ">
                  <FormField
                    name="service"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormControl>
                          <div className="relative">
                            <BsFillPatchQuestionFill className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              autoComplete="true"
                              className="pl-12 h-12 rounded-xl"
                              placeholder="Service short description"
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
            <h1 className="font-medium text-lg">Trips Services</h1>
            <p className="text-sm font-light">All bookings by customers</p>
          </CardHeader>
          <Separator />
          <CardContent className="p-3">
            {isFetching ? (
              <SpinerLoading />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {services.length > 0 ? (
                  services.map((service) => (
                    <LocationCard
                      handleDelete={handleDelete}
                      key={service._id}
                      service={service}
                    />
                  ))
                ) : (
                  <p>No services</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function LocationCard({
  service,
  handleDelete,
}: {
  service: Service;
  handleDelete: (id: string) => void;
}) {
  return (
    <Card className="relative">
      <DeleteBtn handleDelete={() => handleDelete(service._id)} />
      <CardContent>
        <h3>{service.service}</h3>
      </CardContent>
    </Card>
  );
}

interface FaqDeleteBtnProps {
  handleDelete: () => void;
}

function DeleteBtn({ handleDelete }: FaqDeleteBtnProps) {
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
