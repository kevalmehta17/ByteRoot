"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_DRUGS = 3;

export default function DrugInteractionChecker() {
  const [medicines, setMedicines] = useState<string[]>(
    Array(MAX_DRUGS).fill("")
  );
  const [isLoading, setIsLoading] = useState(false);
  //   const [interactionResult, setInteractionResult] =
  //     useState<DrugInteractionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // This function will handle the change in medicine input fields
  const handleMedicineChange = (index: number, value: string) => {
    const newMedicines = [...medicines];
    newMedicines[index] = value;
    setMedicines(newMedicines);
  };

  const handleSubmit = () => {};

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-semibold text-foreground drop-shadow-sm">
        AI Drug Interaction Checker (Beta)
      </h1>
      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            Enter Medicines
          </CardTitle>
          <CardDescription>
            Enter 2 to 3 medicine names to check the potential interactions.This
            tool is powered by AI and does not replace professional medical
            advice.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {medicines.map((med, index) => (
              <div key={index}>
                <Label
                  htmlFor={`medicine-${index + 1}`}
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Medicine {index + 1} {index >= 2 ? "(optional)" : ""}
                </Label>
                <Input
                  id={`medicine-${index + 1}`}
                  type="text"
                  value={med}
                  onChange={(e) => {
                    handleMedicineChange(index, e.target.value);
                  }}
                  placeholder={`e.g., Aspirin, Metformin${
                    index >= 2 ? " (optional)" : ""
                  }`}
                ></Input>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={
                isLoading || medicines.filter((m) => m.trim() !== "").length < 2
              }
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                  Checking Interactions...
                </>
              ) : (
                <>
                  <Icons.search className="mr-2 h-4 w-4" />
                  Check Interactions
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* This will show the Error message if the medicine interaction is bad */}
      {error && (
        <Alert variant={"destructive"} className="max-w-2xl mx-auto">
          <Icons.alertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* This will show the interaction result if available */}
      {/* {interactionResult && (
        <Card
          className={`shadow-lg max-w-2xl mx-auto mt-8 ${
            interactionResult.isRisky
              ? "border-destructive"
              : "border-primary/30"
          }`}
        >
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              {interactionResult.isRisky ? (
                <Icons.alertTriangle className="h-6 w-6 text-destructive" />
              ) : (
                <Icons.shieldCheck className="h-6 w-6 text-green-600" />
              )}
              Interaction Analysis Result
            </CardTitle>
            <CardDescription>{interactionResult.summary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {interactionResult.isRisky && (
              <Alert variant="destructive">
                <Icons.alertTriangle className="h-4 w-4" />
                <AlertTitle>Potential Risk Detected!</AlertTitle>
                <AlertDescription>
                  The AI has identified potentially significant interactions.
                  Please review the details carefully and consult a healthcare
                  professional.
                </AlertDescription>
              </Alert>
            )}
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                Details:
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap p-4 bg-muted/50 rounded-md">
                {interactionResult.interactionDetails}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This AI-generated analysis is for
              informational purposes only and does not constitute medical
              advice. Always consult with a qualified healthcare professional
              for any health concerns or before making any decisions related to
              your health or medications.
            </p>
          </CardFooter>
        </Card>
      )} */}
    </div>
  );
}
