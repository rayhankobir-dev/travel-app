import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ChangePassword from "@/components/profile/change-password";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PersonalInformation from "@/components/profile/info";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import SEO from "@/components/ui/seo";

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="space-y-10 max-w-7xl mx-auto">
      <SEO title="Your Profile - GhureAshi" />
      <div className="faq-section h-48 flex justify-start items-end bg-gray-50 bg-opacity-20">
        <div className="max-w-7xl w-full mx-auto space-y-2  py-10 px-6 lg:px-0">
          <h1 className="font-semibold text-3xl">My Profile</h1>
          <p className="font-light text-sm">
            Find our bookings history. And go to support for any help.
          </p>
        </div>
      </div>

      <Card className="grid grid-cols-1 md:grid-cols-5 border-none shadow-none gap-4">
        <Card className="py-4 col-span-5 md:col-span-5 lg:col-span-3 pt-0 overflow-hidden">
          <CardHeader className="relative flex flex-col gap-1 justify-center items-center bg-orange-100 overflow-hidden">
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-xl text-white bg-orange-400">
                    {user?.fullName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="relative text-xl font-medium">
                {user?.fullName}
              </CardTitle>
            </div>
          </CardHeader>
          <Separator className="mb-4" />
          <PersonalInformation />
        </Card>

        <Card className="max-h-fit col-span-5 lg:col-span-2 flex flex-col md:flex-row  lg:flex-col justify-between gap-3 border-none shadow-none">
          <ChangePassword />
        </Card>
      </Card>
    </section>
  );
}
