import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Logo from "@/assets/logo.png";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Climbing from "@/assets/climbing.jpeg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "@/hooks/useAuth";
import { publicAxios } from "@/api";
import toast from "react-hot-toast";
import { extractErrorMessage } from "@/lib/lib";
import { ErrorResponse } from "@/types";
import SEO from "@/components/ui/seo";

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
}

const signupSchema = Yup.object().shape({
  fullName: Yup.string().required("First name required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Signup() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const signupForm = useForm<SignupFormData>({
    mode: "onTouched",
    resolver: yupResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // handle login form submission
  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      const res = await publicAxios.post("/auth/signup", data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(extractErrorMessage(error as ErrorResponse));
    } finally {
      setLoading(false);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <section className="mt-24">
      <SEO title="Create Your Account - GhureAshi" />

      <div className="w-fit bg-orange-200 overflow-hidden mx-auto h-fit flex lg:flex items-center justify-center rounded-md lg:border shadow-lg my-10 md:divide-x">
        <img src={Climbing} className="hidden lg:block max-w-sm h-full" />

        <div className="w-full h-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-start gap-2">
            <img src={Logo} className="w-16" />
            <h1 className="font-semibold text-3xl text-orange-500">Travella</h1>
          </div>
          <div className="space-y-2 text-start">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="font-light text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSubmit)}
              className="px-1 space-y-5 w-full relative"
            >
              <Button
                variant={"outline"}
                type="button"
                className="w-full rounded-xl h-11 space-x-3 text-gray-600 "
              >
                <FcGoogle size={20} />
                <p>Login with Google</p>
              </Button>
              <div className="space-y-2">
                <FormField
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            autoComplete="true"
                            className="pl-12 h-12 rounded-xl"
                            disabled={loading}
                            placeholder="Full name"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-light px-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-1 ">
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            autoComplete="true"
                            className="pl-12 h-12 rounded-xl"
                            disabled={loading}
                            placeholder="Email address"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-light px-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormControl>
                        <div className="relative group">
                          <LockKeyhole className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            className="pl-12 h-12 rounded-xl "
                            type={passwordVisible ? "password" : "text"}
                            disabled={loading}
                            placeholder="Password"
                            {...field}
                          />
                          {passwordVisible ? (
                            <button className="block" type="button">
                              <Eye
                                onClick={() => {
                                  setPasswordVisible(false);
                                }}
                                className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                              />
                            </button>
                          ) : (
                            <button className="block" type="button">
                              <EyeOff
                                onClick={() => {
                                  setPasswordVisible(true);
                                }}
                                className="absolute z-10 right-3.5 top-3.5 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gay-700 duration-300"
                              />
                            </button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="font-light px-1" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={loading}
                className="w-full h-11 rounded-xl bg-orange-600 hover:bg-orange-500 duration-300"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Form>
          <div className="inline-flex items-center gap-2 mt-4 text-center text-sm px-2">
            <p>Already have an account?</p>
            <Link className="underline text-orange-600" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
