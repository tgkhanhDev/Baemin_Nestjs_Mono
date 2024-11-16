"use client";
import { useAppDispatch } from "@/src/store";
import { registerThunk } from "@/src/store/authenManager/thunk";
import { RegisterRequest } from "@/src/types/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Page: React.FC = () => {
  const router = useRouter();
  const [register, setRegister] = useState<RegisterRequest>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  })
  const dispatch = useAppDispatch();
  const handleNavigate =  async () => {
    if (register.password !== register.confirm_password) {
      toast.error("Password does not match");
    }
    const req = {
      first_name: register.first_name,
      last_name: register.last_name,
      phone_number: register.phone_number,
      email: register.email,
      password: register.password,
    }

    try {
      const res = await dispatch(registerThunk(req)).unwrap();
      res && router.push("/login");
      toast.success("Register successfully");
    } catch (error:any) {
      toast.error(`Some thing wrong, please try again: ${error.response.data.message[0]}`);
      console.error("Error: ", error.response.data.message);
    }

  };
  return (
    <>
      <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Kí
        </div>
        <div className="flex flex-row w-full gap-2">
          <Input placeholder="Họ " className="h-[40px]" onChange={(e) => setRegister({ ...register, first_name: e.target.value })} />
          <Input placeholder="Tên" className="h-[40px]" onChange={(e) => setRegister({ ...register, last_name: e.target.value })} />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input placeholder="Số điện thoại" className="h-[40px]" onChange={(e) => setRegister({ ...register, phone_number: e.target.value })} />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input placeholder="Email" className="h-[40px]" onChange={(e) => setRegister({ ...register, email: e.target.value })} />
        </div>
        <div className="flex flex-col w-full ">
          <Input.Password
            placeholder="Mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setRegister({ ...register, password: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-full ">
          <Input.Password
            placeholder="Nhập lại mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setRegister({ ...register, confirm_password: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-full">
          <button className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg" onClick={handleNavigate}>
            Đăng Nhập
          </button>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn đã có tài khoản?</span>
          <Link className="text-beamin cursor-pointer" href={"/login"}>
            {" "}
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
};
export default Page;
