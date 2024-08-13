"use client";
import React from "react";
import { Button as HeadlessButton } from "@headlessui/react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  color?: "blue" | "green" | "red" | "gray";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  color = "blue",
  className,
  ...props
}) => {
  const colorStyles = {
    blue: {
      filled: {
        base: "bg-blue-600 text-white",
        hover: "hover:bg-blue-500",
        active: "active:bg-blue-700",
      },
      outlined: {
        base: "border border-blue-600 text-blue-600",
        hover: "hover:bg-blue-50",
        active: "active:bg-blue-100",
      },
    },
    green: {
      filled: {
        base: "bg-green-600 text-white",
        hover: "hover:bg-green-500",
        active: "active:bg-green-700",
      },
      outlined: {
        base: "border border-green-600 text-green-600",
        hover: "hover:bg-green-50",
        active: "active:bg-green-100",
      },
    },
    red: {
      filled: {
        base: "bg-red-600 text-white",
        hover: "hover:bg-red-500",
        active: "active:bg-red-700",
      },
      outlined: {
        base: "border border-red-600 text-red-600",
        hover: "hover:bg-red-50",
        active: "active:bg-red-100",
      },
    },
    gray: {
      filled: {
        base: "bg-gray-600 text-white",
        hover: "hover:bg-gray-500",
        active: "active:bg-gray-700",
      },
      outlined: {
        base: "border border-gray-600 text-gray-600",
        hover: "hover:bg-gray-50",
        active: "active:bg-gray-100",
      },
    },
  };

  return (
    <HeadlessButton as="button" className={className} {...props}>
      {({ active }) => (
        <span
          className={clsx(
            "inline-flex items-center rounded px-4 py-2 text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
            colorStyles[color][variant].base,
            !active && colorStyles[color][variant].hover,
            active && colorStyles[color][variant].active,
            variant === "outlined" && "bg-transparent",
            `focus:ring-${color}-500`,
          )}
        >
          {children}
        </span>
      )}
    </HeadlessButton>
  );
};

export default Button;
