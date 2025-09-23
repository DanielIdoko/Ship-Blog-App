import { SignIn } from "@clerk/nextjs";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const SignInPage = () => {
  return (
    <main className="w-full h-screen relative">
      <div className="w-fit h-fit p-2 absolute top-3 right-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <AiOutlineClose className="text-xl cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="mr-9 bg-accent">
              <p>Continue without Signing in</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </main>
  );
};

export default SignInPage;
