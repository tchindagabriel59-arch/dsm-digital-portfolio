import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Work from "@/components/sections/Work";
import Approach from "@/components/sections/Approach";
import Stats from "@/components/sections/Stats";
import FinalCta from "@/components/sections/FinalCta";

/**
 * Landing page one-page de l'agence.
 * L'ordre des sections suit le parcours de conversion :
 * promesse → expertise → secteurs couverts → réalisations → méthode → chiffres → CTA.
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
      <FinalCta />
    </>
  );
}
