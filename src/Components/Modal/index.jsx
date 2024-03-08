import React from "react";
import { ImCross } from "react-icons/im";

function Modal({ open, onClose, children, text }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-11/12 sm:w-5/12 xs:w-8/12 rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <h1 className="absolute top-2 left-2 p-1 text-gray-800 bg-white">{text}</h1>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <ImCross />
        </button>
        {children}
      </div>
    </div>
  );
};

export default React.memo(Modal);
