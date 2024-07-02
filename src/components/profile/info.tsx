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
import SpinnerLoading from "../ui/spinner-loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authAxios } from "@/api";
import * as Yup from "yup";
import useAuth from "@/hooks/useAuth";

// Define schema for form validation
const profileSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  dob: Yup.string().required("Date of birth is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

// Define interface for form data
interface ProfileData {
  fullName: string;
  email?: string;
  dob: string;
  phone: string;
  address: string;
}

export default function PersonalInformation() {
  const [updating, setUpdating] = useState(false);
  const { user, setUser } = useAuth();

  const form = useForm<ProfileData>({
    mode: "onTouched",
    resolver: yupResolver(profileSchema),
    defaultValues: {
      email: user?.email,
      fullName: user?.fullName,
      dob: user?.dob?.toString(),
      phone: user?.phone,
      address: user?.address,
    },
  });

  const onSubmit = async (data: ProfileData) => {
    try {
      setUpdating(true);
      const res = await authAxios.put("/user/profile", data);
      setUser(res.data.data.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
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
                        readOnly
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-2 space-y-1">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <FormControl>
                      <Input
                        id="dob"
                        type="date"
                        className="h-12 rounded-xl"
                        disabled={updating}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-2 space-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <FormControl>
                      <Input
                        id="phone"
                        className="h-12 rounded-xl"
                        disabled={updating}
                        placeholder="+8801618123245"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-4 space-y-1">
                    <Label htmlFor="address">Address</Label>
                    <FormControl>
                      <Input
                        id="address"
                        className="h-12 rounded-xl"
                        disabled={updating}
                        placeholder="Baridhara, Dhaka"
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
              className="h-11 rounded-xl min-w-fit w-full md:w-1/4 bg-orange-500 hover:bg-orange-600"
              type="submit"
            >
              {updating ? (
                <SpinnerLoading text="Saving Changes..." />
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Fragment>
  );
}
