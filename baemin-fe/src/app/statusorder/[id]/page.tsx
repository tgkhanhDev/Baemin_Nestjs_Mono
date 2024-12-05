"use client";
import { ShoppingCartOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import Status from "./status";
import DetailsOrder from "./detailOrder";
import { useAppDispatch } from "@/src/store";
import { useTransaction } from "@/src/hooks/useTransaction";
import { usePayment } from "@/src/hooks/usePayment";
import { useParams } from "next/navigation";
import { getTransaction } from "@/src/store/transactionManager/thunk";
import { payForPaymentThunk } from "@/src/store/paymentManager/thunk";
import { Skeleton, Spin } from "antd";

const Page: React.FC = () => {
  // const status = [
  //     {
  //         id: '1',
  //         number: 1,
  //         name: 'Nhà hàng đã nhận đơn',
  //         st: false
  //     },
  //     {
  //         id: '2',
  //         number: 2,
  //         name: 'Shipper đã nhận đơn',
  //         st: false
  //     },
  //     {
  //         id: '3',
  //         number: 3,
  //         name: 'Shipper đang đến nhà hàng',
  //         st: false
  //     },
  //     {
  //         id: '4',
  //         number: 4,
  //         name: 'Shipper đã đến nhà hàng',
  //         st: false
  //     },

  //     {
  //         id: '5',
  //         number: 5,
  //         name: 'Shipper đang giao hàng',
  //         st: false
  //     },
  //     {
  //         id: '6',
  //         number: 6,
  //         name: 'Đơn hàng hoàn tất',
  //         st: false
  //     },
  // ]

  const dispatch = useAppDispatch();
  const { transaction, loading } = useTransaction();
  const { loadingPay } = usePayment();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : params?.id[0];
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getTransaction(id));
    }
  }, [dispatch, id]);

  const handlePaid = (payment_id: string) => {
    dispatch(payForPaymentThunk(payment_id))
      .unwrap()
      .then(() => {
        setStatus(true);
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
          <div className="text-3xl  text-beamin font-bold">
            Trình trạng đơn hàng
          </div>
        </div>
        <div className="w-1/2 h-full flex   items-center gap-3"></div>
      </div>
      <div className="w-full mt-2 border-t">
        <DetailsOrder items={transaction} loading={loading} />
      </div>
      <div className="grid grid-cols-12 ">
        {/* <div className='col-span-3  pt-3 pb-3 pl-16'>
                    <div className='w-full h-full bg-white rounded-md flex flex-col pl-4 pt-2 pb-4'>
                        <div className='font-semibold'> Trình Trạng </div>
                        <Status items={status} />
                    </div>
                </div> */}
        <div className="col-span-12 pt-3 px-6 flex flex-col gap-6 pb-6 h-full">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Lời nhắn</p>
                <p className="text-lg font-semibold text-gray-800">
                  {loading ? (
                    <Skeleton.Input active className="mt-2" />
                  ) : !transaction ||
                    transaction[0]?.payment?.message === "" ? (
                    "Không có"
                  ) : (
                    transaction[0]?.payment?.message
                  )}
                </p>
              </div>
              {loadingPay ? (
                <button className="p-2 bg-beamin text-white w-36 rounded-md h-10 hover:brightness-105">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ color: "#fff" }} spin />
                    }
                    size="default"
                  />
                </button>
              ) : (
                <button
                  onClick={() =>
                    handlePaid(transaction[0]?.payment?.payment_id || "")
                  }
                  className={`p-2 w-36 rounded-md h-10 
                    ${
                      transaction[0]?.payment?.status === "Paid" || status
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-beamin text-white hover:brightness-105"
                    }
                  `}
                  disabled={transaction[0]?.payment?.status === "Paid"}
                >
                  {transaction[0]?.payment?.status === "Paid" || status
                    ? "Đã xác nhận"
                    : "Xác nhận"}
                </button>
              )}
            </div>

            <div className="flex justify-between items-start space-x-4">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Giao hàng đến</p>
                <p className="text-lg font-semibold text-gray-800">
                  {loading ? (
                    <Skeleton.Input active className="mt-2" />
                  ) : (
                    transaction[0]?.payment?.delivery_address ||
                    "Không có địa chỉ"
                  )}
                </p>
              </div>

              <div className="text-right flex flex-col items-end space-y-2">
                <p className="text-sm text-gray-500">
                  {loading ? (
                    <Skeleton.Input active />
                  ) : (
                    `$Tổng cộng (${transaction?.length || 0} món):`
                  )}
                </p>
                <p className="text-xl font-bold text-beamin">
                  {loading ? (
                    <Skeleton.Input active className="mt-2" />
                  ) : (
                    `$${transaction[0]?.payment?.total_cost || 0}`
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
