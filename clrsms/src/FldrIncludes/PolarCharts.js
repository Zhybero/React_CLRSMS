


import React from "react"; 
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

function PolarCharts(){
    const data = [
        { subject: 'Math', A: 120, B: 110, fullMark: 150 },
        { subject: 'English', A: 98, B: 130, fullMark: 150 },
        { subject: 'Science', A: 86, B: 130, fullMark: 150 },
        { subject: 'History', A: 99, B: 100, fullMark: 150 },
        { subject: 'Geography', A: 85, B: 90, fullMark: 150 },
      ];
      

    return(<>
     <ResponsiveContainer width="100%" height={400}>
      <RadarChart outerRadius={150} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar name="Student A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Student B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
    </>);
}

export default PolarCharts;