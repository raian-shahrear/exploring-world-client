"use client";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type TPaginationProps = {
  data: any;
  dataLimit: number;
  setDataLimit: (value: number) => void;
  pageCount: number;
  setPageCount: (value: number) => void;
};

const Pagination = ({
  data,
  dataLimit,
  setDataLimit,
  pageCount,
  setPageCount,
}: TPaginationProps) => {
  const handlePageLimit = (limitChange: number) => {
    setDataLimit(limitChange);
    setPageCount(1);
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Limit</label>
        <select
          name="limit"
          className="border border-gray-300 w-[75px] h-9 px-1 py-1 text-sm rounded-sm"
          onChange={(e) => handlePageLimit(Number(e.target.value))}
          defaultValue={dataLimit}
        >
          <option value="">Limit</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="24">24</option>
        </select>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          title="Prev"
          className="w-fit h-9 px-2 text-sm font-medium bg-white text-gray-900 border-2 border-gray-900 transition-all duration-300 hover:bg-gray-700 hover:text-white hover:border-gray-700"
          onClick={() => setPageCount(pageCount - 1)}
          disabled={pageCount === 1}
        >
          <span>
            <IoIosArrowBack />
          </span>
        </Button>
        {Array.from({ length: data?.meta?.totalPage }, (_, index) => (
          <Button
            type="button"
            key={index}
            className={`h-9 w-9 px-2 text-sm font-medium ${
              index + 1 !== data?.meta?.page && "bg-gray-400"
            }`}
            onClick={() => setPageCount(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          type="button"
          title="Next"
          className="w-fit h-9 px-2 text-sm font-medium bg-white text-gray-900 border-2 border-gray-900 transition-all duration-300 hover:bg-gray-700 hover:text-white hover:border-gray-700"
          onClick={() => setPageCount(pageCount + 1)}
          disabled={pageCount === data?.meta?.totalPage}
        >
          <span>
            <IoIosArrowForward />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
