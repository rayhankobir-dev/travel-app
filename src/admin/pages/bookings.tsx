import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Breadcrumb from "@/components/ui/custom-breadcrumb";
import { Separator } from "@/components/ui/separator";

export default function Bookings() {
  return (
    <main>
      <Card>
        <CardHeader className="p-3">
          <Breadcrumb className="mb-4" />
          <h1 className="font-medium text-xl">All Bookings</h1>
          <p className="text-sm font-light">All bookings by customers</p>
        </CardHeader>
        <Separator />
        <CardContent className="p-3">table content</CardContent>
      </Card>
    </main>
  );
}
