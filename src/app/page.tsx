import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Work from "@/components/sections/Work";
import Approach from "@/components/sections/Approach";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import FinalCta from "@/components/sections/FinalCta";

/**
 * Landing page one-page de l'agence.
 * Parcours de conversion :
 * promesse → expertise → secteurs → réalisations → méthode → chiffres → témoignages → CTA.
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
      <FinalCta />
    </>
  );
}
