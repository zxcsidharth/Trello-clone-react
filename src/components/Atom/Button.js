import React from "react";
import "../../css/buttonStyles.css";

export default function Button({
  variant = "primary",
  children,
  customClass,
  icon = "",
  btnStyle = {},
  iconStyle,
  ...rest
}) {
  return (
    <button
      className={`${variant}-btn ${customClass ? customClass : ""}`}
      style={{ ...btnStyle }}
      {...rest}
    >
      {icon && (
        <i className={icon} style={{ marginRight: "8px", ...iconStyle }}></i>
      )}
      {children}
    </button>
  );
}
