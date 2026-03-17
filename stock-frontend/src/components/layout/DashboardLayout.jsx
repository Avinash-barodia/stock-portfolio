import React from 'react';

export const DashboardLayout = ({ leftSidebar, rightSidebar, children }) => {
  return (
    <div className='min-h-screen text-text-primary px-4 md:px-6 py-4 relative overflow-hidden bg-[#07090F]'>
      {/* Background Depth Blobs */}
      <div className="bg-blob bg-blob-blue animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="bg-blob bg-blob-purple animate-pulse" style={{ animationDuration: '12s' }}></div>

      <div className='relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1600px] mx-auto'>
        
        {/* Watchlist - Left Sidebar (On desktop: sticky left, On mobile: order-2) */}
        <aside className='xl:col-span-3 xl:sticky xl:top-6 xl:h-[calc(100vh-48px)] xl:overflow-y-auto custom-scrollbar order-2 xl:order-1'>
          <div className="hover:shadow-2xl transition-premium duration-500">
            {leftSidebar}
          </div>
        </aside>

        {/* Main Content - Center (On mobile: order-1) */}
        <main className='xl:col-span-6 flex flex-col gap-y-6 order-1 xl:order-2'>
          {children}
        </main>

        {/* Account & Trade - Right Sidebar (Order-3) */}
        <aside className='xl:col-span-3 xl:sticky xl:top-6 xl:h-[calc(100vh-48px)] xl:overflow-y-auto custom-scrollbar order-3'>
          <div className="hover:shadow-2xl transition-premium duration-500">
            {rightSidebar}
          </div>
        </aside>

      </div>
    </div>
  );
};
