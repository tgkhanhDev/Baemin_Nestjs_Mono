"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Shop } from "../types/shop";

interface ScrollFoodProps {
  items: Shop[];
}

export default function ScrollFood({ items }: ScrollFoodProps) {
  const router = useRouter();

  const handleNavigate = (id: string) => {
    router.push(`/detailfood/${id}`);
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Shops List</h2>
      <div className="flex flex-col gap-4">
        {items?.map((shop) => (
          <div
            key={shop.shop_id}
            onClick={() => handleNavigate(shop.shop_id)}
            className="bg-gray-100 rounded-lg shadow-md cursor-pointer p-4 transition-transform hover:scale-105"
          >
            <div className="relative w-full h-40 mb-3">
              <Image
                src={shop.shop_thumbnail}
                alt={shop.shop_name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="text-lg font-semibold truncate">
              {shop.shop_name}
            </div>
            <div className="text-sm text-gray-600 truncate">
              {shop.shop_address}
            </div>
            <div className="text-sm text-yellow-500 mt-1">
              ⭐ {shop.rating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {shop.category}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {shop.is_open ? "Mở cửa" : "Đóng cửa"} •{" "}
              {new Date(shop.open_time).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "UTC",
              })}{" "}
              -{" "}
              {new Date(shop.close_time).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "UTC",
              })}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              ${shop.price_start} - ${shop.price_end}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
