"use client";
import Image from "next/image";
import React from "react";
import { Transaction } from "@/src/types/transaction";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";

export default function DetailsOrder({
  items,
  loading,
}: {
  items: Transaction[] | null;
  loading: boolean;
}) {
  if (!loading && (!items || items.length === 0)) {
    return (
      <div className="text-center text-gray-500 py-10 text-lg">
        No details available
      </div>
    );
  }

  const flatDetails = items?.flat() || [];
  const router = useRouter();

  const OrderItemSkeleton = () => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-full h-full">
            <Skeleton.Node active />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton.Input active />
            <Skeleton.Input active />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Skeleton.Input active />
          <Skeleton.Input active />
        </div>
      </div>
    );
  };

  const handleNavigate = (id: string) => {
    router.push(`/detailfood/${id}`);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      {/* Order Items */}
      <div className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <OrderItemSkeleton key={index} />
            ))
          : flatDetails.map((item, index) => (
              <div
                key={item.food_id || index}
                className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleNavigate(item.shop_id)}
              >
                {/* Thumbnail & Name */}
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      src={item?.food_thumbnail || "/images/all.png"}
                      alt={item.food_name}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {item.food_name}
                    </p>
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                  </div>
                </div>

                {/* Price Info */}
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold text-beamin">
                    ${item.per_price * item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    (${item.per_price} mỗi món)
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
