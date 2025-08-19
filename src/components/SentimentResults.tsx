import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SentimentResult {
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  scores?: {
    positive: number;
    negative: number;
    neutral: number;
  };
  icon: React.ReactNode;
}

interface SentimentResultsProps {
  results: SentimentResult[];
  className?: string;
}

export const SentimentResults = ({ results, className }: SentimentResultsProps) => {
  if (results.length === 0) {
    return (
      <Card className={cn("bg-gradient-card shadow-card-custom border-border/50", className)}>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Enter text above to see sentiment analysis results</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
        Analysis Results
      </h3>
      
      {results.map((result, index) => (
        <Card key={index} className="bg-gradient-card shadow-card-custom border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              {result.icon}
              {result.source}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Sentiment</span>
              <Badge 
                variant="outline"
                className={cn(
                  "font-semibold",
                  result.sentiment === 'positive' && "border-sentiment-positive text-sentiment-positive bg-sentiment-positive-bg",
                  result.sentiment === 'neutral' && "border-sentiment-neutral text-sentiment-neutral bg-sentiment-neutral-bg",
                  result.sentiment === 'negative' && "border-sentiment-negative text-sentiment-negative bg-sentiment-negative-bg"
                )}
              >
                {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Confidence</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      result.sentiment === 'positive' && "bg-sentiment-positive",
                      result.sentiment === 'neutral' && "bg-sentiment-neutral",
                      result.sentiment === 'negative' && "bg-sentiment-negative"
                    )}
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {result.scores && (
              <div className="pt-2 border-t border-border/30">
                <p className="text-xs font-medium text-muted-foreground mb-2">Detailed Scores</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-sentiment-positive font-semibold">
                      {(result.scores.positive * 100).toFixed(0)}%
                    </div>
                    <div className="text-muted-foreground">Positive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sentiment-neutral font-semibold">
                      {(result.scores.neutral * 100).toFixed(0)}%
                    </div>
                    <div className="text-muted-foreground">Neutral</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sentiment-negative font-semibold">
                      {(result.scores.negative * 100).toFixed(0)}%
                    </div>
                    <div className="text-muted-foreground">Negative</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};