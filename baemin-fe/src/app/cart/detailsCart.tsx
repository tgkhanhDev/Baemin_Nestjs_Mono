"use client";
import { Button } from "antd";
import { Butterfly_Kids } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ViewCart } from "@/src/types/cart";
import { useAppDispatch } from "@/src/store";
import { DeleteCartThunk } from "@/src/store/cartManager/thunk";
import { toast } from "react-toastify";

export default function DetailsCart({
  Details, setPrice, setItemList, itemList, selectAll
}: {
  Details: ViewCart[] | null;
  setPrice: any;
  itemList: any
  setItemList: any;
  selectAll: boolean;
}) {
  // Kiểm tra trường hợp Details là null hoặc mảng rỗng
  if (!Details || Details.length === 0) return <div>No details available</div>;

  const flatDetails = Details.flat();

  useEffect(() => {
    const totalPrice = itemList.reduce((acc: number, item: any) => acc + item.food.price * item.quantity, 0);
    setPrice(totalPrice);
  }, [itemList]);

  useEffect(() => {
    if (selectAll) {
      // If selectAll is true, set itemList to all items
      setItemList(flatDetails);
    } else {
      // If selectAll is false, clear the itemList
      setItemList([]);
    }
  }, [selectAll]);

  const handleCheckboxChange = (items: any) => {
    setItemList((prevItemList: any) => {
      if (itemList.includes(items)) {
        // Remove item and recalculate price
        setPrice((prevPrice: any) => prevPrice - (items.food.price * items.quantity));
        return prevItemList.filter((item: any) => item !== items);
      } else {
        // Add item and recalculate price
        setPrice((prevPrice: any) => prevPrice + (items.food.price * items.quantity));
        return [...prevItemList, items];
      }
    });
  };

  const dispatch = useAppDispatch();

  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());

  const handleDelete = (itemId: string) => {
    setHiddenItems(prev => new Set(prev).add(itemId));
    dispatch(DeleteCartThunk(itemId)).unwrap().then(() => {
      toast.success("Delete successfully");
    }).catch(() => {
      setHiddenItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId); // Show the item again if deletion fails
        return newSet;
      });
      toast.error("Delete failed");
    });
  };

  return (
    <>
      {flatDetails.map((items, index) => (
        !hiddenItems.has(items.cart_item_id) && (
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
                    checked={itemList.includes(items)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800"
                    onChange={() => handleCheckboxChange(items)}
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
                <div className="col-span-2 flex items-center justify-center flex-row gap-3" onClick={() => handleDelete(items.cart_item_id)}>
                  <span className="hover:text-red-600 duration-150 font-semibold cursor-pointer">Xóa</span>
                </div>
              </div>
            </div>
          </div>
        )
      ))}
    </>
  );
}
