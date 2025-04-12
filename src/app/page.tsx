"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubUrlInput } from "@/components/github-url-input";
import { FileUpload } from "@/components/file-upload";
import { ProcessingOptions, type ProcessingOptions as ProcessingOptionsType } from "@/components/processing-options";
import { ProcessingStatus, type ProcessingStep } from "@/components/processing-status";
import { DownloadResult } from "@/components/download-result";

// Mock initial processing steps
const initialSteps: ProcessingStep[] = [
  { id: "clone", label: "Clone Repository / Extract Files", status: "pending" },
  { id: "parse", label: "Parse .gitignore Rules", status: "pending" },
  { id: "scan", label: "Scan for Secrets", status: "pending" },
  { id: "format", label: "Format Code", status: "pending" },
  { id: "count", label: "Count Tokens", status: "pending" },
  { id: "generate", label: "Generate XML", status: "pending" },
];

// Mock result info
const mockResultInfo = {
  filename: "repository-summary.xml",
  fileSize: 1024 * 512, // 512 KB
  tokenCount: 150000,
  fileCount: 120,
  generatedAt: new Date().toISOString(),
};

export default function Home() {
  const [processingOptions, setProcessingOptions] = useState<ProcessingOptionsType>({
    removeComments: false,
    removeWhitespace: false,
    scanSecrets: true,
    useGitignore: true,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [steps, setSteps] = useState<ProcessingStep[]>(initialSteps);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Mock function to handle GitHub URL submission
  const handleGithubUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setJobId(null);
    setError(null);
    setIsComplete(false);
    setSteps(initialSteps);
    
    try {
      // In a real implementation, this would call your API
      console.log("Processing GitHub URL:", url, "with options:", processingOptions);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate job creation
      const mockJobId = "job_" + Math.random().toString(36).substring(2, 10);
      setJobId(mockJobId);
      
      // Simulate processing steps
      await simulateProcessing();
      
      setIsComplete(true);
    } catch (err) {
      setError((err as Error).message || "An error occurred during processing");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock function to handle file upload
  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setJobId(null);
    setError(null);
    setIsComplete(false);
    setSteps(initialSteps);
    
    try {
      // In a real implementation, this would upload the file to your API
      console.log("Processing file:", file.name, "with options:", processingOptions);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate job creation
      const mockJobId = "job_" + Math.random().toString(36).substring(2, 10);
      setJobId(mockJobId);
      
      // Simulate processing steps
      await simulateProcessing();
      
      setIsComplete(true);
    } catch (err) {
      setError((err as Error).message || "An error occurred during processing");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock function to simulate processing steps
  const simulateProcessing = async () => {
    const updateStep = (id: string, status: ProcessingStep["status"], message?: string) => {
      setSteps(current => 
        current.map(step => 
          step.id === id ? { ...step, status, message } : step
        )
      );
    };
    
    // Clone/Extract
    updateStep("clone", "processing");
    await new Promise(resolve => setTimeout(resolve, 2000));
    updateStep("clone", "completed", "Successfully cloned repository");
    
    // Parse .gitignore
    updateStep("parse", "processing");
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateStep("parse", "completed", "Applied .gitignore rules");
    
    // Scan for secrets
    if (processingOptions.scanSecrets) {
      updateStep("scan", "processing");
      await new Promise(resolve => setTimeout(resolve, 1500));
      updateStep("scan", "completed", "Found 2 potential secrets");
    } else {
      updateStep("scan", "completed", "Skipped secret scanning");
    }
    
    // Format code
    if (processingOptions.removeComments || processingOptions.removeWhitespace) {
      updateStep("format", "processing");
      await new Promise(resolve => setTimeout(resolve, 1200));
      updateStep("format", "completed", "Code formatted successfully");
    } else {
      updateStep("format", "completed", "Skipped code formatting");
    }
    
    // Count tokens
    updateStep("count", "processing");
    await new Promise(resolve => setTimeout(resolve, 800));
    updateStep("count", "completed", "Counted 150,000 tokens across 120 files");
    
    // Generate XML
    updateStep("generate", "processing");
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateStep("generate", "completed", "XML generated successfully");
  };
  
  // Mock function to handle download
  const handleDownload = () => {
    console.log("Downloading result file");
    // In a real implementation, this would download the file from your API
    
    // For demo purposes, create a simple XML file
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
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
    <total_files_processed>120</total_files_processed>
    <total_token_count>150000</total_token_count>
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
</repository_summary>`;
    
    // Create a Blob and download it
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "repository-summary.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-b from-background to-card">
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-primary animate-float inline-block">
            Git Gobbler
          </h1>
          <p className="text-xl text-muted-foreground">
            Devouring repositories, optimizing code for LLM consumption
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full my-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Methods */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <CardHeader>
              <CardTitle>GitHub Repository</CardTitle>
              <CardDescription>
                Enter a public GitHub repository URL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GithubUrlInput
                onSubmit={handleGithubUrlSubmit}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <CardHeader>
              <CardTitle>Upload Archive</CardTitle>
              <CardDescription>Upload a .zip or .tar.gz file</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload onUpload={handleFileUpload} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>

        <ProcessingOptions onChange={setProcessingOptions} />

        {jobId && (
          <div className="transform hover:scale-[1.01] transition-transform duration-300">
            <ProcessingStatus jobId={jobId} steps={steps} error={error} />
          </div>
        )}

        {isComplete && !error && (
          <DownloadResult
            resultInfo={mockResultInfo}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
}