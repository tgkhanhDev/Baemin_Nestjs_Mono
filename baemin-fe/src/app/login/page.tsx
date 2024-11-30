"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Input, message } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/src/types/auth";
import { useAppDispatch } from "@/src/store";
import { loginThunk } from "@/src/store/authenManager/thunk";

const Page: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [loginReq, setLoginReq] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Chức năng vẫn đang được phát triển",
    });
  };

  const handleLogin = async () => {
    try {
      const user = await dispatch(loginThunk(loginReq)).unwrap();
      // user && router.push("/profile");
      user && router.push("/dashboard");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="mt-14 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Nhập
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input
            placeholder="Email/Số điện thoại"
            onChange={(e) => {
              setLoginReq({
                ...loginReq,
                email: e.target.value,
              })
            }}
            className="h-[40px]"
          />
        </div>
        <div className="flex flex-col w-full mt-3">
          <Input.Password
            placeholder="Mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => {
              setLoginReq({
                ...loginReq,
                password: e.target.value,
              })
            }}
          />
        </div>
        <div className="flex flex-col w-full mt-3">
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
        </div>
      </div>
    </>
  );
};
export default Page;
