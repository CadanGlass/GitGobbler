import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export function FileUpload({ onUpload, isLoading = false }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    if (!file) {
      setError("Please select a file");
      return false;
    }

    // Check if the file is a zip or tar.gz
    const allowedExtensions = [".zip", ".tar.gz"];
    const fileExtension = file.name.substring(file.name.lastIndexOf("."));
    if (!allowedExtensions.includes(fileExtension)) {
      setError("Only .zip and .tar.gz files are allowed");
      return false;
    }

    // Max file size (e.g., 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      setError("File size exceeds the limit (100MB)");
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      validateFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && validateFile(selectedFile)) {
      onUpload(selectedFile);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={openFileSelector}
          disabled={isLoading}
        >
          Select File
        </Button>
        
        {selectedFile && (
          <Button 
            onClick={handleUpload}
            disabled={isLoading || !!error}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip,.tar.gz"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      {selectedFile && !error && (
        <p className="text-sm text-green-500">
          Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
        </p>
      )}
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}