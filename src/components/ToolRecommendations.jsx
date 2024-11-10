import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts'

const barChartMetrics = ['Accuracy', 'Speed', 'Energy Efficiency', 'Carbon Footprint', 'Waste Reduction', 'Energy Consumption', 'Resource Efficiency', 'Water Usage', 'Lifetime Durability']
const radarChartMetrics = ['Accuracy', 'Speed', 'Energy Efficiency', 'Waste Reduction', 'Resource Efficiency', 'Lifetime Durability']
const pieChartMetrics = barChartMetrics.filter(metric => !radarChartMetrics.includes(metric))

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']

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

  const pieChartData = pieChartMetrics.map(metric => ({
    name: metric,
    value: selectedTool?.[metric],
    ...(comparisonTool && { comparisonValue: comparisonTool[metric] })
  }))

  // Helper function to generate comparison message
  const getComparisonMessage = () => {
    if (!comparisonTool) return null

    const betterMetrics = barChartMetrics.filter(metric =>
      selectedTool[metric] > comparisonTool[metric]
    )
    const worseMetrics = barChartMetrics.filter(metric =>
      selectedTool[metric] < comparisonTool[metric]
    )

    return (
      <div className="mt-4 p-4 border border-red-500 rounded-lg bg-red-50">
        <h4 className="text-lg font-semibold text-red-600">Why {selectedTool.Tool} is Better Than {comparisonTool.Tool}</h4>
        <p className="mt-2">The most recommended tool, <strong>{selectedTool.Tool}</strong>, outperforms <strong>{comparisonTool.Tool}</strong> in the following areas:</p>
        <ul className="list-disc list-inside">
          {betterMetrics.map(metric => (
            <li key={metric}><strong>{metric}</strong>: {selectedTool[metric]} vs {comparisonTool[metric]}</li>
          ))}
        </ul>
        {worseMetrics.length > 0 && (
          <>
            <p className="mt-2">However, <strong>{comparisonTool.Tool}</strong> has an advantage in the following:</p>
            <ul className="list-disc list-inside">
              {worseMetrics.map(metric => (
                <li key={metric}><strong>{metric}</strong>: {comparisonTool[metric]} vs {selectedTool[metric]}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recommended Eco-AI Tools</CardTitle>
        <CardDescription className="text-lg font-bold">Based on your selected categories and preferences</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Display most recommended tool information */}
        <div className="mb-6 p-4 border border-blue-500 rounded-lg bg-blue-50">
          <h3 className="text-lg font-semibold">Most Recommended Tool: {recommendations[0].Tool}</h3>
          <p>{recommendations[0].Tool} is highly recommended due to its top scores in crucial areas like Accuracy, Speed, and Resource Efficiency. It balances eco-efficiency and durability, making it the ideal choice for sustainable AI solutions.</p>
          <Button onClick={() => setSelectedTool(recommendations[0])} className="mt-4 bg-black text-white hover:bg-white hover:text-black">
            View Detailed Metrics
          </Button>
        </div>

        {/* Display bar and radar charts for selected tool and comparison tool */}
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

        <div className="mb-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
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
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Additional Metrics</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                {comparisonTool && (
                  <Pie data={pieChartData} dataKey="comparisonValue" nameKey="name" cx="50%" cy="50%" innerRadius={90} outerRadius={110} fill="#82ca9d" label>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                )}
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {comparisonTool && (
          <>
            {getComparisonMessage()}
            <Button onClick={resetComparison} className="mb-4 bg-black text-white hover:bg-white hover:text-black">
              Reset Comparison
            </Button>
          </>
        )}

        {/* Display other recommended tools in the grid */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Other Recommended Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.slice(1).map((tool, index) => (
              <Card key={tool.Tool} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="font-bold">{tool.Tool.replace(/_/g, ' ')}</CardTitle>
                  <CardDescription className="font-bold">{`${index + 2}th Recommended`}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    {barChartMetrics.map(metric => (
                      <li key={metric} className="font-semibold">{metric}: {tool[metric].toFixed(2)}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardContent className="mt-auto">
                  <Button onClick={() => handleCompare(tool)} className="w-full bg-black text-white hover:bg-white hover:text-black">
                    Compare
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={() => window.location.reload()} className="bg-black text-white hover:bg-white hover:text-black">Start Over</Button>
      </CardFooter>
    </Card>
  )
}
