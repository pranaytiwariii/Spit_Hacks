import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ToolRecommendations from "./ToolRecommendations";

export default function TextAi() {
  const [userResponses, setUserResponses] = useState({
    focus: "",
    categories: [],
    industry: "",
    metrics: [],
    integrations: "",
  });
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sampleData = [
    {
      Tool: "Google Cloud IoT",
      Score: 7.403348017621146,
      Accuracy: 9.0,
      Speed: 8.7,
      "Energy Efficiency": 9.2,
      "Carbon Footprint": 9.1,
      "Waste Reduction": 9.0,
      "Energy Consumption": 8.6,
      "Resource Efficiency": 9.3,
      "Water Usage": 5.0,
      "Lifetime Durability": 9.2,
    },
    {
      Tool: "Microsoft Azure IoT",
      Score: 7.3189427312775335,
      Accuracy: 8.9,
      Speed: 8.6,
      "Energy Efficiency": 9.1,
      "Carbon Footprint": 9.2,
      "Waste Reduction": 8.9,
      "Energy Consumption": 8.5,
      "Resource Efficiency": 9.1,
      "Water Usage": 5.0,
      "Lifetime Durability": 9.1,
    },
    {
      Tool: "AWS IoT Greengrass",
      Score: 7.247111111111112,
      Accuracy: 8.8,
      Speed: 8.5,
      "Energy Efficiency": 9.3,
      "Carbon Footprint": 9.1,
      "Waste Reduction": 9.0,
      "Energy Consumption": 8.4,
      "Resource Efficiency": 9.2,
      "Water Usage": 5.0,
      "Lifetime Durability": 9.3,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserResponses((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8001/recommendations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_query: userResponses.focus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations.");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      setError("Failed to fetch recommendations. Displaying sample data.");
      setRecommendations(sampleData); // Use sample data in case of error
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserResponses({
      focus: "",
      categories: [],
      industry: "",
      metrics: [],
      integrations: "",
    });
    setRecommendations([]);
    setError(null);
  };

  return (
    <div>
      <CardHeader>
        <CardTitle>Ask AI</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          name="focus"
          value={userResponses.focus}
          onChange={handleInputChange}
          placeholder="Please recommend tools for energy-efficient machine learning with a focus on accuracy."
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to="/">
          <Button className="bg-white text-black">
            Back
          </Button>
        </Link>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-black text-white hover:bg-white hover:text-black"
        >
          {isLoading ? "Loading..." : "Get Recommendations"}
        </Button>
        {recommendations.length > 0 && (
          <Button
            onClick={handleReset}
            className="bg-black text-white hover:bg-white hover:text-black"
          >
            Enter New Prompt
          </Button>
        )}
      </CardFooter>
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Render ToolRecommendations if recommendations are available */}
      {recommendations.length > 0 && (
        <ToolRecommendations recommendations={recommendations} />
      )}
    </div>
  );
}
