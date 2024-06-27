import NotfoundImage from "@/assets/not-found.svg";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
  title?: string;
  redirectUrl: string;
}

export default function Error404({ children, title, redirectUrl }: Props) {
  return (
    <section className="h-fit flex flex-col items-start lg:items-center justify-center mb-10">
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 Not Found</title>
      </Helmet>
      {children ? (
        children
      ) : (
        <Fragment>
          <img className="h-96 w-96" src={NotfoundImage} />
          <h1 className="text-4xl text-orange-600 font-semibold">
            {title ? title : "Page Not Found"}
          </h1>
          <p className="max-w-sm font-light mt-3 mb-4">
            Please go back to home and explore our content.
          </p>
          <Button asChild variant="outline">
            <Link to={redirectUrl} className="inline-flex gap-2 items-center">
              <Home size={16} /> Go Home
            </Link>
          </Button>
        </Fragment>
      )}
    </section>
  );
}
