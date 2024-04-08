const Services = () => {
  return (
    <section className="service bg-[#FAF3EA] mt-28 py-20 px-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="./src/assets/icons/service-1.png"
          alt=""
          className="w-[60px]"
        />
        <div className="">
          <h2 className="text-[25px] font-semibold">High Quality</h2>
          <p className="text-xl font-medium text-[#898989]">
            crafted from top materials
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img
          src="./src/assets/icons/service-2.png"
          alt=""
          className="w-[60px]"
        />
        <div className="">
          <h2 className="text-[25px] font-semibold">Warranty Protection</h2>
          <p className="text-xl font-medium text-[#898989]">Over 2 years</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img
          src="./src/assets/icons/service-3.png"
          alt=""
          className="w-[60px]"
        />
        <div className="">
          <h2 className="text-[25px] font-semibold">Free Shipping</h2>
          <p className="text-xl font-medium text-[#898989]">Order over 150 $</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img
          src="./src/assets/icons/service-4.png"
          alt=""
          className="w-[60px]"
        />
        <div className="">
          <h2 className="text-[25px] font-semibold">24 / 7 Support</h2>
          <p className="text-xl font-medium text-[#898989]">
            Dedicated support
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
