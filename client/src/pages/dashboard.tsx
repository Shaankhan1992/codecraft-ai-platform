import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";
import CodePreview from "@/components/code-preview";

import { 
  Bell, 
  Menu, 
  Plus, 
  Eye, 
  Code2, 
  MoreVertical, 
  Globe, 
  BarChart3, 
  ShoppingCart,
  Shield,
  Download,
  Rocket,
  Copy,
  ExternalLink
} from "lucide-react";
import { Link } from "wouter";

import type { Project } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{ code: string; preview: string; files: any[] } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Projects Query
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
    },
  });

  // Create Project Mutation
  const createProjectMutation = useMutation({
    mutationFn: async (projectData: any) => {
      const response = await apiRequest('POST', '/api/projects', projectData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Success",
        description: "Project created successfully!",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Generate Code Mutation
  const generateCodeMutation = useMutation({
    mutationFn: async (data: { prompt: string; framework: string; template: string; projectName: string }) => {
      const response = await apiRequest('POST', '/api/generate', data);
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedCode(data);
      toast({
        title: "Success",
        description: "Code generated successfully!",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleGenerateCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      projectName: formData.get('projectName') as string,
      framework: formData.get('framework') as string,
      template: formData.get('template') as string,
      prompt: formData.get('prompt') as string,
    };

    if (!data.projectName || !data.framework || !data.prompt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    generateCodeMutation.mutate(data);
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Code copied to clipboard",
    });
  };

  const downloadCode = () => {
    if (!generatedCode) return;
    
    const blob = new Blob([generatedCode.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-code.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const templates = [
    { id: 'landing', name: 'SaaS Landing Page', description: 'Modern landing page with hero, features, pricing, and testimonials', icon: Globe, tags: ['React', 'Tailwind'], status: 'Popular' },
    { id: 'dashboard', name: 'Admin Dashboard', description: 'Complete admin interface with charts, tables, and user management', icon: BarChart3, tags: ['React', 'Chart.js'], status: 'Pro' },
    { id: 'ecommerce', name: 'E-commerce Store', description: 'Full-featured online store with product catalog and payment integration', icon: ShoppingCart, tags: ['Next.js', 'Stripe'], status: 'New' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
                <p className="text-muted-foreground">Manage and organize your AI-generated applications</p>
              </div>
              <Button onClick={() => setActiveTab('generator')} data-testid="button-new-project">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>

            {projectsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects?.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Code2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-4">Create your first project to get started</p>
                    <Button onClick={() => setActiveTab('generator')} data-testid="button-create-first-project">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  </div>
                ) : (
                  projects?.map((project: Project) => (
                    <Card key={project.id} className="hover:border-primary/50 transition-colors" data-testid={`card-project-${project.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Globe className="text-primary" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              project.status === 'deployed' ? 'bg-green-500' : 
                              project.status === 'building' ? 'bg-yellow-500' : 'bg-gray-500'
                            }`}></div>
                            <span className="text-xs text-muted-foreground capitalize">{project.status}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2" data-testid={`text-project-name-${project.id}`}>{project.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4" data-testid={`text-project-description-${project.id}`}>{project.description}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span data-testid={`text-project-framework-${project.id}`}>{project.framework}</span>
                          <span data-testid={`text-project-date-${project.id}`}>
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button className="flex-1" size="sm" data-testid={`button-preview-${project.id}`}>
                            <Eye className="mr-1 h-3 w-3" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm" data-testid={`button-code-${project.id}`}>
                            <Code2 className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" data-testid={`button-menu-${project.id}`}>
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        );

      case 'generator':
        return (
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">AI Code Generator</h2>
                <p className="text-muted-foreground">Describe what you want to build and let AI generate the code</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleGenerateCode} className="space-y-4">
                        <div>
                          <Label htmlFor="projectName">Project Name</Label>
                          <Input 
                            id="projectName" 
                            name="projectName" 
                            placeholder="My Awesome Project" 
                            required 
                            data-testid="input-project-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="framework">Framework</Label>
                          <Select name="framework" required>
                            <SelectTrigger data-testid="select-framework">
                              <SelectValue placeholder="Select framework" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="react">React</SelectItem>
                              <SelectItem value="nextjs">Next.js</SelectItem>
                              <SelectItem value="vue">Vue.js</SelectItem>
                              <SelectItem value="angular">Angular</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="template">Template</Label>
                          <Select name="template">
                            <SelectTrigger data-testid="select-template">
                              <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="custom">Custom (AI Generated)</SelectItem>
                              <SelectItem value="landing">Landing Page</SelectItem>
                              <SelectItem value="dashboard">Dashboard</SelectItem>
                              <SelectItem value="blog">Blog</SelectItem>
                              <SelectItem value="saas">SaaS Application</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="prompt">AI Prompt</Label>
                          <Textarea 
                            id="prompt" 
                            name="prompt"
                            className="h-32 resize-none" 
                            placeholder="Describe your application in detail. For example: 'Create a modern e-commerce website with a hero section, product grid, shopping cart functionality, and a clean checkout process. Use a blue and white color scheme.'" 
                            required 
                            data-testid="textarea-prompt"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground" data-testid="text-generations-remaining">
                            AI generations remaining: {Math.max(0, (user?.aiGenerationsLimit || 50) - (user?.aiGenerationsUsed || 0))}/{user?.aiGenerationsLimit || 50}
                          </span>
                          <Button 
                            type="submit" 
                            disabled={isGenerating || generateCodeMutation.isPending}
                            data-testid="button-generate-code"
                          >
                            <Code2 className="mr-2 h-4 w-4" />
                            {isGenerating || generateCodeMutation.isPending ? 'Generating...' : 'Generate Code'}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Preview Section */}
                <CodePreview 
                  html={generatedCode?.preview || ''}
                  isLoading={isGenerating || generateCodeMutation.isPending}
                />
              </div>

              {/* Generated Code Section */}
              {generatedCode && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Generated Code
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => copyToClipboard(generatedCode.code)}
                          data-testid="button-copy-code"
                        >
                          <Copy className="mr-1 h-3 w-3" />
                          Copy
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={downloadCode}
                          data-testid="button-download-code"
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                        <Button 
                          size="sm"
                          data-testid="button-deploy-code"
                        >
                          <Rocket className="mr-1 h-3 w-3" />
                          Deploy
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap" data-testid="text-generated-code">
                        {generatedCode.code}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 'templates':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Template Library</h2>
              <p className="text-muted-foreground">Start with pre-built templates and customize with AI</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="overflow-hidden hover:border-primary/50 transition-colors" data-testid={`card-template-${template.id}`}>
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <template.icon className="h-16 w-16 text-primary" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2" data-testid={`text-template-name-${template.id}`}>{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4" data-testid={`text-template-description-${template.id}`}>{template.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span data-testid={`text-template-tags-${template.id}`}>{template.tags.join(', ')}</span>
                      <Badge 
                        variant={template.status === 'Popular' ? 'default' : template.status === 'Pro' ? 'secondary' : 'outline'}
                        data-testid={`badge-template-status-${template.id}`}
                      >
                        {template.status}
                      </Badge>
                    </div>
                    <Button className="w-full" data-testid={`button-use-template-${template.id}`}>
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Deployments</h2>
              <p className="text-muted-foreground">Manage your deployed applications and hosting</p>
            </div>

            <div className="grid gap-6">
              {projects?.filter((p: Project) => p.status === 'deployed').length === 0 ? (
                <div className="text-center py-12">
                  <Rocket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No deployments yet</h3>
                  <p className="text-muted-foreground mb-4">Deploy your first project to see it here</p>
                </div>
              ) : (
                projects?.filter((p: Project) => p.status === 'deployed').map((project: Project) => (
                  <Card key={project.id} data-testid={`card-deployment-${project.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Globe className="text-primary text-xl" />
                          </div>
                          <div>
                            <h3 className="font-semibold" data-testid={`text-deployment-name-${project.id}`}>{project.name}</h3>
                            <p className="text-sm text-muted-foreground" data-testid={`text-deployment-url-${project.id}`}>
                              {project.deploymentUrl || 'https://example.vercel.app'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-green-500" data-testid={`badge-deployment-status-${project.id}`}>
                            Active
                          </Badge>
                          <Button variant="outline" size="sm" data-testid={`button-external-${project.id}`}>
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" data-testid={`button-deployment-menu-${project.id}`}>
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Platform</div>
                          <div className="font-medium">Vercel</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Last Deploy</div>
                          <div className="font-medium">
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Branch</div>
                          <div className="font-medium">main</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Build Time</div>
                          <div className="font-medium">1m 23s</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <p className="text-muted-foreground mb-6">Manage your account preferences and billing</p>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Account Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Email</Label>
                          <Input value={user?.email || ''} disabled />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>First Name</Label>
                            <Input value={user?.firstName || ''} placeholder="First name" />
                          </div>
                          <div>
                            <Label>Last Name</Label>
                            <Input value={user?.lastName || ''} placeholder="Last name" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">Subscription</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium capitalize">{user?.plan || 'Free'} Plan</div>
                          <div className="text-sm text-muted-foreground">
                            {user?.plan === 'free' ? 'Limited AI generations' : 'Unlimited AI generations'}
                          </div>
                        </div>
                        {user?.plan === 'free' && (
                          <Button data-testid="button-upgrade-settings">Upgrade</Button>
                        )}
                      </div>
                    </div>

                    <Button data-testid="button-save-settings">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
                data-testid="button-toggle-sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold capitalize" data-testid="text-page-title">{activeTab}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" data-testid="button-notifications">
                <Bell className="h-5 w-5" />
              </Button>
              {user?.role === 'admin' && (
                <Link href="/admin">
                  <Button variant="secondary" size="sm" data-testid="button-admin-panel">
                    <Shield className="mr-1 h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </main>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
