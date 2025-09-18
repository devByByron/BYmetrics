import { useState } from "react";
import { TextAnalysisInput } from "@/components/TextAnalysisInput";
import { SentimentResults, type SentimentResult } from "@/components/SentimentResults";
import { SentimentMeter } from "@/components/SentimentMeter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { analyzeWithHuggingFace, analyzeWithVader, analyzeWithAWSComprehend } from "@/lib/sentiment";
import { Brain, Cpu, Zap, BarChart3, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [results, setResults] = useState<SentimentResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (text: string) => {
    setIsAnalyzing(true);
    setResults([]);

    try {
      const analyses = await Promise.allSettled([
        // Hugging Face analysis
        analyzeWithHuggingFace(text).then(result => ({
          source: "Hugging Face",
          ...result,
          icon: <Brain className="h-4 w-4 text-primary" />
        })),
        
        // VADER-like analysis
        Promise.resolve(analyzeWithVader(text)).then(result => ({
          source: "VADER Sentiment",
          ...result,
          icon: <Zap className="h-4 w-4 text-sentiment-neutral" />
        })),
        
        // Mock AWS Comprehend
        Promise.resolve(analyzeWithAWSComprehend(text)).then(result => ({
          source: "AWS Comprehend",
          ...result,
          icon: <Cpu className="h-4 w-4 text-sentiment-positive" />
        }))
      ]);

      const successfulResults: SentimentResult[] = [];
      
      analyses.forEach((analysis, index) => {
        if (analysis.status === 'fulfilled') {
          successfulResults.push(analysis.value);
        } else {
          console.error(`Analysis ${index} failed:`, analysis.reason);
        }
      });

      setResults(successfulResults);
      
      if (successfulResults.length > 0) {
        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed text with ${successfulResults.length} method${successfulResults.length > 1 ? 's' : ''}`,
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: "Unable to analyze the text. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Error",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Calculate aggregate sentiment for the meter
  const getAggregateSentiment = () => {
    if (results.length === 0) return { positive: 0, neutral: 0, negative: 0 };
    
    const totals = results.reduce((acc, result) => {
      if (result.scores) {
        acc.positive += result.scores.positive;
        acc.neutral += result.scores.neutral;
        acc.negative += result.scores.negative;
      }
      return acc;
    }, { positive: 0, neutral: 0, negative: 0 });

    const count = results.length;
    return {
      positive: totals.positive / count,
      neutral: totals.neutral / count,
      negative: totals.negative / count
    };
  };

  const aggregateSentiment = getAggregateSentiment();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-accent opacity-10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border-elevated bg-card-glass backdrop-blur-glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-md opacity-50" />
                <div className="relative p-3 rounded-xl bg-gradient-primary shadow-glow">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary-foreground animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  BYmetrics
                </h1>
                <p className="text-muted-foreground text-sm">
                  AI-powered multi-source sentiment analysis
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <TextAnalysisInput 
              onAnalyze={handleAnalyze} 
              isAnalyzing={isAnalyzing}
            />
            
            {/* Results */}
            <SentimentResults results={results} />
          </div>

          {/* Sidebar with Meter */}
          <div className="space-y-6">
            <SentimentMeter 
              positive={aggregateSentiment.positive}
              neutral={aggregateSentiment.neutral}
              negative={aggregateSentiment.negative}
            />
            
            {/* Info Card */}
            <div className="bg-gradient-glass border border-border-elevated rounded-xl p-6 shadow-medium backdrop-blur-glass">
              <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Analysis Methods
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted-elevated/30 border border-border">
                  <div className="p-2 rounded-lg bg-primary-glass">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Hugging Face</div>
                    <div className="text-muted-foreground text-xs">AI transformer model</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted-elevated/30 border border-border">
                  <div className="p-2 rounded-lg bg-sentiment-neutral-glass">
                    <Zap className="h-4 w-4 text-sentiment-neutral" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">VADER</div>
                    <div className="text-muted-foreground text-xs">Rule-based analysis</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted-elevated/30 border border-border">
                  <div className="p-2 rounded-lg bg-sentiment-positive-glass">
                    <Cpu className="h-4 w-4 text-sentiment-positive" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">AWS Comprehend</div>
                    <div className="text-muted-foreground text-xs">Cloud service</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;