import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import './DateRange.css';

export default ({updateStart, updateEnd, currentStart, currentEnd}) => {
	return (
		<div className="date-range">
			<span className="date-range__title">Date Range</span>
			<DatePicker
				className="date-range__start"
				selected={moment(currentStart)} onChange={updateStart}
			/>
			<DatePicker
				className="date-range__end"
				selected={moment(currentEnd)} onChange={updateEnd}
			/>
		</div>
	);
};
