/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const loginForm = useForm<LoginFormData>();

  // handle login form submission
  const onSubmit = async () => {
    setLoading(true);
  };

  return (
    <section className="mt-24">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Your Account - Soccer Football Drills Platform</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-fit bg-green-600 overflow-hidden mx-auto h-fit flex md:grid grid-cols-2 lg:flex items-center justify-center rounded-md border shadow-lg my-10 md:divide-x">
        <div className="w-full h-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-start gap-2">
            <img src={Logo} className="w-16" />
            <h1 className="font-semibold text-3xl text-orange-600">Travella</h1>
          </div>
          <div className="space-y-2 text-start">
            <h1 className="text-3xl font-bold">Login Your Account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>
          <Form {...loginForm}>
            <form
              onSubmit={onSubmit}
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
                className="w-full h-11 rounded-xl bg-orange-600 hover:bg-orange-500"
                type="submit"
              >
                Login
              </Button>
            </form>
          </Form>
          <div className="inline-flex items-center gap-2 mt-4 text-center text-sm px-2">
            <p>Don't have an account?</p>
            <Link className="underline text-orange-600" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
