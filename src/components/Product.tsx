import React from "react"
import Cart from "./Cart"
import Search from "./Search"

const Product: React.FC = () => {
  return (
    <>
      <div className=" h-[90vh]  rounded-md m-auto shadow-md w-[800px] shadow-slate-400 mt-8">
        <div className="flex flex-col gap-5 px-12 pt-12">
          <div className="text-2xl font-bold tracking-wide">Add Products</div>
          <div>
            <Search />
          </div>
          <div className="h-[600px] overflow-auto">
            <Cart />
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
