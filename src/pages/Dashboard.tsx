import { DashboardLayout } from '@/components/DashboardLayout';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex h-full">
        <div className="w-80 border-r bg-card">
          <ChatList />
        </div>
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;