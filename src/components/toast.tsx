"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Toast = () => {
  const router = useRouter();
  const search = useSearchParams();
  const pathName = usePathname();

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 300); // Match this with transition duration
    router.replace(pathName);
  }, [pathName, router]);

  useEffect(() => {
    const status = search.get("status");
    if (status === "success" || status === "failure") {
      setToastType(status === "success" ? "success" : "error");
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10); // Delay to trigger enter animation

      const timer = setTimeout(() => {
        handleDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [handleDismiss, search]);

  if (!shouldRender) return null;
  return (
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 transform">
      <div
        className={` ${toastType === "success" ? "bg-green-500" : "bg-red-500"} flex items-center justify-between rounded-lg px-6 py-4 text-white shadow-lg transition-all duration-300 ease-in-out ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} `}
      >
        <span className="mr-4">
          {toastType === "success"
            ? "You successfully applied!"
            : "An error occurred."}
        </span>
        <button
          onClick={handleDismiss}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
