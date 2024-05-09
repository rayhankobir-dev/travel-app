import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <section className="w-full mt-14">
      <div className="faq-section h-48 flex justify-start items-end bg-gray-50 bg-opacity-20 px-6 lg:px-0">
        <div className="max-w-7xl w-full mx-auto space-y-2  py-10">
          <h1 className="font-semibold text-3xl">FAQ's</h1>
          <p className="font-light text-sm">
            Find our customer's frequent questions and answers.
          </p>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-7xl mx-auto mt-16 space-y-3 px-6 lg:px-0"
      >
        <AccordionItem value="item-1" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline text-left">
            <p>
              <strong>প্রশ্ন:</strong> আমার ডেবিট কার্ড আছে। আমি কি ডেবিট কার্ড
              ব্যবহার করে শেয়ারট্রিপ থেকে ফ্লাইট বুক করতে পারবো?
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <strong>উত্তর:</strong> হ্যাঁ, আপনি আপনার লোকাল কিংবা
            ইন্টার্ন্যাশনাল কার্ড, ডেবিট অথবা ক্রেডিট কার্ডও ব্যবহার করে
            শেয়ারট্রিপ থেকে খুব সহজেই ফ্লাইট বুক করতে পারবেন
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <p>
              <strong>প্রশ্ন:</strong> আমি কি শেয়ারট্রিপ থেকে ডোমেস্টিক ফ্লাইট
              বুক করতে পারবো?
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <strong>উত্তর:</strong> হ্যাঁ, পারবেন। আমরা ডোমেস্টিক এবং
            ইন্টারন্যাশনাল, উভয় ধরণের ফ্লাইট সার্ভিস দিয়ে থাকি। আমরা আপনাকে
            আপনার ভ্রমণ পরিকল্পনা অনুযায়ী পছন্দের ফ্লাইট বেছে নিতে সাহায্য করতে
            পারি।
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <p>
              <strong>প্রশ্ন:</strong> অনলাইন বুকিং-এর ক্ষেত্রে আমি কি পেমেন্ট
              পরে করতে পারি?
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <strong>উত্তর:</strong> আপনি অনলাইনে ফ্লাইট অনুসন্ধান ও তুলনা করতে
            পারবেন কিন্তু পেমেন্ট না করা অব্দি আপনার বুকিং নিশ্চিত হবে না।
            অনলাইন বুকিং নিশ্চিত করতে তাৎক্ষণিক পেমেন্ট অপরিহার্য।
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <p>
              <strong>প্রশ্ন:</strong> শেয়ারট্রিপ-এ কার্ডের মাধ্যমে বুকিং দিলে
              কি বাড়তি চার্জ পরিশোধ করতে হবে?
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <strong>উত্তর:</strong> অনলাইন বা অফলাইন বুকিংয়ের সময় একটি
            কনভিনিয়েন্স ফি আছে যা গ্রাহকদের দিতে হবে। তবে, শেয়ারট্রিপ-এ থেকে,
            অনলাইন বা অফলাইন বুকিংয়ে, কিছু কিনলে কোন অতিরিক্ত চার্জ নেই।
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <p>
              <strong>প্রশ্ন:</strong> শেয়ারট্রিপ কনভিনিয়েন্স ফি কী?
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <strong>উত্তর:</strong> কাস্টমাররা শেয়ারট্রিপ থেকে অনলাইনে যেসকল
            সহযোগিতা, কনভিনিয়েন্স ও সেবা উপভোগ করেন, তার জন্য প্রদেয় চার্জকে
            শেয়ারট্রিপ কনভিনিয়েন্স ফি বলা হয়।
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
