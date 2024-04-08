import React from "react";
import "./modal.css";

export default function BaseModal({
  customParentClass = "",
  children,
  onClose,
  style = {},
}) {
  return (
    <div
      className={`base-modal ${customParentClass}`}
      onClick={(e) => {
        onClose();
      }}
      style={style}
    >
      {children}
    </div>
  );
}
