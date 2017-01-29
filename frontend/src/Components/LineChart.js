import React from 'react';
import { ResponsiveContainer, LineChart as LC, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

const LineChart = ({data, height}) => {
	return (
		<ResponsiveContainer height={height}>
			<LC
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend verticalAlign="top" height={36} />
				<Line type="monotone" dataKey="credit" stroke="#8884d8" activeDot={{ r: 8 }} />
				<Line type="monotone" dataKey="debit" stroke="#82ca9d" />
			</LC>
		</ResponsiveContainer>
	);
};

export default LineChart;
