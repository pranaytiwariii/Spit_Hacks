import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const barChartMetrics = ['Accuracy', 'Speed', 'Energy Efficiency', 'Carbon Footprint', 'Waste Reduction', 'Energy Consumption', 'Resource Efficiency', 'Water Usage', 'Lifetime Durability']
const radarChartMetrics = ['Accuracy', 'Speed', 'Energy Efficiency', 'Waste Reduction', 'Resource Efficiency', 'Lifetime Durability']

export default function ToolRecommendations({ recommendations }) {
  const [selectedTool, setSelectedTool] = useState(recommendations[0])
  const [comparisonTool, setComparisonTool] = useState(null)

  const handleCompare = (tool) => {
    setComparisonTool(tool)
  }

  const resetComparison = () => {
    setComparisonTool(null)
  }

  const barChartData = barChartMetrics.map(metric => ({
    name: metric,
    [selectedTool?.Tool]: selectedTool?.[metric],
    ...(comparisonTool && { [comparisonTool.Tool]: comparisonTool[metric] })
  }))

  const radarChartData = radarChartMetrics.map(metric => ({
    subject: metric,
    [selectedTool?.Tool]: selectedTool?.[metric],
    ...(comparisonTool && { [comparisonTool.Tool]: comparisonTool[metric] })
  }))

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Recommended Eco-AI Tools</CardTitle>
        <CardDescription>Based on your selected categories and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={selectedTool.Tool} fill="#8884d8" />
              {comparisonTool && <Bar dataKey={comparisonTool.Tool} fill="#82ca9d" />}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Overall Performance</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarChartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar name={selectedTool.Tool} dataKey={selectedTool.Tool} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              {comparisonTool && (
                <Radar name={comparisonTool.Tool} dataKey={comparisonTool.Tool} stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              )}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {comparisonTool && (
          <Button onClick={resetComparison} className="mb-4">
            Reset Comparison
          </Button>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Other Recommended Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.filter(tool => tool.Tool !== selectedTool.Tool).map((tool) => (
              <Card key={tool.Tool} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>{tool.Tool.replace(/_/g, ' ')}</CardTitle>
                  <CardDescription>Score: {tool.Score.toFixed(2)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    {barChartMetrics.map(metric => (
                      <li key={metric}>{metric}: {tool[metric].toFixed(2)}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardContent className="mt-auto">
                  <Button onClick={() => handleCompare(tool)} className="w-full">
                    Compare
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => window.location.reload()}>Start Over</Button>
      </CardFooter>
    </Card>
  )
}