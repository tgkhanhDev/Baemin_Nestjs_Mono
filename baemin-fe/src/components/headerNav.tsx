"use client";
import { Button, Select, Dropdown, Space } from "antd";
import { use, useEffect, useState } from "react";
import { useAppDispatch } from "@/src/store";
import { getShopThunk } from "@/src/store/shopManager/thunk";
import { ViewCartThunk } from "../store/cartManager/thunk";
import { useCart } from "../hooks/useCart";
import Search from "antd/es/input/Search";
import {
  HomeOutlined,
  SolutionOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SwapOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a href="/profile" style={{ fontSize: "16px" }}>
        Tài khoản
      </a>
    ),
    icon: <UserOutlined style={{ fontSize: "16px" }} />,
  },
  {
    key: "2",
    label: (
      <a href="/transaction" style={{ fontSize: "16px" }}>
        Hóa đơn
      </a>
    ),
    icon: <SwapOutlined style={{ fontSize: "16px" }} />,
  },
  {
    key: "3",
    label: (
      <a
        href="/login"
        onClick={() => localStorage.removeItem("user")}
        style={{ fontSize: "16px" }}
      >
        Log out
      </a>
    ),
    icon: <PoweroffOutlined style={{ fontSize: "16px" }} />,
  },
];

export default function HeaderNav() {
  const dispatch = useAppDispatch();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { Option } = Select;
  const [userId, setUserId] = useState<any>(null);
  const { viewCart } = useCart();
  const handleSelectChange = (value: string) => {
    const city = value === "" ? null : value;
    setSelectedCity(city);
    fetchData(city);
  };

  const [userSlice, setUserSlice] = useState<any>(null);
  const user = useSelector((state: any) => state.manageAuthen.user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    user && setUserSlice(user);
  }, []);

  const fetchData = (city: string | null) => {
    const params = { location: city || undefined };
    dispatch(getShopThunk(params));
  };

  const onSearch = (value: string) => {
    const params = { name: value, location: selectedCity || undefined };
    dispatch(getShopThunk(params));
  };

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

  const itemCount = Array.isArray(viewCart) ? viewCart.length : 0;

  return (
    <div className="w-full h-fix bg-white flex flex-row fixed  py-3 gap-4 justify-items-center	justify-center z-50	">
      <div className="flex-none w-fit h-full ml-10 cursor-pointer">
        <Link href="/dashboard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="131"
            height="50"
            viewBox="0 0 131 27"
          >
            <g fill="#3AC5C9" fillRule="evenodd">
              <path d="M45 0v27h18v-5.21H50.054v-5.685h8.837v-5.21h-8.837V5.21H63V0zM90 0v5.21h6.948v16.58H90V27h19v-5.21h-6.95V5.21H109V0zM11.86 11.132H5.046V5.21h6.64c1.895 0 2.824 1.162 2.824 2.961 0 1.8-.752 2.96-2.648 2.96m-.177 10.659H5.045V15.869h6.816c1.896 0 2.648 1.161 2.648 2.96 0 1.8-.929 2.96-2.825 2.96M19 8.645v-.947C19 3.434 15.77 0 11.76 0H0v27H11.76C15.769 27 19 23.566 19 19.303v-.947A6.287 6.287 0 0 0 16.74 13.5 6.285 6.285 0 0 0 19 8.644M119.319 0l6.25 16.536c.078.206.375.148.375-.072V0H131v27h-6.32l-6.247-16.526c-.079-.208-.379-.15-.379.073V27H113V0h6.319zM80.506 10.465l-1.702 6.255c-.647 2.379-3.96 2.378-4.606 0l-1.706-6.272c-.059-.216-.372-.173-.372.052V27H67V0h6.282l3.033 11.008c.053.192.32.192.372 0L79.72 0H86v27h-5.118V10.517c0-.228-.317-.271-.376-.052M28.572 16.715l2.742-11.59c.048-.2.326-.2.373 0l2.742 11.59h-5.857zm8.064-12.546a5.257 5.257 0 0 0-1.864-3C33.808.39 32.718 0 31.502 0c-1.244 0-2.342.39-3.293 1.169-.95.779-1.565 1.779-1.844 3L21 27h5.136l1.218-5.143h8.293L36.865 27H42L36.636 4.17z" />
            </g>
          </svg>
        </Link>
      </div>
      <div className="grow  flex flex-row items-center gap-9	 ">
        <Select
          className="ml-10 w-44"
          value={selectedCity ?? ""}
          onChange={handleSelectChange}
          placeholder="Chọn thành phố"
        >
          <Option value="">Tất cả</Option>
          <Option value="Ho_Chi_Minh">Hồ Chí Minh</Option>
          <Option value="Ha_Noi">Hà Nội</Option>
          <Option value="Da_Nang">Đà Nẵng</Option>
        </Select>
        <Search
          className="w-1/3"
          placeholder="Tìm kiếm Shop"
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="flex-none w-1/4  flex flex-row items-center  py-2">
        <Button
          href="/dashboard"
          className="font-normal  leading-5 btn-home	"
          style={{
            fontSize: "18px",
            height: "100%",
            color: "rgb(128, 128, 137)",
          }}
          type="text"
          icon={<HomeOutlined />}
        >
          Trang Chủ
        </Button>
        <div className="hover:cursor-pointer">
          {!userSlice || Object.keys(userSlice).length === 0 ? (
            <Button onClick={() => (window.location.href = "/login")}>
              Login
            </Button>
          ) : (
            <Dropdown
              menu={{ items: items }}
              overlayStyle={{
                minWidth: "200px",
                padding: "12px 24px",
              }}
            >
              <a
                onClick={(e) => e.preventDefault()}
                className="font-normal leading-5 btn-home"
              >
                <Space
                  style={{ fontSize: "18px", color: "rgb(128, 128, 137)" }}
                >
                  <SolutionOutlined />
                  Tài Khoản
                </Space>
              </a>
            </Dropdown>
          )}
        </div>
        <Button
          href="/cart"
          type="text"
          style={{
            fontSize: "20px",
            width: "40px",
            height: "100%",
            color: "#3AC5C9",
          }}
          icon={<ShoppingCartOutlined />}
        ></Button>
        {itemCount !== 0 && (
          <span
            className="text-xs bg-red-600 relative rounded w-full text-white bottom-3 right-4 text-center"
            style={{ width: "15px", borderRadius: "50px" }}
          >
            {itemCount}
          </span>
        )}
      </div>
    </div>
  );
}
