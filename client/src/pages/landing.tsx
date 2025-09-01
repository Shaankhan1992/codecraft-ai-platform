import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AuthModal from "@/components/auth-modal";
import { 
  Code, 
  Eye, 
  Rocket, 
  Layers, 
  Users, 
  Shield, 
  Check, 
  X,
  Menu
} from "lucide-react";

export default function Landing() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Code className="text-primary-foreground text-sm" />
              </div>
              <span className="text-xl font-bold text-foreground">CodeCraft AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-pricing">Pricing</a>
              <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-docs">Docs</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={handleLogin}
                data-testid="button-signin"
              >
                Sign In
              </Button>
              <Button 
                onClick={handleSignup}
                data-testid="button-getstarted"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Build Apps with AI in Minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate frontend components, scaffold backends, and deploy instantly. CodeCraft AI transforms your ideas into production-ready applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleSignup}
              className="glow-effect"
              data-testid="button-start-building"
            >
              Start Building Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              data-testid="button-watch-demo"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Hero Demo Preview */}
        <div className="mt-16 relative max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <div className="bg-muted border-b border-border p-3 flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm text-muted-foreground ml-4">AI Code Generator</div>
            </div>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Prompt</div>
                  <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm">
                    <span className="text-accent">Create a modern landing page for a SaaS product with hero section, features, and pricing</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Generated Code</div>
                  <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm">
                    <div className="text-blue-400">&lt;section</div>
                    <div className="text-green-400 ml-4">className="hero-section"</div>
                    <div className="text-blue-400">&gt;</div>
                    <div className="text-muted-foreground ml-4">// Generated React component...</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to build fast</h2>
          <p className="text-xl text-muted-foreground">Powerful AI tools for modern development workflows</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Code Generation</h3>
              <p className="text-muted-foreground">Generate React components, backends, and full applications using natural language prompts.</p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Eye className="text-accent text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Preview</h3>
              <p className="text-muted-foreground">See your generated code in action with real-time preview and instant feedback.</p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="text-green-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">One-Click Deploy</h3>
              <p className="text-muted-foreground">Deploy to Vercel, Netlify, or GitHub Pages with integrated hosting solutions.</p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <Layers className="text-yellow-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Template Library</h3>
              <p className="text-muted-foreground">Start with pre-built templates for landing pages, dashboards, and SaaS applications.</p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-purple-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-muted-foreground">Invite team members, share projects, and collaborate on code generation.</p>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-red-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Ready</h3>
              <p className="text-muted-foreground">Role-based access, admin controls, and scaling options for teams of any size.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-muted-foreground">Choose the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold text-primary mb-2">$0</div>
                <p className="text-muted-foreground">Forever free</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>50 AI generations/month</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>Basic templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>Community support</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <X className="mr-3 h-4 w-4" />
                  <span>Ads included</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleSignup}
                data-testid="button-free-plan"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-primary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold text-primary mb-2">$29</div>
                <p className="text-muted-foreground">per month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>Unlimited AI generations</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>Premium templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>No ads</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>Team collaboration</span>
                </li>
              </ul>
              <Button 
                className="w-full"
                data-testid="button-pro-plan"
              >
                Start Pro Trial
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                <p className="text-muted-foreground">Contact us</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3 h-4 w-4" />
                  <span>SLA guarantee</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                data-testid="button-enterprise-plan"
              >
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
}
