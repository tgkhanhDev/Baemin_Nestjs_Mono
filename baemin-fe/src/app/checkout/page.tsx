"use client";

import {
  AccountBookOutlined,
  CompassOutlined,
  ShoppingCartOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import DetailsCheckout from "./detailsCheckout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input, message, Spin } from "antd";
import { createPaymentThunk } from "@/src/store/paymentManager/thunk";
import { EmptyCartThunk } from "@/src/store/cartManager/thunk";
import { useAppDispatch } from "@/src/store";
import { Payment } from "@/src/types/payment";
import axios from "axios";
import { usePayment } from "@/src/hooks/usePayment";

export default function Home() {
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [address, setAddress] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const { loading } = usePayment();

  const [totalMoney, setTotalMoney] = useState(0);

  const dispatch = useAppDispatch();

  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    //get user from localstorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    user && setUserId(user);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Gọi Nominatim API, Google chơi trả phí ai chơi-_-
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&accept-language=vi`;

          try {
            const response = await axios.get(url);
            if (response.data && response.data.display_name) {
              setAddress(response.data.display_name);
            } else {
              console.error("Không tìm thấy địa chỉ từ tọa độ.");
            }
          } catch (error) {
            console.error("Lỗi khi gọi Nominatim API:", error);
          }
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí:", error.message);
        }
      );
    } else {
      console.error("Geolocation không được hỗ trợ trên trình duyệt này.");
    }
  }, []);

  const handleChangeAddress = (e: any) => {
    setAddress(e.target.value);
  };

  const handleChangeMessage = (e: any) => {
    setUserMessage(e.target.value); // Cập nhật lời nhắn
  };

  useEffect(() => {
    const savedOrderData = localStorage.getItem("orderData");
    if (savedOrderData) {
      const orderData = JSON.parse(savedOrderData);

      const orderDetailArr: any[] = [];

      orderData.map((item: any) => {
        const orderItem = {
          food_name: item.food.food_name,
          food_id: item.food.food_id,
          per_price: item.food.price,
          type: item.food.type,
          food_thumbnail: item.food.food_thumbnail,
          quantity: item.food.quantity,
          shop_id: item.shop_id,
        };
        orderDetailArr.push(orderItem);
      });

      setOrderDetails(orderDetailArr);
    }
  }, []);

  const detail = orderDetails ? orderDetails : [];

  useEffect(() => {
    if (orderDetails) {
      let total = 0;
      orderDetails.map((item: any) => {
        const price = item.per_price * item.quantity;
        total += price;
      });
      setTotalMoney(total);
    }
  }, [orderDetails]);

  const router = useRouter();

  const handleBuy = async () => {
    if (!address) {
      message.error("Vui lòng nhập đầy đủ địa chỉ nhận hàng của bạn!");
      return;
    }
    const transactionList: any[] = [];

    orderDetails.map((item: any) => {
      const transaction = {
        food_name: item.food_name,
        food_id: item.food_id,
        per_price: item.per_price,
        type: item.type,
        food_thumbnail: item.food_thumbnail,
        quantity: item.quantity,
        shop_id: item.shop_id,
      };
      transactionList.push(transaction);
    });

    const payload: Payment = {
      delivery_address: address,
      message: userMessage || "",
      account_id: userId || "",
      transactions: transactionList,
    };
    await dispatch(createPaymentThunk(payload))
      .unwrap()
      .then(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        dispatch(EmptyCartThunk(user));
        router.push("/transaction");
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
          <div className="text-3xl  text-beamin font-bold">Thanh Toán</div>
        </div>
        <div className="w-1/2 h-full flex   items-center gap-3"></div>
      </div>
      <div className="px-16 flex flex-col gap-3 ">
        <div className="w-full h-28 flex flex-col bg-white rounded-md pl-10 pt-5">
          <div className="flex flex-row gap-1">
            <div className="text-xl">
              <svg
                version="1.1"
                viewBox="0 0 2048 2048"
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#3AC5C9"
                  transform="translate(1e3 353)"
                  d="m0 0h48l30 3 28 5 32 8 29 10 27 12 23 12 24 15 18 13 14 11 11 10 8 7 21 21 7 8 13 16 13 18 14 22 12 22 11 23 11 29 8 28 6 28 4 29 2 33v12l-1 23-3 27-5 28-7 27-10 30-11 26-12 26-16 36-18 40-12 27-36 80-18 41-16 35-16 36-18 40-12 27-36 80-11 25-13 29-19 42-32 72-19 42-18 40-13 30-16 35-2 3-8-16-18-40-18-41-17-37-32-72-13-29-36-80-11-25-36-80-20-45-36-80-28-63-19-42-17-38-16-36-13-29-18-40-11-27-9-29-7-30-4-26-2-20v-55l3-28 5-28 7-28 11-32 11-25 13-25 13-21 12-17 10-13 12-14 12-13 16-16 8-7 14-12 18-13 15-10 15-9 18-10 28-13 28-10 25-7 28-6 31-4zm7 183-27 4-25 7-19 8-19 10-16 11-11 9-10 9-11 11-11 14-9 13-8 14-8 16-9 27-4 19-2 15v38l3 21 4 17 7 21 10 21 12 19 10 13 9 10 7 8 8 7 12 10 15 10 16 9 15 7 24 8 25 5 7 1 24 1 20-1 24-4 21-6 20-8 21-11 17-12 11-9 14-13 7-8 11-14 10-15 11-21 9-24 6-26 2-15v-39l-4-26-6-21-6-16-8-16-8-14-14-19-12-13-11-11-14-11-13-9-16-9-17-8-21-7-23-5-16-2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-beamin">
              Địa chỉ giao hàng
            </span>
          </div>
          <div className="pl-3 flex flex-row gap-5 items-center mb-3 mt-3">
            <span>Địa chỉ:</span>
            <Input
              value={address}
              onChange={handleChangeAddress}
              placeholder="Nhập địa chỉ của bạn"
              style={{ width: "300px" }}
            />
          </div>
        </div>
        <div className="w-full bg-white rounded-md  flex flex-col pt-5 ">
          <div className="ml-10">Thông tin sản phẩm</div>

          <DetailsCheckout items={detail} />
          <div className="border-t w-full  mt-4">
            <div className="ml-[40%]  flex flex-row justify-between items-center py-2 ">
              <div className=" flex flex-row items-center gap-3">
                <div className="text-beamin text-xl">
                  <AccountBookOutlined />
                </div>
                <span className="text-base">Thông tin đơn hàng</span>
              </div>
            </div>
          </div>
          <div className="border-t w-full grid grid-cols-12 h-28">
            <div className="col-span-7 border-r flex items-center gap-3 px-6">
              <label
                htmlFor="message"
                className="whitespace-nowrap font-medium"
              >
                Lời Nhắn:
              </label>
              <Input
                id="message"
                type="text"
                value={userMessage}
                onChange={handleChangeMessage}
                placeholder="Lưu ý cho người bán"
                className="border border-gray-300 rounded-md focus:ring focus:ring-beamin focus:border-beamin w-full h-10 px-3"
              />
            </div>

            <div className="col-span-5 flex justify-end items-center gap-3 pr-6">
              <span className="font-medium">Tổng số tiền:</span>
              <span className="text-beamin font-bold text-lg">
                ${totalMoney}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full  flex flex-col bg-white rounded-md  pt-5 gap-3">
          <div className="w-full   border-t flex flex-col justify-end items-end pt-4  gap-4">
            <div className="flex justify-between w-[30%] ">
              <div className="text-sm text-gray-900">Tổng tiền hàng</div>
              <div className="text-sm mr-5">${totalMoney}</div>
            </div>
            <div className="flex justify-between w-[30%] ">
              <div className="text-sm text-gray-900">Tổng thanh toán</div>
              <div className="text-2xl mr-5 text-beamin">${totalMoney}</div>
            </div>
          </div>
          <div className="w-full border-t  flex flex-row justify-between items-center  pt-4  gap-4 mb-4">
            <div className="w-[70%] ml-8">
              Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo{" "}
              <span className="text-blue-600 text-sm cursor-pointer">
                Điều khoản Baemin
              </span>
            </div>
            <div className="w-[30%] pl-48 ">
              {loading ? (
                <button
                  className="p-1 bg-beamin text-white w-36 rounded-md h-10 hover:brightness-105"
                >
                  <Spin indicator={<LoadingOutlined style={{ color: "#fff" }} spin />} size="default" />
                </button>
              ) : (
                <button
                  // onClick={handleNavigate}
                  onClick={handleBuy}
                  className="p-1 bg-beamin text-white w-36 rounded-md h-10 hover:brightness-105"
                >
                  Đặt hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
