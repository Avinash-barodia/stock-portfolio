import React from 'react';

export const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-white/5 rounded ${className}`}></div>
  );
};

export const CardSkeleton = () => (
  <div className="glass-card-premium p-6 flex flex-col gap-y-4">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-10 w-10 rounded-xl" />
    </div>
    <div className="flex flex-col gap-y-2">
      <Skeleton className="h-8 w-32" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 4 }) => (
  <div className="flex flex-col gap-y-4 w-full">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex items-center justify-between py-4 border-b border-white/5">
        <div className="flex items-center gap-x-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-20" />
      </div>
    ))}
  </div>
);
