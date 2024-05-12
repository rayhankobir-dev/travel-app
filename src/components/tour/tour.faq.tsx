import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
const faqs = [
  {
    questionId: 1,
    question: "How are you?",
    answer: "I'm fine thank you",
  },
  {
    questionId: 2,
    question: "Can I get the refund?",
    answer: "I'm fine thank you",
  },
];

export default function TourFaq() {
  return (
    <section>
      <h3 className="font-semibold text-xl">FAQ</h3>
      <div className="py-3">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
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
