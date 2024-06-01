import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import PersonalInformation from "@/components/profile/info";
import ChangePassword from "@/components/profile/change-password";
import SEO from "@/components/ui/seo";

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="space-y-10 mb-10 mt-24 max-w-7xl mx-auto">
      <SEO title="Your Profile - GhureAshi" />

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

        <Card className="col-span-5 lg:col-span-2 flex flex-col md:flex-row  lg:flex-col justify-between gap-3 border-none shadow-none">
          <ChangePassword />
          <Card className="flex-1 py-5">hello</Card>
        </Card>
      </Card>
    </section>
  );
}
