/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Breadcrumb from "@/components/ui/custom-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Accordion } from "@/components/ui/accordion";
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

interface HighlightFormData {
  title: string;
}

interface Highlight {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

export default function Highlights() {
  const [isFetching, setIsFetching] = useState(true);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await authAxios.get("/highlights");
        setHighlights(res.data.data.highlights);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    }
    fetchFaqs();
  }, []);

  const form = useForm<HighlightFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: { title: "" },
  });

  const onSubmit = async (payload: HighlightFormData) => {
    try {
      const res = await authAxios.post("/highlights", payload);
      setHighlights((prevHighlights) => [
        ...prevHighlights,
        res.data.data.highlight,
      ]);
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
      const res = await authAxios.delete("/highlights", { data });
      setHighlights(
        (prevHighlights) =>
          prevHighlights?.filter((highlight) => highlight._id !== id) || null
      );
      toast.success(res.data.message);
    } catch (error: any) {
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
            <h1 className="font-medium text-lg">Create new Highlights's</h1>
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
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormControl>
                          <div className="relative">
                            <BsFillPatchQuestionFill className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              autoComplete="true"
                              className="pl-12 h-12 rounded-xl"
                              placeholder="Write title"
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
            <h1 className="font-medium text-lg">Trips Highlights's</h1>
            <p className="text-sm font-light">All bookings by customers</p>
          </CardHeader>
          <Separator />
          <CardContent className="p-3">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {isFetching ? (
                <SpinerLoading />
              ) : highlights && highlights.length > 0 ? (
                highlights.map((highlight) => (
                  <Card className="relative p-3 ">
                    <CardContent className="p-0">
                      <FaqDeleteBtn
                        handleDelete={() => handleDelete(highlight._id)}
                      />
                      <CardDescription className="font-light pl-8">
                        {highlight.title}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No highlights</p>
              )}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </main>
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
