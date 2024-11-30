"use client";
import { useAppDispatch } from "@/src/store";
import { getUserInfoThunk, updateInfoThunk } from "@/src/store/authenManager/thunk";
import { UserInfo } from "@/src/types/auth";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState, useEffect } from "react";

const Page: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAllowEdit, setIsAllowEdit] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [editableUserInfo, setEditableUserInfo] = useState<{
    user_id: string;
    phone_number: string;
    first_name: string;
    last_name: string;
  } | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = user && (await dispatch(getUserInfoThunk(user)).unwrap());
      const userInfoData = { ...res, user_id: user };
      const updateData = {
        user_id: user,
        phone_number: userInfoData?.phone_number || "",
        first_name: userInfoData?.first_name || "",
        last_name: userInfoData?.last_name || "",
      }
      setUserInfo(userInfoData);
      setEditableUserInfo(updateData);
    };

    fetchUserInfo();
  }, [dispatch]);

  const handleAllowEdit = () => {
    setIsAllowEdit(!isAllowEdit);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserInfo) => {
    if (editableUserInfo) {
      setEditableUserInfo({
        ...editableUserInfo,
        [field]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    if (editableUserInfo) {
      await dispatch(updateInfoThunk(editableUserInfo));
    }
    setIsAllowEdit(false);
  };

  return (
    <div
      className={`mt-28 w-1/3 bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8 shadow-md duration-700 ${
        isLoaded ? "opacity-100 translate-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="flex flex-row">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Thông tin cá nhân
        </div>
        <EditOutlined
          style={{ color: "#3ac5c9", fontSize: "24px" }}
          onClick={handleAllowEdit}
        />
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
            <Input
              placeholder="example@gmail.com"
              className="h-[40px]"
              disabled
              value={userInfo?.email || ""}
            />
          </div>
          <div className="flex w-full gap-3">
            <div className="flex flex-col w-1/2 gap-3">
              <label className="text-xs font-bold h-1">First Name:</label>
              <Input
                placeholder="John"
                className="h-[40px]"
                value={editableUserInfo?.first_name || ""}
                disabled={!isAllowEdit} // Chỉ cho phép chỉnh sửa nếu isAllowEdit là true
                onChange={(e) => handleChange(e, "first_name")}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-3">
              <label className="text-xs font-bold h-1">Last Name:</label>
              <Input
                placeholder="Doe"
                className="h-[40px]"
                value={editableUserInfo?.last_name || ""}
                disabled={!isAllowEdit} // Chỉ cho phép chỉnh sửa nếu isAllowEdit là true
                onChange={(e) => handleChange(e, "last_name")}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-3">
            <label className="text-xs font-bold h-1">Phone Number:</label>
            <Input
              placeholder="0125748392"
              className="h-[40px]"
              value={editableUserInfo?.phone_number || ""}
              disabled={!isAllowEdit} // Chỉ cho phép chỉnh sửa nếu isAllowEdit là true
              onChange={(e) => handleChange(e, "phone_number")}
            />
          </div>
          <div className="flex flex-col w-full gap-3">
            <label className="text-xs font-bold h-1">Password:</label>
            <Input
              placeholder="********"
              className="h-[40px]"
              value={"*********"} // Không cho phép thay đổi password trong trường hợp này
              disabled
            />
          </div>
        </div>
      </div>
      {isAllowEdit ? (
        <button
          className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
          onClick={handleSave}
        >
          Lưu thay đổi
        </button>
      ) : (
        <button
          className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
          onClick={handleAllowEdit}
        >
          Chỉnh sửa
        </button>
      )}
    </div>
  );
};

export default Page;
