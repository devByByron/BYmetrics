import { useState } from "react";
import { TextAnalysisInput } from "@/components/TextAnalysisInput";
import { SentimentResults, type SentimentResult } from "@/components/SentimentResults";
import { SentimentMeter } from "@/components/SentimentMeter";
import { analyzeWithHuggingFace, analyzeWithVader, analyzeWithAWSComprehend } from "@/lib/sentiment";
import { Brain, Cpu, Zap, BarChart3 } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Sentiment Pulse
              </h1>
              <p className="text-muted-foreground">
                Multi-source sentiment analysis dashboard
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <TextAnalysisInput 
              onAnalyze={handleAnalyze} 
              isAnalyzing={isAnalyzing}
              className="mb-6"
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
            <div className="bg-gradient-card shadow-card-custom border border-border/50 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-foreground">Analysis Methods</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Hugging Face - AI transformer model</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-sentiment-neutral" />
                  <span className="text-muted-foreground">VADER - Rule-based analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-sentiment-positive" />
                  <span className="text-muted-foreground">AWS Comprehend - Cloud service</span>
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