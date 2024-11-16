'use client';

import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const AreaSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className=' flex flex-col cursor-pointer justify-center items-center mb-1' onClick={toggleDropdown}>
        <span
          className=" px-1 rounded uppercase"
        >
          Khu vực
        </span>
        <div className='text-[10px] '>
          <DownOutlined />
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-96 bg-white shadow-lg rounded p-4 z-10">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block">
                <input type="checkbox" /> Quận 1
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 3
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 6
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 9
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 12
              </label>
              <label className="block">
                <input type="checkbox" /> Phú Nhuận
              </label>
            </div>
            <div>
              <label className="block">
                <input type="checkbox" /> Gò Vấp
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 4
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 7
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 10
              </label>
              <label className="block">
                <input type="checkbox" /> Bình Thạnh
              </label>
              <label className="block">
                <input type="checkbox" /> Bình Tân
              </label>
            </div>
            <div>
              <label className="block">
                <input type="checkbox" /> Quận 2
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 5
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 8
              </label>
              <label className="block">
                <input type="checkbox" /> Quận 11
              </label>
              <label className="block">
                <input type="checkbox" /> Tân Bình
              </label>
              <label className="block">
                <input type="checkbox" /> Tân Phú
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaSelector;
