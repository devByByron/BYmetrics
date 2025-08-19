import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Zap, BarChart3 } from "lucide-react";
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
      <Card className={cn("bg-gradient-glass border-border-elevated shadow-medium backdrop-blur-glass", className)}>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gradient-primary/20 flex items-center justify-center">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-foreground font-medium mb-1">Ready for Analysis</p>
            <p className="text-muted-foreground text-sm">Enter text above to see detailed sentiment analysis results</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-gradient-primary rounded-full" />
        <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Analysis Results
        </h3>
      </div>
      
      {results.map((result, index) => (
        <Card key={index} className="bg-gradient-glass border-border-elevated shadow-medium backdrop-blur-glass hover:shadow-large transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 rounded-lg bg-muted-elevated/50">
                {result.icon}
              </div>
              <div>
                <div className="font-semibold text-foreground">{result.source}</div>
                <div className="text-xs text-muted-foreground font-normal">AI Analysis Engine</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted-elevated/30 border border-border">
              <span className="text-sm font-medium text-muted-foreground">Detected Sentiment</span>
              <Badge 
                variant="outline"
                className={cn(
                  "font-semibold px-3 py-1 text-xs border-2 backdrop-blur-sm",
                  result.sentiment === 'positive' && "border-sentiment-positive text-sentiment-positive bg-sentiment-positive-glass shadow-sm",
                  result.sentiment === 'neutral' && "border-sentiment-neutral text-sentiment-neutral bg-sentiment-neutral-glass shadow-sm",
                  result.sentiment === 'negative' && "border-sentiment-negative text-sentiment-negative bg-sentiment-negative-glass shadow-sm"
                )}
              >
                {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Confidence Level</span>
                <span className="text-lg font-bold text-foreground">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="relative">
                <div className="h-2 bg-muted-elevated rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-700 ease-out rounded-full",
                      result.sentiment === 'positive' && "bg-gradient-to-r from-sentiment-positive to-sentiment-positive-bright",
                      result.sentiment === 'neutral' && "bg-gradient-to-r from-sentiment-neutral to-sentiment-neutral-bright",
                      result.sentiment === 'negative' && "bg-gradient-to-r from-sentiment-negative to-sentiment-negative-bright"
                    )}
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {result.scores && (
              <div className="pt-4 border-t border-border-elevated">
                <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Detailed Breakdown
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-sentiment-positive-glass border border-sentiment-positive/20">
                    <div className="text-lg font-bold text-sentiment-positive mb-1">
                      {(result.scores.positive * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-sentiment-positive/80 font-medium">Positive</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-sentiment-neutral-glass border border-sentiment-neutral/20">
                    <div className="text-lg font-bold text-sentiment-neutral mb-1">
                      {(result.scores.neutral * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-sentiment-neutral/80 font-medium">Neutral</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-sentiment-negative-glass border border-sentiment-negative/20">
                    <div className="text-lg font-bold text-sentiment-negative mb-1">
                      {(result.scores.negative * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-sentiment-negative/80 font-medium">Negative</div>
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