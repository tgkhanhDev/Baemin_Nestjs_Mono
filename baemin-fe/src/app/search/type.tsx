'use client';

import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const TypeSelector = () => {
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
          Phân loại
        </span>
        <div className='text-[10px] '>
          <DownOutlined />
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-96 bg-white shadow-lg rounded p-4 z-10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">
                <input type="checkbox" /> Đồ Ăn
              </label>
              <label className="block">
                <input type="checkbox" /> Bánh Kem
              </label>
              <label className="block">
                <input type="checkbox" /> Vỉa Hè
              </label>
            </div>
            <div>
              <label className="block">
                <input type="checkbox" /> Tráng Miệng
              </label>
              <label className="block">
                <input type="checkbox" /> Pizza
              </label>
              <label className="block">
                <input type="checkbox" /> Sushi
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeSelector;
