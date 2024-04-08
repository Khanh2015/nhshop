const Footer = () => {
  return (
    <footer className="px-[90px] py-10  border-t-slate-300 border-t-[1px] ">
      <div className="grid grid-cols-[35%_15%_18%_32%] mb-10">
        <div className="">
          <a href="#" className="text-2xl font-bold">
            Funiro.
          </a>
          <p className="text-[#9F9F9F] mt-14">
            400 University Drive Suite 200 Coral <br /> Gables, <br /> FL 33134
            USA
          </p>
        </div>

        <div className="">
          <p className="text-[#9F9F9F] font-medium">Links</p>
          <ul className="mt-14 flex flex-col gap-10">
            <li className="">
              <a href="#" className="font-medium">
                Home
              </a>
            </li>

            <li className="">
              <a href="#" className="font-medium">
                Shop
              </a>
            </li>

            <li className="">
              <a href="#" className="font-medium">
                About
              </a>
            </li>

            <li className="">
              <a href="#" className="font-medium">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="">
          <p className="text-[#9F9F9F] font-medium">Help</p>
          <ul className="mt-14 flex flex-col gap-10">
            <li className="">
              <a href="#" className="font-medium">
                Payment Options
              </a>
            </li>

            <li className="">
              <a href="#" className="font-medium">
                Returns
              </a>
            </li>

            <li className="">
              <a href="#" className="font-medium">
                Privacy Policies
              </a>
            </li>
          </ul>
        </div>

        <div className="">
          <p className="text-[#9F9F9F] font-medium">Newsletter</p>
          <form action="" className="mt-14">
            <input
              type="text"
              className="border-b-[1px] border-b-black outline-none"
              placeholder="Enter Your Email Address"
            />
            <button className="border-b-[1px] border-b-black font-medium ml-4">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      <hr />

      <p className="mt-10">2023 furino. All rights reverved</p>
    </footer>
  );
};

export default Footer;
