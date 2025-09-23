import { SignUp } from "@clerk/nextjs";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SignUpPage = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="bg-amber-50">
        {/* <AiOutlineClose /> */}
      </div>
      <SignUp path="/sign-up" routing="path" />
    </main>
  );
};

export default SignUpPage;
