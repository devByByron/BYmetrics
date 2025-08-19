import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SentimentMeterProps {
  positive: number;
  neutral: number;
  negative: number;
  className?: string;
}

export const SentimentMeter = ({ positive, neutral, negative, className }: SentimentMeterProps) => {
  const total = positive + neutral + negative;
  const posPercentage = total > 0 ? (positive / total) * 100 : 0;
  const neuPercentage = total > 0 ? (neutral / total) * 100 : 0;
  const negPercentage = total > 0 ? (negative / total) * 100 : 0;

  const getDominantSentiment = () => {
    if (positive > neutral && positive > negative) return 'positive';
    if (negative > neutral && negative > positive) return 'negative';
    return 'neutral';
  };

  const dominant = getDominantSentiment();

  return (
    <Card className={cn("bg-gradient-card shadow-card-custom border-border/50", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
          Sentiment Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-sentiment-positive">Positive</span>
            <span className="text-sm font-bold text-sentiment-positive">{posPercentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={posPercentage} 
            className="h-2 bg-sentiment-positive-bg"
            style={{
              background: 'hsl(var(--sentiment-positive-bg))'
            }}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-sentiment-neutral">Neutral</span>
            <span className="text-sm font-bold text-sentiment-neutral">{neuPercentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={neuPercentage} 
            className="h-2 bg-sentiment-neutral-bg"
            style={{
              background: 'hsl(var(--sentiment-neutral-bg))'
            }}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-sentiment-negative">Negative</span>
            <span className="text-sm font-bold text-sentiment-negative">{negPercentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={negPercentage} 
            className="h-2 bg-sentiment-negative-bg"
            style={{
              background: 'hsl(var(--sentiment-negative-bg))'
            }}
          />
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Overall Sentiment</span>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold",
              dominant === 'positive' && "bg-sentiment-positive-bg text-sentiment-positive",
              dominant === 'neutral' && "bg-sentiment-neutral-bg text-sentiment-neutral",
              dominant === 'negative' && "bg-sentiment-negative-bg text-sentiment-negative"
            )}>
              {dominant.charAt(0).toUpperCase() + dominant.slice(1)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};