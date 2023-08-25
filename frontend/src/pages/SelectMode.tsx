export const SelectMode = () => {
  return (
    <div className="flex min-h-screen">
      <div className="shadow-2xl pointer-events-none absolute text-xl flex-col font-medium bottom-0 left-0 right-0 top-0 mx-auto my-auto flex h-36 w-36 rounded-full  items-center justify-center bg-white bg-opacity-90">
        <p className="">Select</p>
        <p className="">Mode</p>
      </div>

      <div className="flex flex-1 text-center flex-col items-center justify-center bg-secondary text-4xl font-bold transition-all hover:cursor-pointer hover:bg-sky-400 hover:text-6xl">
        Admin Mode
      </div>
      <div className=" flex flex-1 text-center flex-col items-center justify-center bg-sky-600 text-4xl font-bold transition-all hover:cursor-pointer hover:bg-sky-400 hover:text-6xl">
        Play Mode
      </div>
    </div>
  );
};
