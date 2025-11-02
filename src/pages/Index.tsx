import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Seo } from "@/lib/seo";
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  schemaToJsonLd,
  generateBreadcrumbs,
} from "@/lib/seo";
import { PAGE_METADATA } from "@/constants/seo";

const Index = () => {
  // Generate structured data for homepage
  const localBusinessSchema = schemaToJsonLd(generateLocalBusinessSchema());
  const breadcrumbSchema = schemaToJsonLd(generateBreadcrumbSchema(generateBreadcrumbs("/")));

  return (
    <div className="min-h-screen">
      <Seo
        title={PAGE_METADATA.home.title}
        description={PAGE_METADATA.home.description}
        keywords={PAGE_METADATA.home.keywords}
        canonical="/"
        image={PAGE_METADATA.home.image}
        structuredData={[localBusinessSchema, breadcrumbSchema]}
      />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
