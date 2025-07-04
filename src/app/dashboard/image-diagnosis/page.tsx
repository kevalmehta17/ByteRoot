"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import {
  imageBasedDiagnosis,
  type ImageBasedDiagnosisOutput,
} from "@/ai/flows/image-based-diagnosis"; // GenAI flow
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ImageDiagnosisPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // This will hold the data URI for image or PDF
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] =
    useState<ImageBasedDiagnosisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setDiagnosisResult(null);
      setError(null);
      // Uses FileReader to convert file into base64 preview (data URI).
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Store data URI for both image and PDF
      };

      reader.readAsDataURL(file);
      // FileReader is a built-in Web API that reads the content of files. The readAsDataURL method specifically converts the file into a base64 data URL string, which can then be used to display images or PDFs directly in the browser.
      //
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!imageFile || !imagePreview) {
      toast({
        title: "No file selected",
        description: "Please upload an image or PDF file for analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setDiagnosisResult(null);
    setError(null);

    try {
      const result = await imageBasedDiagnosis({ fileDataUri: imagePreview });
      setDiagnosisResult(result);
    } catch (err) {
      console.error("Error in file diagnosis:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
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
        Image &amp; PDF Diagnosis (AI Beta)
      </h1>

      <Card className="shadow-lg max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <Icons.analysis className="h-6 w-6 text-primary " /> Upload Medical
            Image or PDF
          </CardTitle>
          <CardDescription>
            Upload an X-ray, CT scan, lab report (PDF), or other medical file
            for a preliminary AI-powered analysis. This tool is for
            informational purposes only and does not replace professional
            medical advice.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <Label
                htmlFor="file-upload"
                className="block text-md font-medium text-foreground mb-2"
              >
                Select Image or PDF File
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="file:mr-4 mt-1 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>

            {imagePreview && imageFile && (
              <div className="mt-4 border border-dashed border-border rounded-lg p-4 flex flex-col items-center">
                {imageFile.type.startsWith("image/") ? (
                  <Image
                    src={imagePreview}
                    alt="Image preview"
                    width={300}
                    height={300}
                    className="rounded-md object-contain max-h-[300px]"
                    data-ai-hint="medical scan"
                  />
                ) : imageFile.type === "application/pdf" ? (
                  <div className="flex flex-col items-center text-center py-4">
                    <Icons.filePdf className="h-20 w-20 text-destructive" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {imageFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (PDF content will be analyzed by AI)
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    File preview not available for this type.
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  {imageFile?.name} (
                  {(imageFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={!imageFile || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Analyzing File...
                </>
              ) : (
                <>
                  <Icons.search className="mr-2 h-4 w-4" /> Get AI Analysis
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

      {diagnosisResult && (
        <Card className="shadow-lg max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Icons.diagnosis className="h-6 w-6 text-primary" /> AI Analysis
              Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                Preliminary Interpretation / Diagnosis:
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {diagnosisResult.diagnosis}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                Recommendations &amp; Next Steps:
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {diagnosisResult.recommendations}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This AI-generated analysis is
              preliminary and for informational purposes only. Always consult
              with a qualified healthcare professional for accurate medical
              advice and treatment.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
