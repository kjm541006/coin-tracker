import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface DataInterface {
  // close: number;
  // high: number;
  // low: string;
  // market_cap: number;
  // open: string;
  // time_close: number;
  // time_open: number;
  // volume: string;
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export default function Chart(props: ChartProps) {
  const { isLoading, data } = useQuery<DataInterface[]>(
    ["ohlcv", props.coinId],
    () => fetchCoinHistory(props.coinId),
    {
      refetchInterval: 300000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "sales",
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
              palette: "palette1",
            },
            chart: {
              height: 500,
              width: 500,
              background: "#2c3e50",
              toolbar: {
                show: false,
              },
            },
            stroke: {
              curve: "smooth",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"] },
            },
            colors: ["#0fbcf9"],
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              type: "datetime",
              categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
