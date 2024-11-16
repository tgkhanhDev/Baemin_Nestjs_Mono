'use client'
import { ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React from 'react';
import Status from './status';
import DetailsCheckout from '../checkout/detailsCheckout';

const Page: React.FC = () => {
    const status = [
        {
            id: '1',
            number: 1,
            name: 'Nhà hàng đã nhận đơn',
            st: false          
        },
        {
            id: '2',
            number: 2,
            name: 'Shipper đã nhận đơn',
            st: false
        },
        {
            id: '3',
            number: 3,
            name: 'Shipper đang đến nhà hàng',
            st: false
        },
        {
            id: '4',
            number: 4,
            name: 'Shipper đã đến nhà hàng',
            st: false
        },
       
        {
            id: '5',
            number: 5,
            name: 'Shipper đang giao hàng',
            st: false
        },
        {
            id: '6',
            number: 6,
            name: 'Đơn hàng hoàn tất',
            st: false
        },
    ]
    const detail: any = [
        {
            name:'Ga ran',
            description:'Chiên bột',
            price:17000,
            quantity:2,
            totalprice:17000,
            img:'/food/ga1.jpg'
        },
        {
            name:'Ga ran',
            description:'Chiên bột',
            price:17000,
            quantity:2,
            totalprice:17000,
            img:'/food/ga1.jpg'
        }
    ]
    return (
        <>
            <div className="flex flex-row w-full h-20 bg-white ">
                <div className="w-1/2 h-full flex flex-row  items-center gap-3">
                    <div className="ml-10 text-4xl  text-beamin font-bold" >
                        <ShoppingCartOutlined />
                    </div>
                    <div className="text-2xl  text-beamin ">
                        |
                    </div>
                    <div className="text-3xl  text-beamin font-bold">
                        Trình trạng đơn hàng
                    </div>
                </div>
                <div className="w-1/2 h-full flex   items-center gap-3">


                </div>
            </div>
            <div className='grid grid-cols-12 '>
                <div className='col-span-3  pt-3 pb-3 pl-16'>
                    <div className='w-full h-full bg-white rounded-md flex flex-col pl-4 pt-2 pb-4'>
                        <div className='font-semibold'> Trình Trạng </div>
                        <Status items={status} />
                    </div>
                </div>
                <div className='col-span-9 pt-3 pl-6 pr-10 flex flex-col gap-2 pb-3 h-full'>
                    <div className='w-full h-[70%] rounded-md'>
                        <div className='w-full h-full relative'>
                            <Image fill style={{objectFit:"cover"}} src={'/images/baemin-1.jpg'} alt=''></Image>
                        </div>

                    </div>
                    <div className='w-full  bg-white rounded-md p-4 flex flex-col'>
                        <div className='w-full flex flex-row'>
                            <div className='w-1/3 flex flex-col gap-2'>
                                <div>
                                    Đồ ăn | Gà rán Popeys - Nguyễn Thị Thập
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    143.000đ - 1 món - Ví MoMo
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    Thiện Trần - 0901234567
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col gap-2'>
                                <div>
                                    Giao hàng đến
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    169 Nguyễn Thị Thập, Phường Bình Thuận, Quận 7
                                </div>
                                <div className='text-gray-600 text-sm'>
                                    thời gian hoàn thành: %%:%%
                                </div>
                            </div>
                            <div className='w-1/3 flex flex-col  gap-2 pl-5'>
                                <div className='font-medium flex flex-row justify-between '>
                                    <span> Tổng (1 món):</span>
                                    <span className='text-beamin'>164.000d</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between border-t'>
                                    <span> phí giao hàng (1 km):</span>
                                    <span className='text-beamin'>16.000d</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between '>
                                    <span> phí dịch vụ:</span>
                                    <span className='text-beamin'>16.000d</span>
                                </div>
                                <div className='text-sm flex flex-row justify-between '>
                                    <span> Giảm giá:</span>
                                    <span className='text-beamin'>16.000d</span>
                                </div>
                                <div className='text-beamin w-full flex flex-row items-end justify-end text-xl font-medium pr-3 pt-3'>
                                    <span>164.000d</span>
                                </div>
                            </div>
                        </div>
                        {/* <div className='w-full mt-2 border-t'>
                            <DetailsCheckout items={detail}  />
                        </div> */}
                    </div>
                </div>
            </div>
        </>


    );
};

export default Page;