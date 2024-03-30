// import Chart from 'chart.js/auto';

import { ResponsiveCalendar } from "@nivo/calendar/dist/types/ResponsiveCalendar";

// import { ResponsiveCalendar } from '@nivo/calendar'; // npm i @nivo/calend 설치 필요

const MonthGraph = (props) => (
  <ResponsiveCalendar
    data={props.data}
    from={`${props.todoDate.getFullYear()}-01-01`}
    to={`${props.todoDate.getFullYear()}-12-31`}
    emptyColor="#eeeeee"
    colors={["#f47560", "#e8c1a0", "#97e3d5", "#61cdbb"]} //''#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'
    margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
    yearSpacing={40}
    monthBorderColor="#ffffff"
    dayBorderWidth={2}
    dayBorderColor="#ffffff"
    legends={[
      {
        anchor: "bottom-right",
        direction: "row",
        translateY: 36,
        itemCount: 4,
        itemWidth: 42,
        itemHeight: 36,
        itemsSpacing: 14,
        itemDirection: "right-to-left",
      },
    ]}
  />
);

export default MonthGraph;
