export default function Button({ children }: any) {
  return (
    <button className="bg-white p-2 rounded-xl cursor-pointer text-black hover:bg-zinc-300 font-bold">
      {children}
    </button>
  );
}
