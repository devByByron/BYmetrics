import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Brain, Zap, Sparkles } from "lucide-react";
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
    <Card className={cn("bg-gradient-glass border-border-elevated shadow-large backdrop-blur-glass", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          <div className="relative">
            <Brain className="h-7 w-7 text-primary" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent animate-pulse" />
          </div>
          Sentiment Analysis
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Analyze text sentiment using multiple AI models for comprehensive insights
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label htmlFor="analysis-text" className="text-sm font-medium text-foreground flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" />
            Enter text to analyze
          </label>
          <Textarea
            id="analysis-text"
            placeholder="Type or paste your text here to get started with sentiment analysis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[140px] bg-input border-border-elevated focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none transition-smooth text-foreground placeholder:text-muted-foreground"
            disabled={isAnalyzing}
          />
        </div>

        <Button 
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzing}
          className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-base font-semibold relative overflow-hidden group"
          size="lg"
        >
          <div className="absolute inset-0 bg-gradient-primary-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-5 w-5" />
              Analyze Sentiment
            </>
          )}
        </Button>

        <div className="pt-4 border-t border-border-elevated">
          <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            Try these sample texts:
          </p>
          <div className="grid gap-3">
            {sampleTexts.map((sample, index) => (
              <button
                key={index}
                onClick={() => setText(sample)}
                disabled={isAnalyzing}
                className="w-full text-left p-4 text-sm bg-muted-elevated/50 hover:bg-muted-elevated border border-border hover:border-border-elevated rounded-xl transition-all duration-200 disabled:opacity-50 hover:shadow-medium group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-foreground-muted group-hover:text-foreground transition-colors">{sample}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};