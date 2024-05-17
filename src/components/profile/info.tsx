/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Fragment, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { publicAxios } from "@/api";
import * as Yup from "yup";
import SpinerLoading from "../ui/spinner-loading";
import { yupResolver } from "@hookform/resolvers/yup";

// schema
const profileSchema = Yup.object().shape({
  email: Yup.string(),
  fullName: Yup.string(),
});

interface ProfileData {
  email?: string;
  fullName?: string;
}

export default function PersonalInformation() {
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const countryResponse = await publicAxios.get(
          "https://restcountries.com/v3.1/all"
        );
        setCountries(countryResponse.data);
        setUpdating(false);
        console.log(countries);
      } catch (error: any) {
        console.log(error.response);
      } finally {
        setFetching(false);
      }
    }

    fetchData();
  }, []);

  // create new form state
  const form = useForm<ProfileData>({
    mode: "onTouched",
    resolver: yupResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileData) => {
    console.log(data);
  };

  return (
    <Fragment>
      {fetching ? (
        <div className="w-full flex justify-center">
          <SpinerLoading size={30} className="text-orange-600 mt-10" />
        </div>
      ) : (
        <Fragment>
          <CardContent className="py-5 mb-8">
            <CardTitle className="font-medium text-xl">
              Personal Information
            </CardTitle>
            <CardDescription className="font-light">
              Edit your personal information
            </CardDescription>
          </CardContent>
          <CardFooter className="px-3 md:px-5 flex flex-col gap-1 py-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="px-1 space-y-4 w-full relative"
              >
                <div className="grid md:grid-cols-4 gap-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-2 space-y-1">
                        <Label htmlFor="fullName">Full Name</Label>
                        <FormControl>
                          <Input
                            id="fullName"
                            className="h-12 rounded-xl"
                            disabled={updating}
                            placeholder="Full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-2 space-y-1">
                        <Label htmlFor="email" className="px-1">
                          Email
                        </Label>
                        <FormControl>
                          <Input
                            id="email"
                            className="h-12 rounded-xl"
                            readOnly={true}
                            disabled={true}
                            placeholder="example@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-light" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={updating}
                  className="h-11 rounded-xl min-w-fit w-full md:w-1/4"
                  type="submit"
                >
                  {updating ? (
                    <SpinerLoading text="Save Changing.." textHidden={false} />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Fragment>
      )}
    </Fragment>
  );
}
