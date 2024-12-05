"use client";
import { Button, InputNumber, Checkbox, Skeleton } from "antd";
import { Butterfly_Kids } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ViewCart } from "@/src/types/cart";
import { useAppDispatch } from "@/src/store";
import { DeleteCartThunk, ViewCartThunk } from "@/src/store/cartManager/thunk";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DetailsCart({
  Details,
  setPrice,
  setItemList,
  itemList,
  selectAll,
  setUpdatedItems,
  loading,
}: {
  Details: ViewCart[] | null;
  setPrice: any;
  itemList: any;
  setItemList: any;
  selectAll: boolean;
  setUpdatedItems: React.Dispatch<
    React.SetStateAction<{ cart_item_id: string; quantity: number }[]>
  >;
  loading: boolean;
}) {
  // Kiểm tra trường hợp Details là null hoặc mảng rỗng
  if (!loading && (!Details || Details.length === 0))
    return (
      <div className="text-center text-gray-500 py-10 text-lg">
        No details available
      </div>
    );
  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    //get user from localstorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    user && setUserId(user);
  }, []);

  const flatDetails = Details?.flat() || [];
  const router = useRouter();

  useEffect(() => {
    const totalPrice = itemList.reduce(
      (acc: number, item: any) => acc + item.food.price * item.quantity,
      0
    );
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
        setPrice(
          (prevPrice: any) => prevPrice - items.food.price * items.quantity
        );
        return prevItemList.filter((item: any) => item !== items);
      } else {
        // Add item and recalculate price
        setPrice(
          (prevPrice: any) => prevPrice + items.food.price * items.quantity
        );
        return [...prevItemList, items];
      }
    });
  };

  const dispatch = useAppDispatch();
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());

  const handleDelete = (itemId: string) => {
    setHiddenItems((prev) => new Set(prev).add(itemId));
    dispatch(DeleteCartThunk(itemId))
      .unwrap()
      .then(() => {
        toast.success("Xóa sản phẩm thành công");
        dispatch(ViewCartThunk(userId));
      })
      .catch(() => {
        setHiddenItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemId); // Show the item again if deletion fails
          return newSet;
        });
        toast.error("Xóa sản phẩm thất bại");
      });
  };

  const onChange = (
    value: number | null,
    cart_item_id: string,
    initialQuantity: number
  ) => {
    if (value !== null) {
      setUpdatedItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.cart_item_id === cart_item_id
        );

        if (value === initialQuantity) {
          // Loại bỏ mục nếu quantity trở lại giá trị ban đầu
          return prevItems.filter((item) => item.cart_item_id !== cart_item_id);
        }

        if (existingItemIndex !== -1) {
          // Cập nhật quantity nếu item đã tồn tại
          const updated = [...prevItems];
          updated[existingItemIndex].quantity = value;
          return updated;
        } else {
          // Thêm item mới nếu chưa tồn tại
          return [...prevItems, { cart_item_id, quantity: value }];
        }
      });
    }
  };

  const CartItemSkeleton = () => {
    return (
      <div className="w-full flex flex-col bg-white rounded-md">
        <div className="w-full border-t border-b border-solid border-gray-600 py-3">
          {/* Lặp qua các item trong cart */}
          <div className="w-full grid grid-cols-12">
            <div className="pl-8 col-span-4 flex items-center gap-3">
              <Checkbox disabled />
              <div className="relative h-36 w-36 flex justify-center items-center">
                <Skeleton.Image active className="" />
              </div>
              <Skeleton
                active
                title={false}
                paragraph={{
                  rows: 2,
                  width: ["50%", "80%"],
                }}
              />
            </div>
            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
              <Skeleton.Input active style={{ width: "60%" }} />
            </div>
            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
              <Skeleton.Input active style={{ width: "60%" }} />
            </div>
            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
              <Skeleton.Input active style={{ width: "60%" }} />
            </div>
            <div className="col-span-2 flex items-center justify-center flex-row gap-3">
              <Skeleton.Button active style={{ width: "50%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleNavigate = (id: string) => {
    router.push(`/detailfood/${id}`);
  };

  return (
    <>
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <CartItemSkeleton key={index} />
          ))
        : flatDetails.map(
            (items, index) =>
              !hiddenItems.has(items.cart_item_id) && (
                <div
                  key={items.cart_item_id || index}
                  className="w-full flex flex-col bg-white rounded-md"
                >
                  <div className="w-full border-t border-b border-solid border-gray-600 py-3">
                    {/* Lặp qua các item trong cart */}
                    <div className="w-full grid grid-cols-12">
                      <div className="pl-8 col-span-4 flex items-center flex-row gap-3">
                        <Checkbox
                          onChange={() => handleCheckboxChange(items)}
                          checked={itemList.includes(items)}
                        />
                        <div
                          className="relative h-36 w-36 cursor-pointer"
                          onClick={() => handleNavigate(items.food.shop_id)}
                        >
                          <Image
                            fill
                            style={{ objectFit: "cover" }}
                            src={
                              items?.food?.food_thumbnail || "/images/all.png"
                            } // Nếu không có ảnh, dùng ảnh mặc định
                            alt={items.food.food_name}
                          />
                        </div>
                        <div
                          className="flex flex-col gap-3 cursor-pointer"
                          onClick={() => handleNavigate(items.food.shop_id)}
                        >
                          <span className="text-base">
                            {items.food?.food_name}
                          </span>
                          <span className="text-sm text-gray-600">
                            {items.food?.description}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                        ${items.food?.price}
                      </div>
                      <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                        <InputNumber
                          size="middle"
                          min={1}
                          max={99}
                          defaultValue={items.quantity}
                          onChange={(value) =>
                            onChange(value, items.cart_item_id, items.quantity)
                          }
                        />
                      </div>
                      <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                        ${items.food?.price * items.quantity}
                      </div>
                      <div
                        className="col-span-2 flex items-center justify-center flex-row gap-3"
                        onClick={() => handleDelete(items.cart_item_id)}
                      >
                        <span className="hover:text-red-600 duration-150 font-semibold cursor-pointer">
                          Xóa
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
    </>
  );
}
