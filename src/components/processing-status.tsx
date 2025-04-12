import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ProcessingStep = {
  id: string;
  label: string;
  status: "pending" | "processing" | "completed" | "error";
  message?: string;
};

interface ProcessingStatusProps {
  jobId: string | null;
  steps: ProcessingStep[];
  error?: string | null;
}

export function ProcessingStatus({ jobId, steps, error }: ProcessingStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Processing Status
          {jobId && (
            <span className="text-xs text-muted-foreground">
              Job ID: {jobId}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
            <p className="text-red-800 dark:text-red-300 text-sm">
              Error: {error}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-4">
                <StatusIcon status={step.status} />
                <div className="flex-1">
                  <div className="font-medium">{step.label}</div>
                  {step.message && (
                    <div className="text-xs text-muted-foreground">
                      {step.message}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatusIcon({ status }: { status: ProcessingStep["status"] }) {
  switch (status) {
    case "pending":
      return (
        <div className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
      );
    case "processing":
      const loadingMessages = ["Gobbling", "Tasty", "Scrumptious", "Delectable", "Yummy", "Savoring", "Digesting", "Munching"];
      const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      return (
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-2" />
          <div className="text-xs text-blue-500 animate-pulse">{randomMessage}...</div>
        </div>
      );
    case "completed":
      return (
        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      );
    case "error":
      return (
        <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      );
  }
}