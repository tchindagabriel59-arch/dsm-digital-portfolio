import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Work from "@/components/sections/Work";
import Approach from "@/components/sections/Approach";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

/**
 * Landing page one-page de l'agence.
 * Parcours complet :
 * Hero → Services → Secteurs → Réalisations → Méthode → Chiffres → Témoignages → FAQ → CTA Final.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Industries />
      <Work />
      <Approach />
      <Stats />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
