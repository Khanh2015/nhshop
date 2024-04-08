const Shop = () => {
  return (
    <section className="shop mt-10 mx-[90px]">
      <h1 className="text-[40px] font-medium">Shop</h1>
      <div className="mt-5 border-t-[1px] border-t-black pt-10 grid grid-cols-2 gap-6">
        <div className="">
          <a href="#" className="">
            <img src="https://picsum.photos/300" alt="" className="w-full" />
          </a>
        </div>

        <div className="">
          <a href="#" className="">
            <img src="https://picsum.photos/300" alt="" className="w-full" />
          </a>
        </div>

        <div className="">
          <a href="#" className="">
            <img src="https://picsum.photos/300" alt="" className="w-full" />
          </a>
        </div>

        <div className="">
          <a href="#" className="">
            <img src="https://picsum.photos/300" alt="" className="w-full" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Shop;
