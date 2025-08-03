import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Zap, Shield, Smartphone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">ChatApp</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Connect, Chat, Collaborate
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience modern messaging with our beautiful, intuitive chat application. 
            Stay connected with friends, teams, and communities like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-white shadow-glow">
                Start Chatting Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<MessageCircle className="h-8 w-8 text-primary" />}
            title="Real-time Messaging"
            description="Instant messaging with typing indicators, read receipts, and emoji reactions."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-primary" />}
            title="Group Chats"
            description="Create unlimited group chats with advanced admin controls and member management."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-primary" />}
            title="Lightning Fast"
            description="Optimized for speed with instant message delivery and smooth animations."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Secure & Private"
            description="End-to-end encryption ensures your conversations stay private and secure."
          />
          <FeatureCard
            icon={<Smartphone className="h-8 w-8 text-primary" />}
            title="Mobile Ready"
            description="Perfect responsive design that works beautifully on all devices."
          />
          <FeatureCard
            icon={<Globe className="h-8 w-8 text-primary" />}
            title="Global Connect"
            description="Connect with people worldwide with multi-language support."
          />
        </div>

        {/* CTA Section */}
        <div className="text-center gradient-glass backdrop-blur-sm border rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already enjoying seamless communication with ChatApp.
          </p>
          <Link to="/signup">
            <Button size="lg" className="gradient-primary text-white">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 ChatApp. Made with ❤️ for modern communication.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 rounded-xl bg-card shadow-chat border hover:shadow-elegant transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
