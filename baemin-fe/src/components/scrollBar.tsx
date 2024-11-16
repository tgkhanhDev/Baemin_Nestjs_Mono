'use client'
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

export default function ScrollBar({ items }: { items: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = '300px';
    }
  }, [items, currentIndex]);

  const handleNext = () => {
    if (containerRef.current && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      containerRef.current.scrollBy({ left: 489, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (containerRef.current && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      containerRef.current.scrollBy({ left: -489, behavior: 'smooth' });
    }
  };

  if (items.length === 0) return <div>Loading...</div>;

  return (
    <div className="w-full relative">
      {currentIndex > 0 && (
        <button onClick={handlePrev} className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-32 left-6 w-8 h-8 rounded-full z-20">
          <LeftOutlined />
        </button>
      )}
      <div ref={containerRef} className="relative scroll-container flex bg-white rounded-2xl w-full p-4 gap-2 h-[300px]">
        {items.map((item, index) => (
          <div key={index} className="relative flex-shrink-0 w-1/2 bg-blue-200 p-4 cursor-pointer">
            <Image fill style={{ objectFit: "cover" }} src={item.url} alt="" />
          </div>
        ))}
      </div>
      {currentIndex < items.length - 1 && (
        <button onClick={handleNext} className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-32 right-3 w-8 h-8 rounded-full z-20">
          <RightOutlined />
        </button>
      )}
    </div>
  );
}
