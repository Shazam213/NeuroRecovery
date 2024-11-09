import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CognitiveAssessment = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const getScoresFromStorage = () => {
    const mentalMathLevels = parseInt(localStorage.getItem('playerScore')) || 0;
    const reactionTime = parseInt(localStorage.getItem('reactionTime')) || 0;
    const memoryLevels = parseInt(localStorage.getItem('sequence')) || 0;
    const oneToFiftyTime = parseInt(localStorage.getItem('oneToFifty')) || 0;
    const sevenTilesMemoryLevels = parseInt(localStorage.getItem('playerScores')) || 0;

    // Calculate derived scores
    const visuospatialExecutive = mentalMathLevels >= 10 ? 6 : 
                                 mentalMathLevels >= 8 ? 5 : 
                                 mentalMathLevels >= 6 ? 4 : 
                                 mentalMathLevels >= 4 ? 3 : 
                                 mentalMathLevels >= 2 ? 2 : 1;

    const attention = oneToFiftyTime <= 30 ? 7 : 
                     oneToFiftyTime <= 45 ? 6 : 
                     oneToFiftyTime <= 60 ? 5 : 
                     oneToFiftyTime <= 75 ? 4 : 
                     oneToFiftyTime <= 90 ? 3 : 
                     oneToFiftyTime <= 105 ? 2 : 1;

    const processingSpeed = reactionTime < 300 ? 5 : 
                          reactionTime <= 400 ? 4 : 
                          reactionTime <= 500 ? 3 : 
                          reactionTime <= 600 ? 2 : 1;

    const memory = memoryLevels >= 10 ? 6 : 
                  memoryLevels >= 8 ? 5 : 
                  memoryLevels >= 6 ? 4 : 
                  memoryLevels >= 4 ? 3 : 
                  memoryLevels >= 2 ? 2 : 1;

    const shortTermRecall = sevenTilesMemoryLevels >= 7 ? 6 : 
                           sevenTilesMemoryLevels >= 6 ? 5 : 
                           sevenTilesMemoryLevels >= 5 ? 4 : 
                           sevenTilesMemoryLevels >= 4 ? 3 : 
                           sevenTilesMemoryLevels >= 3 ? 2 : 1;

    return {
      visuospatialExecutive,
      attention,
      memory,
      processingSpeed,
      shortTermRecall,
      raw: {
        mentalMathLevels,
        oneToFiftyTime,
        memoryLevels,
        reactionTime,
        sevenTilesMemoryLevels
      }
    };
  };

  const handleAnalysis = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    const scores = getScoresFromStorage();
    const scoresString = `
      Visuospatial Executive: ${scores.visuospatialExecutive}/6
      Attention: ${scores.attention}/7
      Memory: ${scores.memory}/6
      Processing Speed: ${scores.processingSpeed}/5
      Short-term Recall: ${scores.shortTermRecall}/6
    `;

    try {
        const response = await axios.post(
            "https://api.vultrinference.com/v1/chat/completions",  // Verify this URL with the API documentation
            {
              model: "llama2-13b-chat-Q5_K_M", // Replace with actual model ID
              messages: [
                {
                  role: "system",
                  content:"You are an expert cognitive therapist and medical AI assistant. I will provide you with cognitive assessment test scores of a patient in various cognitive domains. Your task is to Identify potential cognitive impairments based on the scores in each domain.Suggest two targeted cognitive exercises or activities for each impairment to help improve the patient's cognitive function.Please provide the output in the following HTML structure, where each impairment has an associated list of exercises: <div><h2>Impairment: [Cognitive impairment detected]</h2><ul><li><strong>Exercise 1:</strong> [Detailed description with step-by-step guide]</li><li><strong>Exercise 2:</strong> [Detailed description with step-by-step guide]</li></ul></div> Example Interpretation:For a low score in Delayed Recall (e.g., 1/5), you may detect that the patient has difficulty with memory recall and suggest exercises accordingly.Analyze these scores based on typical cognitive analysis scoring thresholds. For each domain where the patient scores below the maximum, identify specific cognitive impairment(s) they may have. Suggest two exercises for each impairment that would be beneficial in strengthening the patient’s cognitive abilities in these areas. Make sure the exercises are widely recommended for this type of impairment.Here are the patient’s cognitive analysis scores: {scores}Please analyze and respond in the structured HTML format provided. Only include exercises and impairments where cognitive analysis scores are below the threshold, indicating the patient requires treatment.No need to sy things like sure i am happy to help and these are my findings directly put the"
                },
                {
                  role: "user",
                  content: scoresString
                }
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": "3FPMOECYMWFQKXNJKZNI2SXTLRNXCOFR5YRA" // Replace with your actual API Key
              }
            }
          );

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    const content = response.data.choices[0]?.message?.content;
    localStorage.setItem('analysis',JSON.stringify(content))
    navigate('/exercises')
    } catch (err) {
      setError("An error occurred while analyzing the scores. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Cognitive Assessment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Current Scores</h3>
              <div className="space-y-2">
                {Object.entries(getScoresFromStorage().raw).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Normalized Scores</h3>
              <div className="space-y-2">
                {Object.entries(getScoresFromStorage()).map(([key, value]) => (
                  key !== 'raw' && (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          <Button 
            onClick={handleAnalysis} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Scores"
            )}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          
        </div>
      </CardContent>
    </Card>
  );
};

export default CognitiveAssessment;