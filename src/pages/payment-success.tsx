import { authAxios } from "@/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function PaymentSuccess() {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await authAxios.post(`/order/validate-payment?tran_id=${id}`);
      console.log(res);
    };

    fetchData();
  });
  return (
    <div className="mt-24 text-2xl font-semibold max-w-7xl mx-auto">
      Success Payment{id}
    </div>
  );
}
