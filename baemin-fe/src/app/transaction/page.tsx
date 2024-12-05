"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PaymentHistory } from "@/src/types/payment";
import { useAppDispatch } from "@/src/store";
import { getPaymentByAccountIdThunk } from "@/src/store/paymentManager/thunk";
import { usePayment } from "@/src/hooks/usePayment";
import { Skeleton } from "antd";

const Page: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { payment, loading } = usePayment();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    dispatch(getPaymentByAccountIdThunk(user));
  }, []);

  const PaymentHistorySkeleton = () => {
    return (
      <tr>
        <td className="py-3 px-4 border-b">
          <Skeleton.Input active />
        </td>
        <td className="py-3 px-4 border-b">
          <Skeleton.Input active />
        </td>
        <td className="py-3 px-4 border-b text-right">
          <Skeleton.Input active />
        </td>
        <td className="py-3 px-4 border-b">
          <Skeleton.Input active />
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="mt-14 mx-auto w-full max-w-4xl bg-white border shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Payment Information
        </h1>
        <table className="table-auto w-full border-collapse block overflow-y-scroll max-h-96">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">
                Delivery Address
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">
                Message
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700 border-b">
                Total Cost
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 border-b">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <PaymentHistorySkeleton key={index} />
                ))
              : payment &&
                payment.map((item, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer hover:bg-gray-50 duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                    onClick={() =>
                      router.push(`/statusorder/${item.payment_id}`)
                    }
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
        {payment.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No payment data available.
          </div>
        )}
      </div>
    </>
  );
};
export default Page;
