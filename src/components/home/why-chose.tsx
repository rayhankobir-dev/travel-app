import { Award, Gem, SailboatIcon, Ticket } from "lucide-react";

export default function WhyChoseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-0">
      <h2 className="font-semibold text-xl mb-8">Why choose Ghure Ashi</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="flex flex-col gap-2">
          <Ticket size={35} className="text-orange-600" />
          <h4 className="font-medium text-lg">Ultimate flexibility</h4>
          <p className="font-thin text-sm">
            You're in control, with free cancellation and payment options to
            satisfy any plan or budget.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <SailboatIcon size={35} className="text-orange-600" />
          <h4 className="font-medium text-lg">Memorable experiences</h4>
          <p className="font-thin text-sm">
            Browse and book tours and activities so incredible, you'll want to
            tell your friends.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Gem size={35} className="text-orange-600" />
          <h4 className="font-medium text-lg">Quality at our core</h4>
          <p className="font-thin text-sm">
            High-quality standards. Millions of reviews. A tourz company.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Award size={35} className="text-orange-600" />
          <h4 className="font-medium text-lg">Award-winning support</h4>
          <p className="font-thin text-sm">
            New price? New plan? No problem. We're here to help, 24/7.
          </p>
        </div>
      </div>
    </section>
  );
}
