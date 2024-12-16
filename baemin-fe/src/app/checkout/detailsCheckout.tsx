import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "antd";

export default function DetailsCheckout({ items }: { items: any[] }) {
  const [loadImage, setLoadImage] = useState(true);
  return (
    <>
      <div className="mt-3 ml-10 grid grid-cols-12">
        <div className="col-span-6 font-bold">Món Ăn</div>
        <div className="col-span-2 font-bold">Đơn giá</div>
        <div className="col-span-2 font-bold">Số lượng</div>
        <div className="col-span-2 font-bold">Tổng giá</div>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="mt-3 ml-10 grid grid-cols-12 items-center border-b pb-3"
        >
          {/* Hình ảnh và tên món ăn */}
          <div className="col-span-6 flex items-center gap-4">
            {loadImage && (
              <Skeleton.Node active style={{ width: 100, height: 40 }} />
            )}
            <Image
              src={item.food_thumbnail}
              alt={item.food_name}
              width={50}
              height={50}
              className="rounded-md"
              onLoad={() => setLoadImage(false)}
            />
            <span>{item.food_name}</span>
          </div>
          {/* Đơn giá */}
          <div className="col-span-2">${item.per_price.toLocaleString()}</div>
          {/* Số lượng */}
          <div className="col-span-2">{item.quantity}</div>
          {/* Tổng giá */}
          <div className="col-span-2">
            ${(item.per_price * item.quantity).toLocaleString()}
          </div>
        </div>
      ))}
    </>
  );
}
