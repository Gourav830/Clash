import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div>
        <Image src="/banner.svg" width={600} height={600} alt="banner image" />
      </div>

      <div className="text-center mt-4">
        <h1 className=" text-6xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-pink-400 to bg-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
      </div>
      <p className="font-bold text2xl md:text-3xl lg:text-4xl text-center">
        Discover the better choice together
      </p>
      <Link href="/login">
        <Button className="mt-2"> Start Free</Button>
      </Link>
    </div>
  );
};

export default HeroSection;
