import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ProcessingOptions {
  removeComments: boolean;
  removeWhitespace: boolean;
  scanSecrets: boolean;
  useGitignore: boolean;
}

interface ProcessingOptionsProps {
  onChange: (options: ProcessingOptions) => void;
}

export function ProcessingOptions({ onChange }: ProcessingOptionsProps) {
  const [options, setOptions] = useState<ProcessingOptions>({
    removeComments: false,
    removeWhitespace: false,
    scanSecrets: true,
    useGitignore: true,
  });

  const handleOptionChange = (option: keyof ProcessingOptions) => {
    const newOptions = {
      ...options,
      [option]: !options[option],
    };
    setOptions(newOptions);
    onChange(newOptions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptionButton
            label="Remove Comments"
            description="Strip comments from code files"
            active={options.removeComments}
            onClick={() => handleOptionChange("removeComments")}
          />
          <OptionButton
            label="Remove Whitespace"
            description="Strip excessive whitespace"
            active={options.removeWhitespace}
            onClick={() => handleOptionChange("removeWhitespace")}
          />
          <OptionButton
            label="Scan for Secrets"
            description="Detect potential secrets/API keys"
            active={options.scanSecrets}
            onClick={() => handleOptionChange("scanSecrets")}
          />
          <OptionButton
            label="Use .gitignore"
            description="Respect .gitignore files"
            active={options.useGitignore}
            onClick={() => handleOptionChange("useGitignore")}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface OptionButtonProps {
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

function OptionButton({
  label,
  description,
  active,
  onClick,
}: OptionButtonProps) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      className="h-auto justify-start p-4 w-full"
      onClick={onClick}
    >
      <div className="flex flex-col items-start">
        <span className="font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </Button>
  );
}