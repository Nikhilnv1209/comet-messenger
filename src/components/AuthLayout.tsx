import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="gradient-glass backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-elegant">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">💬</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">ChatApp</h1>
            <p className="text-white/80 text-sm">Connect with friends in style</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};