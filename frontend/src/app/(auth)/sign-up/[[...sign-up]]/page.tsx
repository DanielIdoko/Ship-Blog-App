"use client";
import { SignUp } from "@clerk/nextjs";
import { AiOutlineClose } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <main className="w-full h-screen">
      <div className="w-fit h-fit p-2 absolute top-3 right-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href="/"><AiOutlineClose className="text-xl cursor-pointer" /></Link>
            </TooltipTrigger>
            <TooltipContent className="mr-9 bg-accent dark:text-base">
              <p>Continue without Registering</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
      <p className="text-small text-accent text-center">By continuing with Bolga you agree to our terms of service and privacy policy</p>
    </main>
  );
};

export default SignUpPage;
