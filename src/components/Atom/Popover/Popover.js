import React from "react";
import { createPortal } from "react-dom";

const PopoverContent = ({ isOpen, content, children }) => {
  return (
    <div>
      {children}
      {isOpen && createPortal(content, document.body)}
    </div>
  );
};

export default PopoverContent;
