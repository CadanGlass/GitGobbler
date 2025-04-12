import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultInfo {
  filename: string;
  fileSize: number;
  tokenCount: number;
  fileCount: number;
  generatedAt: string;
}

interface DownloadResultProps {
  resultInfo: ResultInfo;
  onDownload: () => void;
}

export function DownloadResult({ resultInfo, onDownload }: DownloadResultProps) {
  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-card to-background">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          Gobbling Complete
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1 bg-muted/40 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Filename</p>
            <p className="font-medium">{resultInfo.filename}</p>
          </div>
          <div className="space-y-1 bg-muted/40 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">File Size</p>
            <p className="font-medium">{formatFileSize(resultInfo.fileSize)}</p>
          </div>
          <div className="space-y-1 bg-muted/40 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Token Count</p>
            <p className="font-medium">{resultInfo.tokenCount.toLocaleString()}</p>
          </div>
          <div className="space-y-1 bg-muted/40 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Files Processed</p>
            <p className="font-medium">{resultInfo.fileCount}</p>
          </div>
          <div className="space-y-1 bg-muted/40 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Generated At</p>
            <p className="font-medium">
              {new Date(resultInfo.generatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            onClick={onDownload} 
            className="w-full md:w-auto"
            size="lg"
          >
            Download XML File
          </Button>
          <Button 
            onClick={() => {
              const xmlContent = document.getElementById('xml-preview-content')?.textContent || '';
              navigator.clipboard.writeText(xmlContent);
              
              // Show temporary feedback
              const button = document.activeElement as HTMLButtonElement;
              const originalText = button.innerText;
              button.innerText = "Copied!";
              setTimeout(() => {
                button.innerText = originalText;
              }, 2000);
            }} 
            className="w-full md:w-auto"
            variant="outline"
            size="lg"
          >
            Copy XML to Clipboard
          </Button>
        </div>
        
        <div className="mt-6 border rounded-lg p-4 bg-muted/30 overflow-auto max-h-[400px]">
          <pre id="xml-preview-content" className="text-xs whitespace-pre-wrap text-foreground/80">
{`<?xml version="1.0" encoding="UTF-8"?>
<repository_summary tool="Git Gobbler" tool_version="1.0">
  <file_summary>
    <processing_info>Processed with Git Gobbler</processing_info>
    <purpose>Code analysis and LLM context optimization</purpose>
    <file_format>XML with CDATA sections for code</file_format>
    <usage_guidelines>Use as context for LLM interactions</usage_guidelines>
    <notes>
      <note>.gitignore applied.</note>
      <note>Secret Scan: Enabled (detect-secrets)</note>
    </notes>
  </file_summary>
  <repository_info>
    <source_url>https://github.com/example/repo</source_url>
    <source_type>GitHub Repository</source_type>
    <processed_at>${new Date().toISOString()}</processed_at>
    <total_files_processed>${resultInfo.fileCount}</total_files_processed>
    <total_token_count>${resultInfo.tokenCount}</total_token_count>
  </repository_info>
  <directory_structure>
    <![CDATA[
    /
    ├── src/
    │   ├── components/
    │   │   └── *.tsx
    │   ├── lib/
    │   │   └── *.ts
    │   └── app/
    │       └── *.tsx
    ├── public/
    └── package.json
    ]]>
  </directory_structure>
  <files>
    <file path="src/app/page.tsx" token_count="500">
      <![CDATA[/* Example file content */]]>
    </file>
    <!-- More files would be here -->
  </files>
  <security_warnings>
    <warning file="src/config.js" line="5" rule="High Entropy String">Potential API key</warning>
    <warning file="src/utils/auth.js" line="12" rule="Password">Potential hardcoded password</warning>
  </security_warnings>
</repository_summary>`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}