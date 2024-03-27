import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function FormMessageSuccess({ success = "" }: { success?: string }) {
  return (
    <Alert variant="success">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>{success}</AlertDescription>
    </Alert>
  );
}
