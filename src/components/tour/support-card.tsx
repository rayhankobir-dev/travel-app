import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../ui/card";
import useAuth from "@/hooks/useAuth";

export default function SupportCard() {
  const { user } = useAuth();
  if (user?.role == "admin") return null;
  return (
    <Card className="my-3">
      <CardHeader className="p-3.5">
        <CardTitle className="font-medium text-md mb-1">
          Do you need support?
        </CardTitle>
        <p className="font-light text-sm">
          You can check our customers frequently asked question hope you'll find
          our answer.
        </p>
      </CardHeader>
      <CardContent className="px-3.5 font-medium text-sm">
        Note: If you already booked a tour and you want to add more person
        please tell us our admin.
      </CardContent>
      <CardFooter className="px-3.5 pb-3.5">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          asChild
        >
          <Link to="/support">Chat with admin</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
