import React from "react";
import { FaCheck } from 'react-icons/fa'
const Modal = ({ content }) => {
  return (
    <div className="w-3xs h-11 p-2 bg-white shadow-md shadow-gray-300 rounded-sm flex justify-start items-center gap-2">
      <FaCheck />
      <p className="text-small-size text-green-600">{content}</p>
    </div>
  );
};

export default Modal;
