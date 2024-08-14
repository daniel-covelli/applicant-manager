"use client";
import React from "react";
import { Button as HeadlessButton } from "@headlessui/react";
import clsx from "clsx";

interface ButtonProps<T extends React.ElementType = "button"> {
  as?: T;
  variant?: "filled" | "outlined";
  color?: "indigo" | "green" | "red" | "gray";
  children: React.ReactNode;
  className?: string;
}

const Button = <T extends React.ElementType = "button">({
  as,
  variant = "filled",
  color = "indigo",
  className,
  ...props
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  const colorStyles = {
    indigo: {
      filled: {
        base: "bg-indigo-600 text-white",
        hover: "hover:bg-indigo-500",
        active: "active:bg-indigo-700",
      },
      outlined: {
        base: "border border-indigo-600 text-indigo-600",
        hover: "hover:bg-indigo-50",
        active: "active:bg-indigo-100",
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

  const Component = as ?? "button";

  return (
    <Component
      className={clsx(
        "w-fit items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors duration-150 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        colorStyles[color][variant].base,
        colorStyles[color][variant].hover,
        colorStyles[color][variant].active,
        variant === "outlined" && "bg-transparent",
        `focus:ring-${color}-500`,
        className,
      )}
      {...props}
    />
  );
};

export default Button;
