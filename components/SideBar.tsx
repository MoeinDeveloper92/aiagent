import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationContext } from '@/lib/NavigationContext';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { PlusIcon } from 'lucide-react';

const SideBar = () => {
  const { closeMobileNav, isMobileNavOpen } = use(NavigationContext);
  const router = useRouter();

  const handleNewChat = () => {
    // TODO: Route to chat ID page
    // router.push('/dashboard/chat');
    closeMobileNav();
  };
  return (
    <>
      {/* bavkground Overlay for mobile */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={closeMobileNav}
        />
      )}
      <div
        className={cn(
          'fixed md:inset-y-0 top-14 bottom-0 left-0 z-50 w-72 bg-gray-50/80 backdrop-blur-xl border-r border-gray-200/50 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:top-0 flex flex-col',
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 border-b border-gray-200/50">
          <Button
            onClick={handleNewChat}
            className=" w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/50 shadow-sm hover:shadow transition-all duration-200"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2.5 p-4 scrollbar-thin scrollbar-thumb-gray-200 scrllbar-track-transparent"></div>
      </div>
    </>
  );
};

export default SideBar;
