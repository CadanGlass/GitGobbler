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
    <Card>
      <CardHeader>
        <CardTitle>Processing Complete</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Filename</p>
            <p className="font-medium">{resultInfo.filename}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">File Size</p>
            <p className="font-medium">{formatFileSize(resultInfo.fileSize)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Token Count</p>
            <p className="font-medium">{resultInfo.tokenCount.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Files Processed</p>
            <p className="font-medium">{resultInfo.fileCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Generated At</p>
            <p className="font-medium">
              {new Date(resultInfo.generatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <Button onClick={onDownload} className="w-full md:w-auto">
          Download XML File
        </Button>
      </CardContent>
    </Card>
  );
}