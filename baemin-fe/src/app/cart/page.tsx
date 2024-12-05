"use client";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import DetailsCart from "./detailsCart";
import { Button, Modal, Checkbox, message } from "antd";
import {
  ViewCartThunk,
  EmptyCartThunk,
  UpdateCartThunk,
} from "@/src/store/cartManager/thunk";
import { useCart } from "@/src/hooks/useCart";
import { useAppDispatch } from "@/src/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const { viewCart, loading } = useCart();
  const [userId, setUserId] = useState<any>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [updatedItems, setUpdatedItems] = useState<
    { cart_item_id: string; quantity: number }[]
  >([]);

  useEffect(() => {
    //get user from localstorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    user && setUserId(user);
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

  const confirmEmptyCart = () => {
    dispatch(EmptyCartThunk(userId))
      .unwrap()
      .then(() => {
        message.success("Xóa giỏ hàng thành công!");
        setItemList([]);
        setOpen(false);
        dispatch(ViewCartThunk(userId))
      })
      .catch(() => {
        message.error("Xóa giỏ hàng thất bại! Vui lòng thử lại sau");
      });
  };

  const cancelEmptyCart = () => {
    setOpen(false);
  };

  const handleUpdateCart = () => {
    dispatch(UpdateCartThunk(updatedItems))
      .unwrap()
      .then(() => {
        setUpdatedItems([]);
      });
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
        <div className="w-1/2 h-full flex justify-end gap-10">
          {updatedItems?.length !== 0 && (
            <div
              className="flex items-center gap-3 mr-10 cursor-pointer text-beamin hover:text-cyan-400 duration-150"
              onClick={handleUpdateCart}
            >
              <div className="text-lg font-bold">Cập nhật</div>
            </div>
          )}

          <div
            className="flex items-center gap-3 mr-10 cursor-pointer text-red-500 hover:text-red-300 duration-150"
            onClick={handleEmptyCart}
          >
            <div className="text-xl font-bold">
              <DeleteOutlined />
            </div>
            <div className="text-base">|</div>
            <div className="text-lg font-bold">Xóa giỏ hàng</div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-16 flex flex-col gap-4  pb-16 rounded-md">
        <div className=" w-full h-16  bg-white  grid grid-cols-12">
          <div className="pl-8  col-span-4 flex items-center flex-row gap-5">
            <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
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
          setUpdatedItems={setUpdatedItems}
          loading={loading}
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
                disabled={price === 0}
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
        okButtonProps={{ style: { backgroundColor: "#3AC5C9" } }}
      >
        <p>Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?</p>
      </Modal>
    </>
  );
}
