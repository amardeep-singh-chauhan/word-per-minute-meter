import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const GaugeChart = () => {
  const chartRef = useRef(null);
  const [value, setValue] = useState(200);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const getOption = (val) => ({
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 360,
          min: 0,
          max: 300,
          splitNumber: 3,
          itemStyle: {
            color: "rgb(243, 169, 48)",
          },
          pointer: {
            show: false,
          },
          progress: {
            show: true,
            width: 20,
            roundCap: true,
          },
          axisLine: {
            lineStyle: {
              width: 20,
            },
            roundCap: true,
          },
          axisTick: {
            distance: -45,
            splitNumber: 3,
            lineStyle: {
              width: 0,
              color: "#999",
            },
          },
          splitLine: {
            distance: -10,
            length: 0,
            lineStyle: {
              width: 0,
              color: "#999",
            },
          },
          axisLabel: {
            distance: -35,
            color: "#999",
            fontSize: 15,
            formatter: function (value) {
              if (value === 0) return `Slow`; // Label at min value
              if (value === 300) return "Fast"; // Label at max value
              return value; // Hide intermediate values
            },
          },
          detail: {
            valueAnimation: true,
            width: "20%",
            lineHeight: 20,
            borderRadius: 3,
            offsetCenter: [0, "-5%"],
            fontSize: 40,
            fontWeight: "normal",
            formatter: "{value} WPM",
            color: "inherit",
          },
          data: [{ value: val }],
        },
      ],
    });

    myChart.setOption(getOption(value));

    return () => {
      myChart.dispose();
    };
  }, [value]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

const App = () => <GaugeChart />;

export default App;
