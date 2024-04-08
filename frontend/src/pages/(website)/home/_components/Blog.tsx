const Blog = () => {
  return (
    <section className="blog mt-10 mx-[90px]">
      <h1 className="text-[40px] font-medium">Blog</h1>
      <div className="mt-5 border-t-[1px] border-t-black pt-10 flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-6">
          <a href="" className="">
            <img
              src="https://picsum.photos/800/300"
              alt=""
              className="w-full"
            />
          </a>

          <div className="flex flex-col justify-end border-b-black border-b-[1px] pb-2">
            <h2 className="font-semibold text-xl">
              A BEDROOM MUST HAVE SOME THING LIKE THIS
            </h2>
            <p className="text-[#898989] mt-7">
              Your level of comfort when geting into and out of bed can be
              greatly influenced by the bed frame you choose. It may
              significantly affect how want your bedroom to feet and look
            </p>
            <div className="flex items-center justify-end gap-5 duration-200 hover:opacity-70 mt-14">
              ABOUT
              <img src="./src/assets/icons/arrow.png" alt="" className="" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <a href="" className="">
            <img
              src="https://picsum.photos/800/300"
              alt=""
              className="w-full"
            />
          </a>

          <div className="flex flex-col justify-end border-b-black border-b-[1px] pb-2">
            <h2 className="font-semibold text-xl">
              A BEDROOM MUST HAVE SOME THING LIKE THIS
            </h2>
            <p className="text-[#898989] mt-7">
              Your level of comfort when geting into and out of bed can be
              greatly influenced by the bed frame you choose. It may
              significantly affect how want your bedroom to feet and look
            </p>
            <div className="flex items-center justify-end gap-5 duration-200 hover:opacity-70 mt-14">
              ABOUT
              <img src="./src/assets/icons/arrow.png" alt="" className="" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <a href="" className="">
            <img
              src="https://picsum.photos/800/300"
              alt=""
              className="w-full"
            />
          </a>

          <div className="flex flex-col justify-end border-b-black border-b-[1px] pb-2">
            <h2 className="font-semibold text-xl">
              A BEDROOM MUST HAVE SOME THING LIKE THIS
            </h2>
            <p className="text-[#898989] mt-7">
              Your level of comfort when geting into and out of bed can be
              greatly influenced by the bed frame you choose. It may
              significantly affect how want your bedroom to feet and look
            </p>
            <div className="flex items-center justify-end gap-5 duration-200 hover:opacity-70 mt-14">
              ABOUT
              <img src="./src/assets/icons/arrow.png" alt="" className="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
