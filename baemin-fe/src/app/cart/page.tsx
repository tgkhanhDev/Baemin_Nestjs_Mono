"use client";
import {
  ShoppingCartOutlined,
  WindowsFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import DetailsCart from "./detailsCart";
import { Button, Modal } from "antd";
import { ViewCartThunk, EmptyCartThunk } from "@/src/store/cartManager/thunk";
import { useCart } from "@/src/hooks/useCart";
import { useAppDispatch } from "@/src/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const { viewCart } = useCart();
  const [userId, setUserId] = useState<any>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //get user from localstorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    user && setUserId(user);
    console.log("user ne: ", user);
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(ViewCartThunk(userId));
    }
  }, [userId, dispatch]);

  const [price, setPrice] = useState(0);
  const [itemList, setItemList] = useState<any[]>([]);
  useEffect(() => {
    console.log("list: ", itemList);
  }, [itemList]);

  const handlePayment = () => {
    const orderData: any[] = [];

    itemList.map((item) => {
      const foodItem = {
        shop_id: item.food.shop_id,
        food: {
          ...item.food,
          quantity: item.quantity,
        },
      };
      orderData.push(foodItem);
    });

    // Lưu vào localStorage
    localStorage.setItem("orderData", JSON.stringify(orderData));

    window.location.href = "/checkout";
  };

  const handleSelectAllChange = () => {
    setSelectAll((prev) => !prev);
    setItemList((prevItemList) => {
      if (!selectAll) {
        return Array.isArray(viewCart) ? [...viewCart] : [];
      } else {
        return [];
      }
    });
  };

  const handleEmptyCart = () => {
    setOpen(true);
  };

  const confirmEmptyCart = async () => {
    await dispatch(EmptyCartThunk(userId));
    setItemList([]);
    setOpen(false);
  };

  const cancelEmptyCart = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-row w-full h-20 bg-white ">
        <div className="w-1/2 h-full flex flex-row  items-center gap-3">
          <div className="ml-10 text-4xl  text-beamin font-bold">
            <ShoppingCartOutlined />
          </div>
          <div className="text-2xl  text-beamin ">|</div>
          <div className="text-3xl  text-beamin font-bold">Giỏ hàng</div>
        </div>
        <div
          className="w-1/2 h-full flex items-center justify-end gap-3 mr-10 cursor-pointer text-red-500 hover:text-red-300 duration-150"
          onClick={handleEmptyCart}
        >
          <div className="ml-10 text-xl font-bold">
            <DeleteOutlined />
          </div>
          <div className="text-base">|</div>
          <div className="text-lg font-bold">Xóa giỏ hàng</div>
        </div>
      </div>
      <div className="mt-4 px-16 flex flex-col gap-4  pb-16 rounded-md">
        <div className=" w-full h-16  bg-white  grid grid-cols-12">
          <div className="pl-8  col-span-4 flex items-center flex-row gap-5">
            <input
              id="select-all-checkbox"
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <span className="text-base font-normal">Chọn tất cả</span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Đơn giá
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Số lượng
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Số tiền
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Thao tác
            </span>
          </div>
        </div>
        <DetailsCart
          Details={viewCart ? [viewCart] : null}
          setPrice={setPrice}
          itemList={itemList}
          setItemList={setItemList}
          selectAll={selectAll}
        />
        <div className=" flex flex-row fixed bottom-0  w-[90.6%]  mr-16  h-16 bg-white items-center  ">
          <div className="flex flex-row gap-2 w-1/2 h-full items-center justify-end pr-2">
            <div className=""> Tổng thanh toán :</div>
            <div className="text-red-600">${price} </div>
            <div>
              <Button
                href="/checkout"
                onClick={() => handlePayment()}
                style={{ background: "#3AC5C9", color: "white" }}
                className="bg-beamin text-white w-40 h-10 rounded-md hover:brightness-105"
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Xác nhận"
        open={open}
        onOk={confirmEmptyCart}
        onCancel={cancelEmptyCart}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?</p>
      </Modal>
    </>
  );
}
