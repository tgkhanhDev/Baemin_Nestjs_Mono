import HeaderNav from "@/src/components/headerNav";
import ScrollBar from "@/src/components/scrollBar";
import ScrollFood from "@/src/components/scrollFood";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import React from "react";
import DetailsCart from "./detailsCart";
import { Button } from "antd";

export default function Home() {
    const detail:any =[
        {
        name:'Chicken Gang',
        quandoitac:true,
        items:[
            {
                namefood:'Gà rán',
                img:'/images/Ga.png',
                description:'Chiên bột',
                price:280000,
                quantity:2,
                totalprice:280000
            },
            {
                namefood:'Gà rán',
                img:'/images/Ga.png',
                description:'Chiên bột',
                price:280000,
                quantity:2,
                totalprice:280000
            }
        ]
    },
    {
        name:'Chicken Gang',
        quandoitac:true,
        items:[
            {
                namefood:'Gà rán',
                img:'/images/Ga.png',
                description:'Chiên bột',
                price:280000,
                quantity:2,
                totalprice:280000
            },
            {
                namefood:'Gà rán',
                img:'/images/Ga.png',
                description:'Chiên bột',
                price:280000,
                quantity:2,
                totalprice:280000
            }
        ]
    }


]
    return (<>
        <div className="flex flex-row w-full h-20 bg-white ">
            <div className="w-1/2 h-full flex flex-row  items-center gap-3">
                <div className="ml-10 text-4xl  text-beamin font-bold" >
                    <ShoppingCartOutlined />
                </div>
                <div className="text-2xl  text-beamin ">
                    |
                </div>
                <div className="text-3xl  text-beamin font-bold">
                    Giỏ hàng
                </div>
            </div>
            <div className="w-1/2 h-full flex   items-center gap-3">


            </div>
        </div>
        <div className="mt-4 px-16 flex flex-col gap-4  pb-16 rounded-md">
            <div className=" w-full h-16  bg-white  grid grid-cols-12">
                <div className="pl-8  col-span-4 flex items-center flex-row gap-5">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 " />
                    <span className="text-base font-normal" > Món Ăn</span>
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <span className="text-base font-normal  text-gray-600" >Đơn giá</span>
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <span className="text-base font-normal  text-gray-600" >Số lượng</span>
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <span className="text-base font-normal  text-gray-600" >Số tiền</span>
                </div>
                <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <span className="text-base font-normal  text-gray-600" >Thao tác</span>
                </div>
            </div>
           <DetailsCart Details={detail}/>
           <div className=" flex flex-row fixed bottom-0  w-[90.6%]  mr-16  h-16 bg-white items-center  " >
                <div  className="flex flex-row gap-2 w-1/2 h-full items-center ml-10">
                    <div  className="cursor-pointer hover:text-red-600 " >Hủy</div>
                    <div> Quán Đã chọn: </div>
                    <div> The Chicken Gang</div>
                </div>
                <div className="flex flex-row gap-2 w-1/2 h-full items-center justify-end pr-2"> 
                <div className=""> Tổng thanh toán (0 Sản phẩm):
                </div>
                <div className="text-red-600" >₫0 </div>
                <div>
                    <Button href="/checkout" style={{'background':'#3AC5C9',color:'white'}}  className="bg-beamin text-white w-40 h-10 rounded-md hover:brightness-105" >Thanh toán</Button>
                </div>


                </div>

            </div>
        </div>

    </>)
}