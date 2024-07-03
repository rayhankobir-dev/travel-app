import { Helmet } from "react-helmet-async";

export interface SeoProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  image?: string; // Add this line
}

export default function SEO({
  title,
  description,
  name,
  type,
  image,
}: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />{" "}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
