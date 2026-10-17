import { Helmet } from "react-helmet-async";

const BASE_URL = "http://localhost:5173/";
const DEFAULT_IMAGE = `${BASE_URL}/icon.png`;

export default function SEO({
  title = "Travel Murah Jogja",
  description = "Paket wisata Jogja terbaik dan terjangkau",
  keywords = "",
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
}) {
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="title" content={title} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
      <link rel="canonical" href={url} />
      <meta name="author" content="PT Aura Anugrah Bersama" />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}