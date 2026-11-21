import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Work from "@/components/sections/Work";
import Pricing from "@/components/sections/Pricing";
import Approach from "@/components/sections/Approach";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

/**
 * Landing page one-page de l'agence DSM Digital.
 * Parcours de conversion optimisé :
 * Hero → Services → Secteurs → Réalisations → Tarifs & Offres → Méthode → Chiffres → Témoignages → FAQ → CTA Final.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Industries />
      <Work />
      <Pricing />
      <Approach />
      <Stats />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
