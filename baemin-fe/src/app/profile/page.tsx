"use client";
import { useAppDispatch } from "@/src/store";
import { getUserInfoThunk } from "@/src/store/authenManager/thunk";
import { UserInfo } from "@/src/types/auth";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { get } from "http";
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

  const dispatch = useAppDispatch();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      //get user from localstorage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = user && await dispatch(getUserInfoThunk(user)).unwrap();
      setUserInfo({...res, user_id: user});
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <div
        className={`mt-28 w-1/3 bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8 shadow-md duration-700 ${isLoaded ? "opacity-100 translate-0" : "opacity-0 translate-y-20"
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
              <label className="text-xs font-bold h-1">Email:</label>
              <Input placeholder="example@gmail.com" className="h-[40px]" disabled value={userInfo?.email} />
            </div>
            <div className="flex w-full gap-3">
              <div className="flex flex-col w-1/2 gap-3">
                <label className="text-xs font-bold h-1">First Name:</label>
                <Input placeholder="John" className="h-[40px]" value={userInfo?.first_name} />
              </div>
              <div className="flex flex-col w-1/2 gap-3">
                <label className="text-xs font-bold h-1">Last Name:</label>
                <Input placeholder="Doe" className="h-[40px]" value={userInfo?.last_name}  />
              </div>
            </div>
            <div className="flex flex-col w-full gap-3">
              <label className="text-xs font-bold h-1">Phone Number:</label>
              <Input placeholder="0125748392" className="h-[40px]" value={userInfo?.phone_number} />
            </div>
            <div className="flex flex-col w-full gap-3">
              <label className="text-xs font-bold h-1">password:</label>
              <Input
                placeholder="johndoe123Example@gmail.com"
                className="h-[40px]"
                value={"*********"}
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
