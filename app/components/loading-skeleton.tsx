"use client";

interface LoadingSkeletonProps {
  className?: string;
}

export default function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={`animate-shimmer rounded-lg bg-zinc-900 bg-[length:200%_100%] bg-[linear-gradient(110deg,_#18181b_0%,_#27272a_40%,_#27272a_60%,_#18181b_100%)] ${className ?? ""}`}
    />
  );
}
