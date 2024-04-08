import Logo from "/logo.png";

const AdminHeader = () => {
  return (
    <div className="bg-slate-200 flex justify-between items-center py-3 px-10">
      <h1 className="text-2xl font-bold">Welcometo admin website</h1>
      <img className="w-[80px]" src={Logo} alt="" />
    </div>
  );
};

export default AdminHeader;
