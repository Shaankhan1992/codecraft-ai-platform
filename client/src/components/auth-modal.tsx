import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export default function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Redirect to Replit Auth
    setTimeout(() => {
      window.location.href = '/api/login';
    }, 500);
  };

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    // For now, redirect to main login - OAuth integration would be handled by Replit Auth
    window.location.href = '/api/login';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              data-testid="button-close-auth"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  data-testid="input-fullname"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                required 
                data-testid="input-email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                data-testid="input-password"
              />
            </div>
            
            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" data-testid="checkbox-remember" />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="text-sm" data-testid="link-forgot-password">
                  Forgot password?
                </Button>
              </div>
            )}

            {mode === 'signup' && (
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required data-testid="checkbox-terms" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Terms of Service
                  </Button>
                  {' '}and{' '}
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Privacy Policy
                  </Button>
                </Label>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              data-testid="button-submit-auth"
            >
              {isLoading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOAuthLogin('google')}
                data-testid="button-google-auth"
              >
                <FaGoogle className="text-red-500 mr-2" />
                Google
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOAuthLogin('github')}
                data-testid="button-github-auth"
              >
                <FaGithub className="mr-2" />
                GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-primary"
                onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
                data-testid="button-switch-auth-mode"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
