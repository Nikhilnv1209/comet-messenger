import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  UserPlus, 
  MessageCircle, 
  Phone, 
  Video, 
  MoreVertical,
  Users,
  UserCheck,
  UserX,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  statusMessage?: string;
  mutualFriends?: number;
  lastSeen?: Date;
}

interface FriendRequest {
  id: string;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  timestamp: Date;
}

export const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('online');

  const friends: Friend[] = [
    {
      id: '1',
      name: 'Sarah Wilson',
      username: '@sarahw',
      avatar: '/placeholder.svg',
      status: 'online',
      statusMessage: 'Working on something cool',
      mutualFriends: 5
    },
    {
      id: '2',
      name: 'Mike Chen',
      username: '@mikec',
      avatar: '/placeholder.svg',
      status: 'away',
      statusMessage: 'In a meeting',
      mutualFriends: 3
    },
    {
      id: '3',
      name: 'Emma Davis',
      username: '@emmad',
      avatar: '/placeholder.svg',
      status: 'busy',
      statusMessage: 'Do not disturb',
      mutualFriends: 8
    },
    {
      id: '4',
      name: 'John Smith',
      username: '@johns',
      avatar: '/placeholder.svg',
      status: 'offline',
      lastSeen: new Date(Date.now() - 3600000),
      mutualFriends: 2
    }
  ];

  const friendRequests: FriendRequest[] = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      username: '@alexr',
      avatar: '/placeholder.svg',
      mutualFriends: 4,
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      name: 'Lisa Park',
      username: '@lisap',
      avatar: '/placeholder.svg',
      mutualFriends: 2,
      timestamp: new Date(Date.now() - 600000)
    }
  ];

  const onlineFriends = friends.filter(f => f.status === 'online');
  const awayFriends = friends.filter(f => f.status === 'away');
  const busyFriends = friends.filter(f => f.status === 'busy');
  const offlineFriends = friends.filter(f => f.status === 'offline');

  const getFilteredFriends = () => {
    let filtered = friends;
    
    if (activeTab === 'online') {
      filtered = onlineFriends;
    } else if (activeTab === 'all') {
      filtered = friends;
    }

    if (searchQuery) {
      filtered = filtered.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <div className="flex h-full">
      {/* Friends List */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Friends</h2>
            <Button variant="ghost" size="sm">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="online" className="text-xs">
                Online ({onlineFriends.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="text-xs">
                All ({friends.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {friendRequests.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 px-3 py-2">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">
                  PENDING REQUESTS ({friendRequests.length})
                </span>
              </div>
              {friendRequests.map((request) => (
                <FriendRequestItem key={request.id} request={request} />
              ))}
            </div>
          )}

          <div className="space-y-1">
            {getFilteredFriends().map((friend) => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
          </div>
        </div>
      </div>

      {/* Friend Profile/Details */}
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Select a friend</h3>
          <p className="text-muted-foreground">
            Choose a friend to view their profile or start a conversation
          </p>
        </div>
      </div>
    </div>
  );
};

interface FriendItemProps {
  friend: Friend;
}

const FriendItem = ({ friend }: FriendItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'away': return 'status-away';
      case 'busy': return 'status-busy';
      default: return 'status-offline';
    }
  };

  const formatLastSeen = (date?: Date) => {
    if (!date) return '';
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors group">
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={friend.avatar} alt={friend.name} />
          <AvatarFallback>
            {friend.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className={cn(
          "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
          getStatusColor(friend.status)
        )} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate">{friend.name}</h3>
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <Phone className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground truncate">
          {friend.status === 'offline' && friend.lastSeen
            ? `Last seen ${formatLastSeen(friend.lastSeen)}`
            : friend.statusMessage || friend.username
          }
        </p>
        
        {friend.mutualFriends && (
          <p className="text-xs text-muted-foreground">
            {friend.mutualFriends} mutual friends
          </p>
        )}
      </div>
    </div>
  );
};

interface FriendRequestItemProps {
  request: FriendRequest;
}

const FriendRequestItem = ({ request }: FriendRequestItemProps) => {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-xl bg-muted/30 border">
      <Avatar className="h-10 w-10">
        <AvatarImage src={request.avatar} alt={request.name} />
        <AvatarFallback>
          {request.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{request.name}</h4>
        <p className="text-xs text-muted-foreground">
          {request.mutualFriends} mutual friends
        </p>
      </div>
      
      <div className="flex space-x-1">
        <Button variant="default" size="sm" className="h-7 px-2">
          <UserCheck className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm" className="h-7 px-2">
          <UserX className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};