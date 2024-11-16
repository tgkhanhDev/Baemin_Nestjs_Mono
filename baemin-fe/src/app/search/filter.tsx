'use client';

import React, { useState } from 'react';

const FilterSelector = () => {
  const [selected, setSelected] = useState('Đúng nhất');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: React.SetStateAction<string>) => {
    setSelected(option);
    setIsOpen(false);
  };

  const options = ['Đúng nhất', 'Gần tôi', 'Đánh giá', 'Bán chạy', 'Giao nhanh'];

  return (
    <div className="relative flex flex-row items-center justify-center gap-2">
      <span className='text-[#464646] text-[13px]'>200 Kết quả</span>
      <div 
        className="cursor-pointer px-4 py-2 bg-white rounded flex items-center justify-between mb-2"
        onClick={toggleDropdown}
      >
        {selected}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {isOpen && (
        <div className="top-10  absolute mt-2 w-40 bg-white shadow-lg rounded p-2 z-10 ">
          {options.map((option, index) => (
            <div 
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => selectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSelector;
