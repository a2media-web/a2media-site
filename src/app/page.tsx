import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Guide from "@/components/sections/Guide";
import LogoStrip from "@/components/sections/LogoStrip";
import Receipts from "@/components/sections/Receipts";
import ScrubReel from "@/components/mockups/ScrubReel";
import StickyCurtain from "@/components/sections/StickyCurtain";
import Process from "@/components/sections/Process";
import Editors from "@/components/sections/Editors";
import ComparisonTable from "@/components/sections/ComparisonTable";
import ClientTestimonials from "@/components/sections/ClientTestimonials";
import Pricing from "@/components/sections/Pricing";
import CustomProjects from "@/components/sections/CustomProjects";
import Guarantee from "@/components/sections/Guarantee";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import TrailingTestimonial from "@/components/sections/TrailingTestimonial";
import Footer from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  faqSchema,
  videoObjectSchemas,
  caseStudiesItemListSchema,
  breadcrumbSchema,
} from "@/components/seo/schemas";
import { FAQ_PLAIN, SCRUB_VIDEOS } from "@/components/sections/FAQ/_shared";

export default function Home() {
  const pageSchemas = [
    breadcrumbSchema,
    faqSchema(FAQ_PLAIN),
    caseStudiesItemListSchema,
    ...videoObjectSchemas(SCRUB_VIDEOS),
  ];

  return (
    <>
      <Nav />
      <Hero />
      <Pain />
      <Guide />
      <LogoStrip />
      <Receipts />
      <ScrubReel />
      <StickyCurtain />
      <Process />
      <Editors />
      <ComparisonTable />
      <ClientTestimonials />
      <Pricing />
      <CustomProjects />
      <Guarantee />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <TrailingTestimonial />
      <Footer />
      <JsonLd data={pageSchemas} />
    </>
  );
}
