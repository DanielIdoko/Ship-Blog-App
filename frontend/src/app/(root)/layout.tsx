"use client";
import React, { ReactNode } from "react";
import Navbar from "../../components/ui/navbar";
import Footer from "../../components/ui/footer";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-base">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default HomeLayout;
