import { pipeline } from "@huggingface/transformers";

// Initialize the sentiment analysis pipeline
let sentimentPipeline: any = null;

export async function initializeSentimentAnalysis() {
  if (!sentimentPipeline) {
    try {
      sentimentPipeline = await pipeline(
        "sentiment-analysis",
        "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
      );
    } catch (error) {
      console.error("Failed to initialize sentiment analysis:", error);
      throw error;
    }
  }
  return sentimentPipeline;
}

export async function analyzeWithHuggingFace(text: string) {
  try {
    const pipeline = await initializeSentimentAnalysis();
    const result = await pipeline(text);
    
    // Transform the result to our format
    const sentiment = result[0];
    const isPositive = sentiment.label === 'POSITIVE';
    
    return {
      sentiment: isPositive ? 'positive' as const : 'negative' as const,
      confidence: sentiment.score,
      scores: {
        positive: isPositive ? sentiment.score : 1 - sentiment.score,
        negative: isPositive ? 1 - sentiment.score : sentiment.score,
        neutral: 0.1 // Approximate neutral score
      }
    };
  } catch (error) {
    console.error("Hugging Face analysis failed:", error);
    throw error;
  }
}

// Simple VADER-like sentiment analysis implementation
export function analyzeWithVader(text: string) {
  // Simplified sentiment analysis based on word polarity
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome', 
    'love', 'like', 'enjoy', 'happy', 'pleased', 'satisfied', 'perfect', 'best',
    'brilliant', 'outstanding', 'superb', 'magnificent', 'incredible', 'fabulous'
  ];
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'worst', 'poor',
    'disappointing', 'frustrated', 'angry', 'sad', 'upset', 'disgusting', 'pathetic',
    'useless', 'worthless', 'nightmare', 'disaster', 'ridiculous', 'stupid'
  ];

  const words = text.toLowerCase().split(/\W+/);
  let positiveScore = 0;
  let negativeScore = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveScore += 1;
    } else if (negativeWords.includes(word)) {
      negativeScore += 1;
    }
  });

  const totalWords = words.length;
  const normalizedPositive = positiveScore / Math.max(totalWords, 1);
  const normalizedNegative = negativeScore / Math.max(totalWords, 1);
  const neutral = Math.max(0, 1 - normalizedPositive - normalizedNegative);

  let sentiment: 'positive' | 'negative' | 'neutral';
  let confidence: number;

  if (normalizedPositive > normalizedNegative && normalizedPositive > neutral) {
    sentiment = 'positive';
    confidence = Math.min(normalizedPositive * 3, 1);
  } else if (normalizedNegative > normalizedPositive && normalizedNegative > neutral) {
    sentiment = 'negative';
    confidence = Math.min(normalizedNegative * 3, 1);
  } else {
    sentiment = 'neutral';
    confidence = Math.max(neutral, 0.5);
  }

  return {
    sentiment,
    confidence,
    scores: {
      positive: normalizedPositive,
      negative: normalizedNegative,
      neutral
    }
  };
}

// Mock AWS Comprehend analysis (would require backend implementation)
export function analyzeWithAWSComprehend(text: string) {
  // This is a mock implementation
  // In a real application, this would make an API call to AWS Comprehend
  const textLength = text.length;
  const hasPositiveKeywords = /good|great|excellent|amazing|love|perfect/i.test(text);
  const hasNegativeKeywords = /bad|terrible|awful|hate|worst|horrible/i.test(text);
  
  let sentiment: 'positive' | 'negative' | 'neutral';
  let confidence: number;
  
  if (hasPositiveKeywords && !hasNegativeKeywords) {
    sentiment = 'positive';
    confidence = 0.85;
  } else if (hasNegativeKeywords && !hasPositiveKeywords) {
    sentiment = 'negative';
    confidence = 0.85;
  } else if (hasPositiveKeywords && hasNegativeKeywords) {
    sentiment = 'neutral';
    confidence = 0.7;
  } else {
    sentiment = 'neutral';
    confidence = 0.6;
  }
  
  return {
    sentiment,
    confidence,
    scores: {
      positive: sentiment === 'positive' ? confidence : 0.2,
      negative: sentiment === 'negative' ? confidence : 0.2,
      neutral: sentiment === 'neutral' ? confidence : 0.6
    }
  };
}