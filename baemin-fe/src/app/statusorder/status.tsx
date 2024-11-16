"use client";
import { useEffect, useState } from "react";

export default function Status({ items }: { items: any[] }) {
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState(items);
  useEffect(() => {
    setStatus(items);
  }, [status]);
  const HanlderClick = (id: any) => {
    const newStatus = status.map((item) => {
      if (
        item.id === id &&
        (item.number == current + 1 || item.number == current)
      ) {
        item.st = !item.st;
        setCurrent(item.number);
      }

      return item;
    });
    setStatus(newStatus);
  };

  return (
    <>
      <div className="mt-2 flex flex-col gap-3 relative">
        {status.map((item: any, index: any) => (
          <div key={item.id || index}>
            <div
              onClick={() => HanlderClick(item.id)}
              className="flex flex-row gap-3 items-center cursor-pointer"
            >
              <div
                className={`${
                  item.st ? "border-beamin" : ""
                }  w-10 h-10 rounded-full border border-solid flex justify-center items-center`}
              >
                <span
                  className={`  ${
                    item.st ? "text-beamin" : "text-gray-600"
                  }     `}
                >
                  {item.number}
                </span>
              </div>
              <div
                className={` text-wrap text-[14px] ${
                  item.st ? "text-beamin" : "text-gray-600"
                }     `}
              >
                {item.name}
              </div>
            </div>
            {status.length - 1 != index && (
              <div className="relative flex flex-col left-4 bottom-5 text-xl font-bold gap-1 ">
                <span
                  className={` h-2  ${
                    item.st ? "text-beamin" : "text-gray-600"
                  }     `}
                >
                  .
                </span>
                <span
                  className={` h-2 ${
                    item.st ? "text-beamin" : "text-gray-600"
                  }     `}
                >
                  .
                </span>
                <span
                  className={` h-2 ${
                    item.st ? "text-beamin" : "text-gray-600"
                  }     `}
                >
                  .
                </span>
                <span
                  className={` h-2 ${
                    item.st ? "text-beamin" : "text-gray-600"
                  }     `}
                >
                  .
                </span>
                <span
                  className={` h-2 ${
                    item.st ? "text-beamin" : "text-gray-600"
                  }     `}
                >
                  .
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
