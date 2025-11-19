import React from "react";
import clsx from "clsx";

const Button = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className,
  disabled = false,
  ...props
}) => {
  const baseStyle = "rounded-2xl transition duration-200 focus:outline-none"
  const btnStyle = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary:
      "bg-yellow-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 font-bold",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100 disabled:opacity-50",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
  };
  const btnSize = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(btnStyle[variant], btnSize[size],baseStyle,className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
