import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Breadcrumb from "@/components/ui/custom-breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { TbScript } from "react-icons/tb";
import { toast } from "react-hot-toast";

interface QuestionFormData {
  question: string;
  answer: string;
}

interface Question {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

const schema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

export default function Faqs() {
  const [isFetching, setIsFetching] = useState(true);
  const [questions, setQuestions] = useState<Question[] | null>(null);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await authAxios.get("/faqs");
        setQuestions(res.data.data.questions);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    }
    fetchFaqs();
  }, []);

  const form = useForm<QuestionFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const onSubmit = async (payload: QuestionFormData) => {
    try {
      const res = await authAxios.post("/faqs", payload);
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        res.data.data.question,
      ]);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const data = {
      questionId: id,
    };
    try {
      const res = await authAxios.delete("/faqs", { data });
      setQuestions(
        (prevQuestions) =>
          prevQuestions?.filter((question) => question._id !== id) || null
      );
      toast.success(res.data.message);
    } catch (error) {
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
            <h1 className="font-medium text-lg">Create new FAQ's</h1>
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
                    name="question"
                    render={({ field }) => (
                      <FormItem className="col-span-1 ">
                        <FormControl>
                          <div className="relative">
                            <BsFillPatchQuestionFill className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              autoComplete="true"
                              className="pl-12 h-12 rounded-xl"
                              placeholder="Question?"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="font-light px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="answer"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormControl>
                          <div className="relative group">
                            <TbScript className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              className="pl-12 h-12 rounded-xl "
                              type="text"
                              placeholder="Question's answer"
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
            <h1 className="font-medium text-lg">Trips FAQ's</h1>
            <p className="text-sm font-light">All bookings by customers</p>
          </CardHeader>
          <Separator />
          <CardContent className="p-3">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {isFetching ? (
                <SpinerLoading />
              ) : questions && questions.length > 0 ? (
                questions.map((question) => (
                  <AccordionItem
                    key={question._id}
                    value={question._id}
                    className="max-h-fit relative px-3 border rounded-lg"
                  >
                    <AccordionTrigger className="py-2.5 pl-8">
                      {question.question}
                    </AccordionTrigger>
                    <AccordionContent>{question.answer}</AccordionContent>
                    <FaqDeleteBtn
                      handleDelete={() => handleDelete(question._id)}
                    />
                  </AccordionItem>
                ))
              ) : (
                <p>No questions</p>
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
