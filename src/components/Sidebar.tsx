import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  Search,
  MoreHorizontal,
  Phone,
  Video,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const user = {
    name: "Alex Johnson",
    username: "@alexj",
    avatar: "/placeholder.svg",
    status: "online"
  };

  const navigationItems = [
    { icon: MessageCircle, label: "Chats", badge: 3, active: true },
    { icon: Users, label: "Friends", badge: 1 },
    { icon: Bell, label: "Notifications", badge: 5 },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-80 bg-card border-r shadow-chat transform transition-transform duration-300 lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 status-online rounded-full border-2 border-card" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">{user.username}</p>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 text-left",
                  item.active && "bg-primary/10 text-primary font-medium"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={item.active ? "default" : "secondary"} 
                    className="ml-auto text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
            </div>
          </div>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};