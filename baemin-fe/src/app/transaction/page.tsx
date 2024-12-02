"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PaymentHistory } from "@/src/types/payment";
import { useAppDispatch } from "@/src/store";
import { getPaymentByAccountIdThunk } from "@/src/store/paymentManager/thunk";

const Page: React.FC = () => {
  const [payment, setPayment] = useState<PaymentHistory[] | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPayment = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const response = await dispatch(getPaymentByAccountIdThunk(user));

      if (response.payload && Array.isArray(response.payload)) {
        setPayment(response.payload as PaymentHistory[]);
      } else {
        setPayment(null);
      }
    };

    fetchPayment();
  }, []);

  return (
    <>
      <div className="mt-14 mx-auto w-full max-w-4xl bg-white border shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Payment Information
        </h1>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-medium text-gray-700 border-b">
                Delivery Address
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 border-b">
                Message
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700 border-b">
                Total Cost
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 border-b">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payment &&
              payment.map((item, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer hover:bg-gray-50 duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => router.push(`/statusorder/${item.payment_id}`)}
                >
                  <td className="py-3 px-4 border-b text-gray-600">
                    {item.delivery_address}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-600">
                    {item.message === "" ? "No message" : item.message}
                  </td>
                  <td className="py-3 px-4 border-b text-right text-gray-600">
                    ${item.total_cost.toLocaleString()}
                  </td>
                  <td
                    className={`py-3 px-4 border-b text-gray-600 font-semibold ${
                      item.status === "Paid"
                        ? "text-green-600"
                        : item.status === "Unpaid"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {(!payment || payment.length === 0) && (
          <div className="text-center py-6 text-gray-500">
            No payment data available.
          </div>
        )}
      </div>
    </>
  );
};
export default Page;
