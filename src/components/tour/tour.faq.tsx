import { Faq } from "@/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

export default function TourFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <section>
      <h3 className="font-semibold text-xl">FAQ</h3>
      <div className="py-3">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs?.map((faq, index: number) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-xl px-3"
            >
              <AccordionTrigger className="hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-light">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
