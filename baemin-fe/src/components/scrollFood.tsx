"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Shop } from "../types/shop";
import { Skeleton } from "antd";

interface ScrollFoodProps {
  items: Shop[] | null;
  loading: boolean;
}

export default function ScrollFood({ items, loading }: ScrollFoodProps) {
  const router = useRouter();

  const handleNavigate = (id: string) => {
    router.push(`/detailfood/${id}`);
  };

  const SkeletonCard = () => (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex justify-center items-center">
        <Skeleton.Image active/>
      </div>

      {/* Phần text Skeleton */}
      <Skeleton
        active
        title={false}
        paragraph={{
          rows: 6,
          width: ["100%", "70%", "30%", "30%", "60%", "40%"],
        }}
      />
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Shops List</h2>
      <div className="flex flex-col gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : items?.map((shop) => (
              <div
                key={shop.shop_id}
                onClick={() => handleNavigate(shop.shop_id)}
                className="bg-gray-100 rounded-lg shadow-md cursor-pointer p-4 transition-transform hover:scale-105"
              >
                {/* Hình ảnh của cửa hàng */}
                <div className="relative w-full h-40 mb-3">
                  <Image
                    src={shop.shop_thumbnail}
                    alt={shop.shop_name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                {/* Tên cửa hàng */}
                <div className="text-lg font-semibold truncate">
                  {shop.shop_name}
                </div>
                {/* Địa chỉ cửa hàng */}
                <div className="text-sm text-gray-600 truncate">
                  {shop.shop_address}
                </div>
                {/* Đánh giá */}
                <div className="text-sm text-yellow-500 mt-1">
                  ⭐ {shop.rating.toFixed(1)}
                </div>
                {/* Danh mục */}
                <div className="text-sm text-gray-600 mt-1">
                  {shop.category}
                </div>
                {/* Thời gian mở cửa */}
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
                {/* Giá cả */}
                <div className="text-sm text-gray-600 mt-1">
                  ${shop.price_start} - ${shop.price_end}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
