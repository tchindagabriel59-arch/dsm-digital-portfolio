"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/lib/content";

function FaqItemAccordion({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-line"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-accent"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-medium text-bone md:text-lg pr-4">
          {question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 ${
            isOpen ? "rotate-180 border-accent bg-accent/10 text-accent" : "text-ash"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm sm:text-base leading-relaxed text-ash max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Première question ouverte par défaut

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 border-y border-line bg-surface/30 py-24 md:py-36"
    >
      <div
        aria-hidden
        className="grid-lines mask-fade-y pointer-events-none absolute inset-0 opacity-20"
      />

      <div className="shell relative">
        <SectionHeading
          label="FAQ"
          title="Questions fréquentes."
          accent={["fréquentes."]}
          description="Tout ce que vous devez savoir avant de lancer votre projet avec DSM Digital."
        />

        <div className="mt-12 md:mt-16 max-w-4xl mx-auto divide-y-0">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItemAccordion
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
