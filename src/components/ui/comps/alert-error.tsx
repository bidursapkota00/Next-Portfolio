import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function FormMessageError({ error = "" }: { error?: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription
        dangerouslySetInnerHTML={{ __html: error }}
      ></AlertDescription>
    </Alert>
  );
}
