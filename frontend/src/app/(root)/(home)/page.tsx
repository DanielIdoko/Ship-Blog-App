"use client";

import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full h-full mt-[64px]">
       <div className="breadcrumbs">
        <Link href="/">Home</Link>
      </div>
      <h1 className="text-xl mt-10 text-white">Home</h1>
    </div>
  );
};

export default Home;
