import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreVertical, Pin, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  isGroup: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  memberCount?: number;
}

export const ChatList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState('1');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'General Chat',
      avatar: '/placeholder.svg',
      lastMessage: 'That sounds awesome! I need to get back into a workout routine myself...',
      timestamp: new Date(Date.now() - 15000),
      unreadCount: 3,
      isOnline: true,
      isGroup: true,
      isPinned: true,
      memberCount: 24
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: '/placeholder.svg',
      lastMessage: 'Thanks for the help earlier! 😊',
      timestamp: new Date(Date.now() - 300000),
      unreadCount: 1,
      isOnline: true,
      isGroup: false
    },
    {
      id: '3',
      name: 'Design Team',
      avatar: '/placeholder.svg',
      lastMessage: 'Mike: The new mockups look great!',
      timestamp: new Date(Date.now() - 600000),
      unreadCount: 0,
      isOnline: false,
      isGroup: true,
      memberCount: 8
    },
    {
      id: '4',
      name: 'Emma Davis',
      avatar: '/placeholder.svg',
      lastMessage: 'See you tomorrow!',
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 0,
      isOnline: false,
      isGroup: false
    },
    {
      id: '5',
      name: 'Project Alpha',
      avatar: '/placeholder.svg',
      lastMessage: 'John: Updated the documentation',
      timestamp: new Date(Date.now() - 7200000),
      unreadCount: 0,
      isOnline: false,
      isGroup: true,
      isMuted: true,
      memberCount: 12
    }
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes < 1 ? 'now' : `${minutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredChats.filter(chat => chat.isPinned);
  const regularChats = filteredChats.filter(chat => !chat.isPinned);

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Chats</h2>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-0"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {/* Pinned Chats */}
        {pinnedChats.length > 0 && (
          <div className="p-2">
            <div className="flex items-center space-x-2 px-3 py-2">
              <Pin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">PINNED</span>
            </div>
            {pinnedChats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isSelected={selectedChat === chat.id}
                onSelect={() => setSelectedChat(chat.id)}
              />
            ))}
          </div>
        )}

        {/* Regular Chats */}
        <div className="p-2">
          {pinnedChats.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-2">
              <span className="text-xs text-muted-foreground font-medium">ALL CHATS</span>
            </div>
          )}
          {regularChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChat === chat.id}
              onSelect={() => setSelectedChat(chat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
}

const ChatItem = ({ chat, isSelected, onSelect }: ChatItemProps) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes < 1 ? 'now' : `${minutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-colors group",
        isSelected ? "bg-primary/10" : "hover:bg-muted/50"
      )}
      onClick={onSelect}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={chat.avatar} alt={chat.name} />
          <AvatarFallback>
            {chat.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        {!chat.isGroup && (
          <div className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
            chat.isOnline ? "status-online" : "status-offline"
          )} />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className={cn(
              "font-medium truncate",
              chat.unreadCount > 0 ? "text-foreground" : "text-foreground/80"
            )}>
              {chat.name}
            </h3>
            {chat.isMuted && <VolumeX className="h-3 w-3 text-muted-foreground" />}
            {chat.isPinned && <Pin className="h-3 w-3 text-muted-foreground" />}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTime(chat.timestamp)}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <p className={cn(
            "text-sm truncate",
            chat.unreadCount > 0 ? "text-foreground/70" : "text-muted-foreground"
          )}>
            {chat.lastMessage}
          </p>
          <div className="flex items-center space-x-2">
            {chat.unreadCount > 0 && (
              <Badge className="text-xs h-5 min-w-[20px] flex items-center justify-center">
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
        
        {chat.isGroup && chat.memberCount && (
          <p className="text-xs text-muted-foreground mt-1">
            {chat.memberCount} members
          </p>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
};