import dynamic from "next/dynamic";

const MyMap = dynamic(() => import("./components/MyMap"), { ssr: false });

export default function Home() {
  return (
    <div className="bg-slate-300 w-screen h-screen">
      <MyMap />
    </div>
  );
}
