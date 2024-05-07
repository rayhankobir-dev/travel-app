import Paris from "@/assets/paris.png";
export default function TrendingDestItem() {
  return (
    <div className="flex flex-col items-center text-sm">
      <img src={Paris} className="w-24 h-24 rounded-full" />
      <h5 className="font-medium pt-1">Paris</h5>
      <p className="font-thin ">100+ Tours</p>
    </div>
  );
}
