"use client";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pagination, setPagination] = useState({
    itemsSize: 10,
    skipItems: 0,
    page: 1,
  });
  const [data, setData] = useState<any>({});
  const getTableData = async (pagination: any) => {
    const { itemsSize, skipItems } = pagination;
    const urlAPI = `https://dummyjson.com/products`;
    let responce = await fetch(
      `${urlAPI}?limit=${itemsSize}&skip=${skipItems}`
    );
    responce = await responce.json();
    setData(responce);
  };
  useEffect(() => {
    getTableData(pagination);
  }, [pagination]);
  const handleNext = () => {
    if (data.total > pagination.skipItems + pagination.itemsSize) {
      setPagination((prev) => {
        const skipItems = prev.skipItems + prev.itemsSize;
        const page = prev.page + 1;
        return { ...prev, skipItems, page };
      });
    }
  };
  const handlePrevious = () => {
    if (pagination.skipItems > 1) {
      setPagination((prev) => {
        const skipItems = prev.skipItems - prev.itemsSize;
        const page = prev.page - 1;
        return { ...prev, skipItems, page };
      });
    }
  };
  const handlePage = (page: number) => {
    if (page > 0 && page !== pagination.page) {
      setPagination((prev) => {
        const skipItems = prev.itemsSize * page - prev.itemsSize;
        return { ...prev, skipItems, page };
      });
    }
  };
  const handlePageSize = (e: any) => {
    const itemsSize = e.target.value;
    setPagination((prev) => {
      return { ...prev, itemsSize, skipItems: 0, page: 1 };
    });
  };
  const lenght = Math.ceil(data.total / pagination.itemsSize);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="select-wrapper">
        Change Page Size
        <select
          name="pageSize"
          id="pageSize"
          onChange={handlePageSize}
          value={pagination.itemsSize}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="table-wrapper">
        <table>
          <thead className="thead">
            <tr>
              <th>Thumbnail</th>
              <th>Brand</th>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map((table: any, id: any) => {
              const { brand, title, price, rating, stock, thumbnail } = table;
              return (
                <tr key={id}>
                  <td className="image">
                    <Image src={thumbnail} alt={title} width={50} height={50} />
                  </td>
                  <td>{brand}</td>
                  <td>{title}</td>
                  <td>
                    {"💶"}
                    {price}
                  </td>
                  <td>
                    {"🛒"}
                    {stock}
                  </td>
                  <td>
                    {Array.from({ length: rating }).map(() => "⭐️")}
                    {rating}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="btn-grp">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={pagination.page === 1}
          className={pagination.page === 1 ? `btn-diable` : ""}
        >
          Previous
        </button>
        {Array.from({ length: lenght }).map((_, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={() => handlePage(index + 1)}
              className={pagination.page === index + 1 ? `active` : ""}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          type="button"
          onClick={handleNext}
          disabled={pagination.page === lenght}
          className={pagination.page === lenght ? `btn-diable` : ""}
        >
          Next
        </button>
      </div>
    </main>
  );
}
