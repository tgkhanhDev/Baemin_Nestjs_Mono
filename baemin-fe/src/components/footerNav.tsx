import Image from "next/image";

export default function FooterNav() {
    return (
        <div className="z-50 w-full mt-4  bg-white flex flex-row justify-items-center" style={{ gap: "10rem" }}>
            <div className="flex flex-col items-start" style={{ marginLeft: "180px" }} >
                <div className="title" style={{ fontWeight: "bold", fontSize: "25px" }}>
                    <span>Công ty</span>
                </div>
                <div className="content flex flex-col items-start mt-5 text-blue-500">
                    <span>Giới thiệu</span>
                    <span>Trung tâm trợ giúp</span>
                    <span>Quy chế</span>
                    <span>Điều khoản sử dụng</span>
                    <span>Bảo mật thông tin</span>
                    <span>Giải quyết khiếu nại</span>
                    <span>Liên hệ</span>
                    <span>Hợp tác nhân viên giao nhận</span>
                    <span>Đăng kí quán</span>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="title" style={{ fontWeight: "bold", fontSize: "25px" }}>
                    <span>Ứng dụng Baemin</span>
                </div>
                {/* <div className="content flex flex-col items-start mt-5">
                    <span>
                        <Image
                            src="../images/appstore.png"
                            alt="appstore"
                            width={150}
                            height={200}
                        />
                    </span>
                    <span className="mt-2">
                        <Image
                            src="../images/ggplay.png"
                            alt="ggplay"
                            width={150}
                            height={200}
                        />
                    </span>


                </div> */}
            </div>
            <div className="flex flex-col items-center" >
                <div className="title" style={{ fontWeight: "bold", fontSize: "25px" }}>
                    <span></span>
                </div>
                <div className="content flex flex-col items-center mt-10">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="131" height="27" viewBox="0 0 131 27">
                            <g fill="#3AC5C9" fillRule="evenodd">
                                <path d="M45 0v27h18v-5.21H50.054v-5.685h8.837v-5.21h-8.837V5.21H63V0zM90 0v5.21h6.948v16.58H90V27h19v-5.21h-6.95V5.21H109V0zM11.86 11.132H5.046V5.21h6.64c1.895 0 2.824 1.162 2.824 2.961 0 1.8-.752 2.96-2.648 2.96m-.177 10.659H5.045V15.869h6.816c1.896 0 2.648 1.161 2.648 2.96 0 1.8-.929 2.96-2.825 2.96M19 8.645v-.947C19 3.434 15.77 0 11.76 0H0v27H11.76C15.769 27 19 23.566 19 19.303v-.947A6.287 6.287 0 0 0 16.74 13.5 6.285 6.285 0 0 0 19 8.644M119.319 0l6.25 16.536c.078.206.375.148.375-.072V0H131v27h-6.32l-6.247-16.526c-.079-.208-.379-.15-.379.073V27H113V0h6.319zM80.506 10.465l-1.702 6.255c-.647 2.379-3.96 2.378-4.606 0l-1.706-6.272c-.059-.216-.372-.173-.372.052V27H67V0h6.282l3.033 11.008c.053.192.32.192.372 0L79.72 0H86v27h-5.118V10.517c0-.228-.317-.271-.376-.052M28.572 16.715l2.742-11.59c.048-.2.326-.2.373 0l2.742 11.59h-5.857zm8.064-12.546a5.257 5.257 0 0 0-1.864-3C33.808.39 32.718 0 31.502 0c-1.244 0-2.342.39-3.293 1.169-.95.779-1.565 1.779-1.844 3L21 27h5.136l1.218-5.143h8.293L36.865 27H42L36.636 4.17z" />
                            </g>
                        </svg>
                    </span>
                    <span className="mt-3" style={{ filter: 'blur(0.4px)' }}>Baemin 2024</span>
                </div>
            </div>
            <div className="flex flex-col items-end" >
                <div className="title" style={{ fontWeight: "bold", fontSize: "25px" }}>
                    <span>Địa chỉ công ty</span>
                </div>
                <div className="content flex flex-col items-end  mt-5">
                    <span>Công ty cổ phần</span>
                    <span>Địa chỉ </span>
                    <span>Chịu trách nhiệm quản lý nội dung : Someone</span>
                    <span>Điện thoại liên hệ : 0123456778</span>
                    <span>Email : baemin@gmail.com</span>
                </div>
            </div>
        </div>
    );
}