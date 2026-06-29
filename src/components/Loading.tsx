"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#F5EFE7] z-50">
      {/* Logo */}
      <div className="mb-12">
        <Image
          src="/logo_no_white.png"
          alt="FitShack Loading"
          width={160}
          height={160}
          className="w-40 h-40"
          priority
        />
      </div>

      {/* Progress Bar Container */}
      <div className="w-48 h-1 bg-[#E8DDD0] rounded-full overflow-hidden">
        {/* Animated Progress Bar */}
        <div
          className="h-full bg-gradient-to-r from-[#8B7355] via-[#A0826D] to-[#8B7355] rounded-full"
          style={{
            animation: "shimmer 2s infinite",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      {/* Keyframes for animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            background-position: 200% center;
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
