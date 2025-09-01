import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { 
  Code, 
  Folder, 
  Layers, 
  Rocket, 
  Settings, 
  LogOut,
  Crown
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeTab, onTabChange, isOpen }: SidebarProps) {
  const { user } = useAuth();

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const generationsUsed = user?.aiGenerationsUsed || 0;
  const generationsLimit = user?.aiGenerationsLimit || 50;
  const usagePercentage = (generationsUsed / generationsLimit) * 100;

  const navItems = [
    { id: 'projects', icon: Folder, label: 'Projects' },
    { id: 'generator', icon: Code, label: 'AI Generator' },
    { id: 'templates', icon: Layers, label: 'Templates' },
    { id: 'deployment', icon: Rocket, label: 'Deployments' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={`w-64 bg-card border-r border-border transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Code className="text-primary-foreground text-sm" />
          </div>
          <span className="text-xl font-bold text-foreground">CodeCraft AI</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              onClick={() => onTabChange(item.id)}
              data-testid={`nav-${item.id}`}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">{user?.plan || 'Free'} Plan</div>
            {user?.plan === 'pro' && <Crown className="h-4 w-4 text-yellow-500" />}
          </div>
          {user?.plan === 'free' && (
            <>
              <div className="text-xs text-muted-foreground mb-3">
                {generationsUsed}/{generationsLimit} generations used
              </div>
              <Progress value={usagePercentage} className="mb-3" />
              <Button 
                size="sm" 
                className="w-full"
                data-testid="button-upgrade-pro"
              >
                Upgrade to Pro
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {user?.firstName?.[0] || user?.email?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground" data-testid="text-user-name">
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.email}
            </div>
            <div className="text-xs text-muted-foreground truncate" data-testid="text-user-email">
              {user?.email}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
