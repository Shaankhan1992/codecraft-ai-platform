const fs = require("fs");
const path = require("path");

const structure = {
  "package.json": `{
  "name": "codecraft-ai-platform",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "node server/routes.ts"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  }
}`,
  "tsconfig.json": `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "."
  }
}`,
  ".gitignore": `node_modules
dist
.env
`,
  ".env.example": `OPENAI_API_KEY=your-openai-key-here
DATABASE_URL=your-postgres-url-here
`,
  "replit.md": `# CodeCraft AI Platform
Generated project structure from Replit`,
  "shared/schema.ts": `export const schema = {
  users: {},
  projects: {},
};`,
  "server/db.ts": `// PostgreSQL DB connection setup`,
  "server/replitAuth.ts": `// Replit authentication logic`,
  "server/storage.ts": `// Storage interface`,
  "server/openai.ts": `// OpenAI integration`,
  "server/routes.ts": `// API Routes`,
  "client/src/index.css": `/* Global styles */`,
  "client/src/App.tsx": `export default function App() {
  return <h1>CodeCraft AI Platform</h1>;
}`,
  "client/src/hooks/useAuth.ts": `// Custom React hook for auth`,
  "client/src/lib/authUtils.ts": `// Authentication utilities`,
  "client/src/components/theme-provider.tsx": `// Theme provider component`,
  "client/src/components/auth-modal.tsx": `// Auth modal`,
  "client/src/components/sidebar.tsx": `// Sidebar navigation`,
  "client/src/components/code-preview.tsx": `// Code preview box`,
  "client/src/pages/landing.tsx": `export default function Landing() {
  return <div>Landing Page</div>;
}`,
  "client/src/pages/dashboard.tsx": `export default function Dashboard() {
  return <div>Dashboard</div>;
}`,
  "client/src/pages/admin.tsx": `export default function Admin() {
  return <div>Admin Panel</div>;
}`,
  "client/src/pages/templates.tsx": `export default function Templates() {
  return <div>Templates Marketplace</div>;
}`,
  "client/src/pages/ai-features.tsx": `export default function AIFeatures() {
  return <div>Advanced AI Features</div>;
}`
};

// Function to create files recursively
function createStructure(base, obj) {
  for (let filePath in obj) {
    const fullPath = path.join(base, filePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, obj[filePath]);
    console.log("✅ Created:", fullPath);
  }
}

// Run script
createStructure(process.cwd(), structure);
