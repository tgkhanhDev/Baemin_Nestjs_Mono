"use client";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page: React.FC = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/login");
  };
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <>
      <div
        className={`mt-28 w-1/3 bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8 shadow-md duration-700 ${
          isLoaded ? "opacity-100 translate-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Thông tin cá nhân
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-[70%] flex justify-center items-center">
            <div className="border border-slate-300 rounded-full w-24 h-24 flex justify-center items-center shadow-sm shadow-[#3AC5C9]">
              <UserOutlined className="text-6xl" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col w-full gap-3">
              <Input placeholder="Doe" className="h-[40px]" disabled />
            </div>
            <div className="flex flex-col w-full gap-3">
              <Input placeholder="John" className="h-[40px]" disabled/>
            </div>
            <div className="flex flex-col w-full gap-3">
              <Input placeholder="0125748392" className="h-[40px]" disabled/>
            </div>
            <div className="flex flex-col w-full gap-3">
              <Input
                placeholder="johndoe123Example@gmail.com"
                className="h-[40px]"
                disabled
              />
            </div>
          </div>
        </div>
        <button className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg">
          Thay đổi
        </button>
      </div>
    </>
  );
};
export default Page;
