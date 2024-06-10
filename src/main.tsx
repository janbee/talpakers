import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App.tsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isoWeek from 'dayjs/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(relativeTime);
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
