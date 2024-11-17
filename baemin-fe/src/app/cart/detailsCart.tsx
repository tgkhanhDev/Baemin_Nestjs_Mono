"use client";
import { Button } from "antd";
import { Butterfly_Kids } from "next/font/google";
import Image from "next/image";
import React from "react";
import { ViewCart } from "@/src/types/cart";

export default function DetailsCart({
  Details,
}: {
  Details: ViewCart[] | null;
}) {
  // Kiểm tra trường hợp Details là null hoặc mảng rỗng
  if (!Details || Details.length === 0) return <div>No details available</div>;

  const flatDetails = Details.flat();

  return (
    <>
      {flatDetails.map((items, index) => (
        <div
          key={items.cart_item_id || index}
          className="w-full flex flex-col bg-white rounded-md"
        >
          <div className="w-full border-t border-b border-solid border-gray-600 py-3">
            {/* Lặp qua các item trong cart */}
            <div className="w-full grid grid-cols-12">
              <div className="pl-8 col-span-4 flex items-center flex-row gap-3">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800"
                />
                <div className="relative h-36 w-36">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    src={items.food.food_thumbnail || "/images/all.png"} // Nếu không có ảnh, dùng ảnh mặc định
                    alt={items.food.food_name}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-base">{items.food?.food_name}</span>
                  <span className="text-sm text-gray-600">
                    {items.food?.description}
                  </span>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                ${items.food?.price}
              </div>
              <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                <input
                  type="number"
                  id="quantity"
                  className="w-16 text-center border border-gray-300 rounded"
                  defaultValue={items.quantity}
                  min="1"
                  max="100"
                />
              </div>
              <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                ${items.food?.price * items.quantity}
              </div>
              <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                <span className="hover:text-red-600 cursor-pointer">Xóa</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
