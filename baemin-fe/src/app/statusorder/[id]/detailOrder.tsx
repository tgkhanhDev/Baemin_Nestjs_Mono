"use client";
import { Button, InputNumber, InputNumberProps } from "antd";
import { Butterfly_Kids } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ViewOrder } from "@/src/types/payment";
import { useAppDispatch } from "@/src/store";
import { DeleteCartThunk } from "@/src/store/cartManager/thunk";
import { toast } from "react-toastify";

export default function DetailsOrder({
  Details,
}: {
  Details: ViewOrder[] | null;
}) {
  // Kiểm tra trường hợp Details là null hoặc mảng rỗng
  if (!Details || Details.length === 0) return <div>No details available</div>;

  const flatDetails = Details.flat();

  const dispatch = useAppDispatch();

  return (
    <>
      {flatDetails.map((items, index) => (
        <div
          key={items.food_id || index}
          className="w-full flex flex-col bg-white rounded-md"
        >
          <div className="w-full border-t border-b border-solid border-gray-600 py-3">
            {/* Lặp qua các item trong cart */}
            <div className="w-full grid grid-cols-12">
              <div className="pl-8 col-span-4 flex items-center flex-row gap-3">
                <div className="relative h-36 w-36">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    src={items?.food_thumbnail || "/images/all.png"} // Nếu không có ảnh, dùng ảnh mặc định
                    alt={items.food_name}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-base">{items.food_name}</span>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                ${items.per_price}
              </div>
              <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                {items.quantity}
              </div>
              <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                ${items.per_price * items.quantity}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
