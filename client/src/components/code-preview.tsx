import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2 } from "lucide-react";

interface CodePreviewProps {
  html: string;
  isLoading?: boolean;
}

export default function CodePreview({ html, isLoading }: CodePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && html) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html]);

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Live Preview
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" disabled>
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" disabled>
                <Code2 className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Generating preview...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!html) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Live Preview
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" disabled>
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" disabled>
                <Code2 className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Preview will appear here after generation</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Live Preview
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" data-testid="button-external-preview">
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" data-testid="button-view-code">
              <Code2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <iframe
          ref={iframeRef}
          className="w-full h-full border border-border rounded-lg bg-white"
          title="Code Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </CardContent>
    </Card>
  );
}
