import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const Chart = ({ data, xAxisKey, yAxisKey, yAxisLabel }) => {
  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        Votre Santé 
      </Typography>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} style={{fontSize:"8px"}}/>
          <YAxis label={{ value: yAxisLabel, angle: -90, position: 'center' ,fontSize:"10px" }}  style={{fontSize:"8px"}}/>
          <Tooltip />
       
          <Line type="monotone" dataKey={yAxisKey} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default Chart;
