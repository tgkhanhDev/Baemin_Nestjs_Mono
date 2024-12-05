"use client";
import {
  ClockCircleTwoTone,
  DollarTwoTone,
  DoubleRightOutlined,
  LikeFilled,
  SearchOutlined,
  StarFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Input, InputNumber, message, Space, Skeleton } from "antd";
import type { InputNumberProps } from "antd";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getShopDetailThunk } from "@/src/store/shopManager/thunk";
import { useAppDispatch } from "@/src/store";
import { useShop } from "@/src/hooks/useShop";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { addCartItemThunk, ViewCartThunk } from "@/src/store/cartManager/thunk";
import { Cart } from "@/src/types/cart";
export default function Home() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : params?.id[0];
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();
  const { shopDetail, loading } = useShop();

  useEffect(() => {
    if (id) {
      dispatch(getShopDetailThunk(id));
    }
  }, [dispatch, id]);

  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTypeClick = (type: any) => {
    setSelectedType(type);
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    //get user from localstorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    user && setUserId(user);
  }, []);

  const filteredFood = shopDetail?.food?.filter((food) => {
    const matchesType = selectedType ? food.type === selectedType : true;
    const matchesSearch = food.food_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const onChange: InputNumberProps["onChange"] = (value) => {
    setQuantity(value as number); // Đảm bảo giá trị là số
  };

  const buyNow = (food: any, quantity: number) => {
    if (quantity <= 0) {
      alert("Vui lòng chọn số lượng hợp lệ!");
      return;
    }

    const orderData = [
      {
        shop_id: id,
        food: {
          ...food,
          quantity,
        },
      },
    ];

    // Lưu vào localStorage
    localStorage.setItem("orderData", JSON.stringify(orderData));
    router.push("/checkout");
  };

  const addCart = async (food_id: string, quantity: number) => {
    if (quantity <= 0) {
      message.error("Vui lòng chọn số lượng hợp lệ!");
      return;
    }

    const payload: Cart = {
      account_id: userId,
      food_id: food_id,
      quantity: quantity,
    };
    console.log(payload);
    await dispatch(addCartItemThunk(payload));
    dispatch(ViewCartThunk(userId))
  };

  const ShopDetailSkeleton = () => {
    return (
      <div className="bg-white w-full h-80 flex">
        {/* Left Section */}
        <div className="w-[45%] h-full py-4 px-10">
          <div className="w-full h-full relative bg-gray-200 flex justify-center items-center">
            <Skeleton.Image active />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[55%] h-full relative px-8">
          <div className="flex flex-row text-[11px] justify-start items-center mt-3">
            <Skeleton
              active
              title={false}
              paragraph={{
                rows: 7,
                width: ["30%", "35%", "70%", "40%", "60%", "60%", "50%"],
              }}
            />
          </div>

          {/* Footer Section */}
          <div className="w-full flex flex-col absolute bottom-0 left-0 px-8 mb-4 text-[#959595] text-[13px]">
            <div className="border-t-[1px]"></div>
            <div className="flex flex-row gap-4 justify-start items-center py-[10px]">
              <Skeleton.Input active style={{ width: "40%" }} />
              <Skeleton.Input active style={{ width: "40%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FoodDetailSkeleton = () => {
    return (
      <div className="flex flex-col w-full gap-4 border-b pb-3">
        <div className="flex flex-row justify-center items-center gap-x-5">
          <div className="w-[15%] relative h-full">
            <Skeleton.Image active className="w-full h-full" />
          </div>
          <div className="w-[60%] flex flex-col gap-1 px-2">
            <Skeleton
              active
              title={false}
              paragraph={{
                rows: 2,
                width: ["80%", "100%"],
              }}
            />
          </div>
          <Skeleton.Input active style={{ width: "40%" }} />
          <Skeleton.Input active style={{ width: "80%" }} />
          <Skeleton.Button active style={{ width: "80%" }} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-auto">
      {/* Shop Info */}
      {loading ? (
        <ShopDetailSkeleton />
      ) : (
        <div className="bg-white w-full h-80 flex">
          <div className="w-[45%] h-full py-4 px-10">
            <div className="w-full relative h-full">
              <Image
                fill
                style={{ objectFit: "cover" }}
                src={shopDetail?.shop_thumbnail || "/food/ga1.jpg"}
                alt={shopDetail?.shop_name || "..."}
              />
            </div>
          </div>
          <div className=" w-[55%] h-full relative">
            <div className="absolute top-0 left-0 px-8 py-4">
              <span className="text-[13px] text-[#187CAA]">
                <a href="/">Home</a>{" "}
                <DoubleRightOutlined className="text-[10px]" />{" "}
                <a href="">{shopDetail?.shop_name}</a>
              </span>
              <div className="flex flex-row text-[11px] justify-start items-center mt-3">
                <div className="bg-beamin text-white p-1 mr-2 cursor-pointer tracking-wider flex gap-1">
                  <LikeFilled />
                  <span>Yêu thích</span>
                </div>
                <span className="text-[#959595]">{shopDetail?.label}</span>
              </div>
              <div className="text-[22px] font-bold mt-2">
                {shopDetail?.shop_name}
              </div>
              <div className="text-[13px] mt-1">{shopDetail?.shop_address}</div>
              <div className="flex flex-row text-[14px] gap-2 justify-start items-center">
                <ol className="flex flex-row text-[#FFC107] gap-1">
                  <li>
                    <StarFilled />
                  </li>
                  <li>{shopDetail?.rating}</li>
                </ol>
                <p className="bg-[#FFC107] py-[2px] px-1 text-white rounded-md">
                  999+
                </p>
                <span>đánh giá trên Baemin</span>
              </div>
              <div className="flex flex-row gap-4 justify-start items-center my-1 text-[15px]">
                <div className="flex flex-row gap-1 items-center">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      shopDetail?.is_open ? "bg-[#6CC942]" : "bg-[#FF0000]"
                    }`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      shopDetail?.is_open ? "text-[#6CC942]" : "text-[#FF0000]"
                    }`}
                  >
                    {shopDetail?.is_open ? "Mở cửa" : "Đóng cửa"}
                  </span>
                </div>
                <div className="flex flex-row gap-1 justify-start items-center">
                  <ClockCircleTwoTone twoToneColor={"#3AC5C9"} />
                  <span>
                    {shopDetail?.open_time
                      ? new Date(shopDetail.open_time).toLocaleTimeString(
                          "en-GB",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                            timeZone: "UTC",
                          }
                        )
                      : "Không xác định"}{" "}
                    -{" "}
                    {shopDetail?.close_time
                      ? new Date(shopDetail.close_time).toLocaleTimeString(
                          "en-GB",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                            timeZone: "UTC",
                          }
                        )
                      : "Không xác định"}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-1 justify-start items-center text-[#959595] text-[15px]">
                <DollarTwoTone
                  twoToneColor={"#c0c0c0"}
                  className="text-[16px]"
                />
                <span>
                  ${shopDetail?.price_start} - ${shopDetail?.price_end}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col absolute bottom-0 left-0 px-8 mb-4 text-[#959595] text-[13px]">
              <div className="border-t-[1px]"></div>
              <div className="flex flex-row gap-4 justify-start items-center py-[10px]">
                <div className="flex flex-col ">
                  <span>PHÍ DỊCH VỤ</span>
                  <span className="text-beamin font-bold text-[14px]">
                    0.8% Phí dịch vụ
                  </span>
                </div>
                <div className="border-l border-solid h-6"></div>
                <div className="flex flex-col">
                  <span>DỊCH VỤ BỞI</span>
                  <span className="text-beamin font-bold text-[14px]">
                    Baemin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="py-[13px] px-[26px] font-bold text-beamin text-[14px]">
          THỰC ĐƠN
        </div>
        <div className="w-full flex flex-row gap-3">
          {/* Filter Sidebar */}
          <div className="w-[20%] bg-white p-5">
            <ul>
              {["Combo", "Sale", "Rice Chicken", "Bubble Tea", "None"].map(
                (type) => (
                  <li
                    key={type}
                    className={`cursor-pointer w-[100%] px-1 my-4 duration-150 py-2 flex items-center ${
                      selectedType === type.toLowerCase()
                        ? "bg-blue-500 text-white duration-150 py-2 flex items-center"
                        : ""
                    }`}
                    onClick={() => handleTypeClick(type.toLowerCase())}
                  >
                    {type}
                  </li>
                )
              )}
              <li
                className={`cursor-pointer px-1 my-4 w-[100%] py-2 flex items-center duration-150 ${
                  selectedType === null ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setSelectedType(null)}
              >
                Tất cả
              </li>
            </ul>
          </div>

          {/* Food List */}
          <div className="w-[100%] h-auto bg-white py-3 flex flex-col px-4">
            {/* Search Input */}
            <div className="w-full mb-5">
              <Input
                addonBefore={<SearchOutlined />}
                placeholder="Tìm món ăn..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {/* Food Items */}
            <div className="flex flex-col w-full pl-1 gap-3">
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <FoodDetailSkeleton key={index} />
                  ))
                : filteredFood?.map((food) => (
                    <div
                      key={food.food_id}
                      className="flex flex-col w-full gap-4 border-b pb-3"
                    >
                      <div className="flex flex-row">
                        <div className="w-[15%] relative h-16">
                          {/* Hiển thị ảnh nếu có, thay thế nếu không có */}
                          <Image
                            fill
                            style={{ objectFit: "cover" }}
                            src={
                              food?.food_thumbnail || "/images/placeholder.png"
                            }
                            alt={food.food_name}
                          />
                        </div>
                        <div className="w-[60%] flex flex-col gap-1 px-2">
                          <span className="font-bold text-[#464646]">
                            {food.food_name}
                          </span>
                          <span className="text-wrap text-sm text-[#464646]">
                            {food.description}
                          </span>
                        </div>
                        <div className="w-[15%] flex justify-center items-center">
                          <span className="text-[#0288d1] font-bold text-base">
                            ${food.price.toLocaleString()}
                          </span>
                        </div>
                        <div
                          className="w-[10%] flex justify-center items-center"
                          onClick={() => addCart(food.food_id, quantity)}
                        >
                          <div className="h-8 w-8 rounded-md flex justify-center items-center bg-beamin text-white font-bold cursor-pointer hover:brightness-110">
                            <ShoppingCartOutlined className="text-xl" />
                          </div>
                        </div>

                        <div className="w-[10%] flex justify-center items-center">
                          <InputNumber
                            size="large"
                            min={1}
                            max={99}
                            defaultValue={1}
                            onChange={onChange}
                          />
                        </div>

                        <div
                          className="w-[30%] flex justify-center items-center"
                          onClick={() => buyNow(food, quantity)}
                        >
                          <div className="h-10 px-5 rounded-md flex justify-center items-center bg-beamin text-white font-bold cursor-pointer hover:brightness-110">
                            Buy Now
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
