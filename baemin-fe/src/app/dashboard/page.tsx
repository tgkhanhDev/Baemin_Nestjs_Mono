"use client";
import ScrollBar from "@/src/components/scrollBar";
import ScrollFood from "@/src/components/scrollFood";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getShopThunk } from "@/src/store/shopManager/thunk";
import { useAppDispatch } from "@/src/store";
import { useShop } from "@/src/hooks/useShop";

export default function Home() {
  const dispatch = useAppDispatch();
  const { shop, loading } = useShop();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const params = {
      label: selectedType || undefined,
    };
    dispatch(getShopThunk(params));
  }, [dispatch, selectedType]);

  const items = [
    {
      name: "Tất cả",
      type: null,
      imageSrc: "/images/all.png",
      description: "Tất cả",
    },
    {
      name: "Thức ăn",
      type: "Food",
      imageSrc: "/images/burger.png",
      description: "Thức ăn",
    },
    {
      name: "Nước uống",
      type: "Drink",
      imageSrc: "/images/drink.png",
      description: "Nước uống",
    },
    {
      name: "Đồ ăn chay",
      type: "Vege",
      imageSrc: "/images/vege.png",
      description: "Đồ ăn chay",
    },
    {
      name: "Tráng miệng",
      type: "Dessert",
      imageSrc: "/images/dessert.png",
      description: "Tráng miệng",
    },
    {
      name: "Mì",
      type: "Noodles",
      imageSrc: "/images/noddle.png",
      description: "Mì",
    },
  ];

  const banneritems = [
    {
      id: "1",
      name: "anh đẹp trai",
      url: "/images/map1.png",
    },
    {
      id: "2",
      name: "trà sữa vị matcha",
      url: "/images/map2.png",
    },
    {
      id: "3",
      name: "nhoàm nhoàm",
      url: "/images/map3.png",
    },
    {
      id: "4",
      name: "OISHIIIIIIIIIIIIIIIIIi",
      url: "/images/map4.png",
    },
  ];

  const handleTypeClick = (type: string | null) => {
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8 z-40">
          <div className="flex flex-col fixed  bg-white w-64 rounded-2xl pt-2 pb-5 gap-3  ">
            <span className="pl-3">Thể loại</span>
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col gap-3 py-4 cursor-pointer hover:bg-slate-100 ${
                  selectedType === item.type ? "bg-slate-200" : ""
                }`}
                onClick={() => handleTypeClick(item.type)}
              >
                <div className="flex flex-row items-center gap-1 pl-3">
                  <Image
                    src={item.imageSrc}
                    width={30}
                    height={30}
                    alt={item.description}
                  />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
          <ScrollBar items={banneritems}></ScrollBar>
          <ScrollFood items={shop} loading={loading}></ScrollFood>
        </div>
      </div>
    </>
  );
}
