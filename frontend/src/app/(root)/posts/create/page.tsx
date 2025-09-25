"use client";
import CreatePost from "@/components/posts/createpost";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import LoadingSkeleton from "./loading";
import { useGoBack } from "@/lib/useGoBack";
import { useGoForwardClick } from "@/lib/useGoForwardClick";

const Create = () => {
  const handleBackClick = useGoBack();
  const handleForwardClick = useGoForwardClick();

  return (
    <div className="mt-[64px] bg-acent">
      <div className="w-full h-fit flex items-center justify-start gap-3 p-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="bg-gray/10 p-2 rounded-x-small cursor-pointer border-1 border-gray/10 text-md transition duration-300 ease-in flex items-center justify-center hover:bg-gray/20">
              <span onClick={handleBackClick}>
                <AiOutlineArrowLeft />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-accent dark:text-base">
              <p>Go back</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="breadcrumbs">
          <Link href="/" className="text-gray/30 text-small dark:text-white/20">
            Home /
          </Link>{" "}
          <Link href="/posts" className="text-gray/30 text-small dark:text-white/20">
            Posts /
          </Link>{" "}
          <Link href="/posts/create" className="text-accent text-small dark:text-white hover:underline">
            Create
          </Link>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="bg-gray/10 p-2 rounded-x-small cursor-pointer border-1 border-gray/10 text-md transition duration-300 ease-in flex items-center justify-center hover:bg-gray/20">
              <span onClick={handleForwardClick}>
                <AiOutlineArrowRight />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-accent dark:text-base">
              <p>Go Foward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <h2 className="sub-heading">Write something creative</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <CreatePost />
      </Suspense>
    </div>
  );
};

export default Create;
