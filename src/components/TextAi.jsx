import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function TextAi() {
  const [userResponses, setUserResponses] = useState({
    focus: "",
    categories: [],
    industry: "",
    metrics: [],
    integrations: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserResponses((prev) => ({ ...prev, [name]: value }));

    if (name === "focus") {
      setSelectedPreference(value);
      const input_json = JSON.stringify({
        category: selectedCategory,
        preference: value,
      });
      console.log(input_json);
    }
  };
  return (
    <div>
      <CardHeader>
        <CardTitle>Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          name="metrics"
          value={userResponses.metrics}
          onChange={handleInputChange}
          placeholder="Enter your metrics"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={() => setStep(5)}>Next</Button>
      </CardFooter>
    </div>
  );
}
