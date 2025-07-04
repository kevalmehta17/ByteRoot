"use client";

import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getSymptomBasedAdvice,
  type SymptomBasedAdviceOutput,
} from "@/ai/flows/symptom-based-advice"; // GenAI flow
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, type FormEvent } from "react";

export default function SymptomCheckerPage() {
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adviceResult, setAdviceResult] =
    useState<SymptomBasedAdviceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "No symptoms entered",
        description: "Please describe your symptoms.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAdviceResult(null);
    setError(null);

    try {
      const result = await getSymptomBasedAdvice({ symptoms });
      setAdviceResult(result);
    } catch (err) {
      console.error("Error in symptom-based advice:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Failed to Get Advice",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-semibold text-foreground drop-shadow-sm">
        Symptom Checker (AI Beta)
      </h1>

      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <Icons.symptomChecker className="h-6 w-6 text-primary" /> Describe
            Your Symptoms
          </CardTitle>
          <CardDescription>
            Enter your symptoms below for AI-powered preliminary advice. This
            tool is for informational purposes and not a substitute for
            professional medical consultation.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div>
              <Label
                htmlFor="symptoms-input"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Your Symptoms
              </Label>
              <Textarea
                id="symptoms-input"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., I have a persistent cough, fever, and body aches..."
                rows={6}
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading || !symptoms.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> Getting
                  Advice...
                </>
              ) : (
                <>
                  <Icons.search className="mr-2 h-4 w-4" /> Get AI Advice
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <Icons.alertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {adviceResult && (
        <Card className="shadow-lg max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Icons.diagnosis className="h-6 w-6 text-primary" /> AI-Generated
              Advice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                Basic Safety Measures:
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {adviceResult.safetyMeasures}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                Suggested Next Steps:
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {adviceResult.nextSteps}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This AI-generated advice is for
              informational purposes only. It is not a medical diagnosis. Always
              consult with a qualified healthcare professional for any health
              concerns or before making any decisions related to your health.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
