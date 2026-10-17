import SEO from "../../../components/SEO";
import Hero from "../components/Hero";
import Main from "../components/Main";


export default function HomePage() {
  return (
    <>
    <SEO
        title="Travel Murah Jogja | Paket Wisata Jogja Terbaik"
        description="Paket wisata Jogja murah dan terbaik."
        path="/"
    />
    <Hero/>
    <Main/>
    </>
  );
}