import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Brain, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextAnalysisInputProps {
  onAnalyze: (text: string) => Promise<void>;
  isAnalyzing: boolean;
  className?: string;
}

export const TextAnalysisInput = ({ onAnalyze, isAnalyzing, className }: TextAnalysisInputProps) => {
  const [text, setText] = useState("");

  const handleAnalyze = async () => {
    if (text.trim()) {
      await onAnalyze(text);
    }
  };

  const sampleTexts = [
    "I absolutely love this new product! It's amazing and exceeded all my expectations.",
    "The service was okay, nothing special but not terrible either.",
    "This is the worst experience I've ever had. Completely disappointed and frustrated."
  ];

  return (
    <Card className={cn("bg-gradient-card shadow-card-custom border-border/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          <Brain className="h-6 w-6 text-primary" />
          Sentiment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="analysis-text" className="text-sm font-medium text-foreground">
            Enter text to analyze
          </label>
          <Textarea
            id="analysis-text"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] bg-input/50 border-border/50 focus:border-primary/50 resize-none"
            disabled={isAnalyzing}
          />
        </div>

        <Button 
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzing}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Analyze Sentiment
            </>
          )}
        </Button>

        <div className="pt-4 border-t border-border/50">
          <p className="text-sm font-medium text-muted-foreground mb-3">Try these sample texts:</p>
          <div className="space-y-2">
            {sampleTexts.map((sample, index) => (
              <button
                key={index}
                onClick={() => setText(sample)}
                disabled={isAnalyzing}
                className="w-full text-left p-3 text-sm bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/30 transition-colors disabled:opacity-50"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};