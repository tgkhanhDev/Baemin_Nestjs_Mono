"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Input, message } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Payment } from "@/src/types/payment";
import { useAppDispatch } from "@/src/store";
import { getPaymentByAccountIdThunk } from "@/src/store/paymentManager/thunk";

const Page: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const [payment, setPayment] = useState<Payment[] | null>(null)
  const dispatch = useAppDispatch();
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Chức năng vẫn đang được phát triển",
    });
  };

  useEffect(() => {
    const fetchPayment = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await dispatch(getPaymentByAccountIdThunk(user)).unwrap();
    
      res && setPayment(res)
    }

    fetchPayment()

  },[payment])



  const handleLogin = () => {
    router.push("/profile");
  };

  return (
    <>
      {contextHolder}
      <div className="mt-14 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Payment
        </div>
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Delivery Address</th>
              <th>Message</th>
              <th>Total Cost</th>
              {/* <th>Order Date</th> */}
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {payment && payment.map((item, index) => (
              <tr key={index}>
                <td>{item.delivery_address}</td>
                <td>{item.message}</td>
                <td>{item?.total_cost}</td>
                <td>{item?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="flex flex-col w-full mt-3">
          <button
            className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
            onClick={handleLogin}
          >
            Đăng Nhập
          </button>
          <div className="flex flex-row justify-between items-center w-full text-sm text-beamin">
            <span className="cursor-pointer">Quên mật khẩu </span>
            <span className="cursor-pointer" onClick={warning}>
              Đăng nhập bằng SMS{" "}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-600">HOẶC</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5 h-[40px] ">
          <button
            className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base"
            onClick={warning}
          >
            <FacebookOutlined />
            <span>Facebook</span>
          </button>
          <button
            className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base"
            onClick={warning}
          >
            <GoogleOutlined />
            <span>Google</span>
          </button>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn mới biết đến Baemin?</span>
          <Link className="text-beamin cursor-pointer" href={"/register"}>
            {" "}
            Đăng kí
          </Link>
        </div> */}
      </div>
    </>
  );
};
export default Page;
