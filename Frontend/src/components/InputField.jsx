import React from "react";
import clsx from "clsx";

const InputField = ({
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  error,
  defaultValue,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx(
          "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default InputField;
