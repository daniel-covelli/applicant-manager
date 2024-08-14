"use client";
import React, { type PropsWithChildren } from "react";
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

export const ButtonLoading = ({
  loading,
  children,
}: PropsWithChildren<{ loading: boolean }>) => {
  return loading ? (
    <div className={"flex h-5 w-14 items-center justify-center"} role="status">
      <svg
        aria-hidden="true"
        className="h-4 w-4 animate-spin fill-white text-gray-200 dark:text-gray-400"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    children
  );
};
