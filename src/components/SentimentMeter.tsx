import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Activity } from "lucide-react";
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
    <Card className={cn("bg-gradient-glass border-border-elevated shadow-large backdrop-blur-glass", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Sentiment Distribution
        </CardTitle>
        <p className="text-muted-foreground text-sm">Real-time analysis breakdown</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Positive */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sentiment-positive shadow-sm" />
                <span className="text-sm font-medium text-sentiment-positive">Positive</span>
              </div>
              <span className="text-lg font-bold text-sentiment-positive">{posPercentage.toFixed(1)}%</span>
            </div>
            <div className="relative">
              <div className="h-3 bg-sentiment-positive-glass rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sentiment-positive to-sentiment-positive-bright transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${posPercentage}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Neutral */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sentiment-neutral shadow-sm" />
                <span className="text-sm font-medium text-sentiment-neutral">Neutral</span>
              </div>
              <span className="text-lg font-bold text-sentiment-neutral">{neuPercentage.toFixed(1)}%</span>
            </div>
            <div className="relative">
              <div className="h-3 bg-sentiment-neutral-glass rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sentiment-neutral to-sentiment-neutral-bright transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${neuPercentage}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Negative */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sentiment-negative shadow-sm" />
                <span className="text-sm font-medium text-sentiment-negative">Negative</span>
              </div>
              <span className="text-lg font-bold text-sentiment-negative">{negPercentage.toFixed(1)}%</span>
            </div>
            <div className="relative">
              <div className="h-3 bg-sentiment-negative-glass rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sentiment-negative to-sentiment-negative-bright transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${negPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-elevated">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Overall Sentiment</span>
            </div>
            <div className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold border backdrop-blur-sm transition-all duration-300",
              dominant === 'positive' && "bg-sentiment-positive-glass text-sentiment-positive border-sentiment-positive/20 shadow-sm",
              dominant === 'neutral' && "bg-sentiment-neutral-glass text-sentiment-neutral border-sentiment-neutral/20 shadow-sm",
              dominant === 'negative' && "bg-sentiment-negative-glass text-sentiment-negative border-sentiment-negative/20 shadow-sm"
            )}>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                {dominant.charAt(0).toUpperCase() + dominant.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};