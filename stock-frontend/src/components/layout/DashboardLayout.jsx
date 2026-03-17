import React from 'react';

export const DashboardLayout = ({ leftSidebar, rightSidebar, children }) => {
  return (
    <div className='min-h-screen bg-background text-text-primary px-4 md:px-6 py-4'>
      <div className='grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1600px] mx-auto'>
        
        {/* Watchlist - Left Sidebar (On desktop: sticky left, On mobile: order-2) */}
        <aside className='xl:col-span-3 xl:sticky xl:top-6 xl:h-[calc(100vh-48px)] xl:overflow-y-auto custom-scrollbar glass-card-premium order-2 xl:order-1'>
          {leftSidebar}
        </aside>

        {/* Main Content - Center (On mobile: order-1) */}
        <main className='xl:col-span-6 flex flex-col gap-y-6 order-1 xl:order-2'>
          {children}
        </main>

        {/* Account & Trade - Right Sidebar (Order-3) */}
        <aside className='xl:col-span-3 xl:sticky xl:top-6 xl:h-[calc(100vh-48px)] xl:overflow-y-auto custom-scrollbar glass-card-premium order-3'>
          {rightSidebar}
        </aside>

      </div>
    </div>
  );
};
