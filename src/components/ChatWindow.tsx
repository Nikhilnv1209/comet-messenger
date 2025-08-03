import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Smile, 
  Paperclip, 
  MoreVertical,
  Reply,
  Heart,
  Laugh,
  ThumbsUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: Date;
  isOwn: boolean;
  reactions?: { emoji: string; count: number; hasReacted: boolean }[];
}

export const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages: Message[] = [
    {
      id: '1',
      content: 'Hey everyone! How are you doing today?',
      sender: { id: '1', name: 'Sarah Wilson', avatar: '/placeholder.svg' },
      timestamp: new Date(Date.now() - 60000),
      isOwn: false,
      reactions: [
        { emoji: '👋', count: 3, hasReacted: false },
        { emoji: '😊', count: 1, hasReacted: true }
      ]
    },
    {
      id: '2',
      content: 'Pretty good! Just finished a great workout. How about you?',
      sender: { id: '2', name: 'Alex Johnson', avatar: '/placeholder.svg' },
      timestamp: new Date(Date.now() - 45000),
      isOwn: true
    },
    {
      id: '3',
      content: 'That sounds awesome! I need to get back into a workout routine myself. Any recommendations?',
      sender: { id: '3', name: 'Mike Chen', avatar: '/placeholder.svg' },
      timestamp: new Date(Date.now() - 30000),
      isOwn: false
    },
    {
      id: '4',
      content: 'I\'ve been doing a mix of cardio and strength training. There\'s this great app called FitTracker that has some amazing routines!',
      sender: { id: '2', name: 'Alex Johnson', avatar: '/placeholder.svg' },
      timestamp: new Date(Date.now() - 15000),
      isOwn: true
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const showDate = index === 0 || 
            messages[index - 1].timestamp.toDateString() !== msg.timestamp.toDateString();
          
          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center my-4">
                  <Badge variant="secondary" className="text-xs">
                    {formatDate(msg.timestamp)}
                  </Badge>
                </div>
              )}
              
              <div className={cn(
                "flex items-start space-x-3 group",
                msg.isOwn && "flex-row-reverse space-x-reverse"
              )}>
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                  <AvatarFallback className="text-xs">
                    {msg.sender.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className={cn(
                  "flex flex-col space-y-1 max-w-[70%]",
                  msg.isOwn && "items-end"
                )}>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">
                      {msg.sender.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  
                  <div className={cn(
                    "p-3 rounded-2xl shadow-sm",
                    msg.isOwn 
                      ? "chat-bubble-user" 
                      : "chat-bubble-other"
                  )}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                  
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex space-x-1 mt-1">
                      {msg.reactions.map((reaction, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-6 px-2 text-xs rounded-full",
                            reaction.hasReacted && "bg-primary/10"
                          )}
                        >
                          {reaction.emoji} {reaction.count}
                        </Button>
                      ))}
                    </div>
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
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">SW</AvatarFallback>
            </Avatar>
            <div className="bg-muted p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="pr-20 min-h-[44px] resize-none rounded-xl"
                maxLength={1000}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button type="button" variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={!message.trim()}
            className="h-11 w-11 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};