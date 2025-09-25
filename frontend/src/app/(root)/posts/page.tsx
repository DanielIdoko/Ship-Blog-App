'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGoBack } from "@/lib/useGoBack";
import { useGoForwardClick } from "@/lib/useGoForwardClick";

import Link from "next/link";
import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Posts = () => {
   const handleBackClick = useGoBack();
   const handleForwardClick = useGoForwardClick();
 
  return (
    <div className="mt-[64px]">
      <div className="w-full h-fit flex items-center justify-start gap-3 p-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={handleBackClick}
              className="bg-gray/10 p-2 rounded-x-small cursor-pointer border-1 border-gray/10 text-md transition duration-300 ease-in flex items-center justify-center hover:bg-gray/20"
            >
              <AiOutlineArrowLeft />
            </TooltipTrigger>
            <TooltipContent className="bg-accent dark:text-base">
              <p>Go back</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="breadcrumbs">
          <Link href="/" className="text-gray/30 text-small dark:text-white/40">Home /</Link><Link href="/posts" className="text-accent text-small dark:text-white">Posts</Link>
        </div>
         <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="bg-gray/10 p-2 rounded-x-small cursor-pointer border-1 border-gray/10 text-md transition duration-300 ease-in flex items-center justify-center hover:bg-gray/20">
              <span onClick={handleForwardClick}>
                <AiOutlineArrowRight />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-accent dark:text-base">
              <p>Go Forward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      Posts
    </div>
  );
};

export default Posts;
