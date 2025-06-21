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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import React, { useState, type FormEvent } from "react";

const supportedLanguages = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "हिन्दी (Hindi)" },
  { value: "Spanish", label: "Español (Spanish)" },
  { value: "French", label: "Français (French)" },
  { value: "German", label: "Deutsch (German)" },
  { value: "Chinese", label: "中文 (Chinese)" },
];

export default function ReportSimplifierPage() {
  const [reportText, setReportText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);
  // const [simplifiedReport, setSimplifiedReport] = useState<SimplifyReportOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!reportText.trim()) {
      toast({
        title: "No report text entered",
        description: "Please paste or type your medical report.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // setSimplifiedReport(null);
    // setError(null);

    // try {
    //   const result = await simplifyReport({
    //     reportText,
    //     language: targetLanguage,
    //   });
    //   setSimplifiedReport(result);
    // } catch (err) {
    //   console.error("Error in report simplification:", err);
    //   const errorMessage =
    //     err instanceof Error ? err.message : "An unknown error occurred.";
    //   setError(errorMessage);
    //   toast({
    //     title: "Failed to Simplify Report",
    //     description: errorMessage,
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="space-y-8">
      <h1 className="font-headline font-semibold text-3xl text-foreground drop-shadow-sm">
        Report Simplifier & Translator (AI Beta)
      </h1>
      <Card className="shadow-lg max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            Understand your Medical Report
          </CardTitle>
          <CardDescription>
            Paste your complex medical report below. Our AI will simplify it and
            translate it into your preferred language. This tool is for
            informational purposes and not a substitute for professional medical
            advice.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <Label
                htmlFor="report-text-input"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Medical Report text
              </Label>
              <Textarea
                id="report-text-input"
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Paste your medical report text here..."
                rows={10}
                className="min-h-[200px]"
              ></Textarea>
            </div>
            <div>
              <Label
                htmlFor="target-language"
                className="text-sm block font-medium text-foreground mb-1"
              >
                Target Language for Summary
              </Label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger
                  id="target-language"
                  className="w-full md:w-[280px]"
                >
                  <SelectValue placeholder="Select Language"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {supportedLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading || !reportText.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                  Simplifying...
                </>
              ) : (
                <>
                  <Icons.search className="mr-2 h-4 w-4" />
                  Simplify & Translate Report
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <Icons.alertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* {simplifiedReport && (
        <Card className="shadow-lg max-w-3xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Icons.translate className="h-6 w-6 text-primary" /> Simplified
              Report
            </CardTitle>
            <CardDescription>
              Language:{" "}
              {supportedLanguages.find((l) => l.value === targetLanguage)
                ?.label || targetLanguage}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                Simplified Summary:
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap p-4 bg-muted/50 rounded-md">
                {simplifiedReport.summary}
              </p>
            </div>
            {simplifiedReport.translation &&
              targetLanguage.toLowerCase() !== "english" && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      Translation (
                      {supportedLanguages.find(
                        (l) => l.value === targetLanguage
                      )?.label || targetLanguage}
                      ):
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-wrap p-4 bg-muted/50 rounded-md">
                      {simplifiedReport.translation}
                    </p>
                  </div>
                </>
              )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This AI-generated summary and
              translation is for informational purposes only. It is not a
              substitute for professional medical interpretation. Always discuss
              your report with a qualified healthcare professional.
            </p>
          </CardFooter>
        </Card>
      )} */}
    </div>
  );
}
