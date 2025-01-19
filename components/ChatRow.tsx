'use client';

import { Doc, Id } from '@/convex/_generated/dataModel';
import { NavigationContext } from '@/lib/NavigationContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Button } from './ui/button';
import { TrashIcon } from 'lucide-react';

function ChatRow({
  chat,
  onDelete,
}: {
  chat: Doc<'chats'>;
  onDelete: (id: Id<'chats'>) => void;
}) {
  const router = useRouter();
  const { closeMobileNav } = useContext(NavigationContext);

  const handleClick = () => {
    router.push(`/dashboard/chat/${chat._id}`);
  };
  return (
    <div
      className="group rounded-xl border border-gray-200/30 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          Chat
          <Button
            variant={'ghost'}
            size={'icon'}
            className="opacity-0 group-hover:opacity-100 -mr-2 -mt-2 ml-2 transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chat._id);
            }}
          >
            <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-200 transition-colors" />
          </Button>
        </div>

        {/* Last Message */}
      </div>
    </div>
  );
}

export default ChatRow;
