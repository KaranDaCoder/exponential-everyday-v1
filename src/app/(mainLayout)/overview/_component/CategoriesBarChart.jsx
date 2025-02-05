'use client';
import React, { useEffect, useState } from 'react';
import {
 Bar,
 BarChart,
 ResponsiveContainer,
 Tooltip,
 XAxis,
 YAxis,
 CartesianGrid,
 Cell,
} from 'recharts';

// Map data to include dynamic colors
const data = [
 { name: 'HEALTH_FITNESS', count: 4 },
 { name: 'PERSONAL_GROWTH', count: 15 },
 { name: 'PRODUCTIVITY', count: 10 },
 { name: 'MENTAL_WELLBEING', count: 3 },
 { name: 'RELATIONSHIPS', count: 12 },
 { name: 'FINANCES', count: 9 },
 { name: 'SUSTAINABILITY', count: 5 },
 { name: 'OTHER', count: 30 },
];

const diffData = [
 { name: 'CRAWLING', count: 4 },
 { name: 'WALKING', count: 15 },
 { name: 'RUNNING', count: 10 },
 { name: 'SPRINTING', count: 90 },
];

// Predefined rich colors for categories
const COLORS = [
 '#4CAF50', // Green
 '#FF9800', // Orange
 '#2196F3', // Blue
 '#9C27B0', // Purple
 '#E91E63', // Pink
 '#FFC107', // Amber
 '#3F51B5', // Indigo
 '#607D8B', // Gray
];

const CategoriesBarChart = ({ type, strengthData }) => {

 const filteredData = (type === 'category' ? data : diffData).filter(
  (entry) => entry.count > 0
 );

 return (
  <div className="w-full p-1 bg-white shadow rounded-lg border-t-4 border-stone-500">
   <h1 className="text-sm md:text-base font-semibold text-muted-foreground mb-2 capitalize">
    {type === 'strength' ? 'by strength' : 'by category'}
   </h1>
   <ResponsiveContainer width="100%" height={300}>
    <BarChart
     data={filteredData}
     margin={{
      top: 10,
      right: 20,
      left: 10,
      bottom: 30, // More compact bottom margin
     }}
    >
     {/* Grid and Axes */}
     <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

     {/* X-axis with no labels */}
     <XAxis
      hide={false} // Ensure axis is visible
      dataKey="name"
      axisLine={{ stroke: '#cccccc' }}
      tickLine={false} // Hide tick lines
      tick={false} // Hide tick labels
     />

     <YAxis
      domain={[0, 'dataMax + 2']} // Extend Y-axis range slightly
      axisLine={{ stroke: '#cccccc' }}
      tickLine={false}
      tick={{ fontSize: 12, fill: '#555555' }}
     />

     {/* Tooltip */}
     <Tooltip
      contentStyle={{
       backgroundColor: '#ffffff',
       border: '1px solid #cccccc',
       borderRadius: '2px',
       fontSize: 12,
      }}
     />

     {/* Single Bar Component */}
     <Bar dataKey="count" barSize={35} radius={[8, 8, 0, 0]}>
      {filteredData.map((entry, index) => (
       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
     </Bar>
    </BarChart>
   </ResponsiveContainer>
  </div>
 );
};

export default CategoriesBarChart;
