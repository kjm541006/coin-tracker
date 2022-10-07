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

export default function Price(props: ChartProps) {
  const { isLoading, data } = useQuery<DataInterface[]>(
    ["ohlcv", props.coinId],
    () => fetchCoinHistory(props.coinId),
    {
      refetchInterval: 300000,
    }
  );
  console.log(data?.map((price) => price.close));
  const mappedData = data?.map((price) => {
    return {
      x: price.time_close,
      y: [price.open, price.high, price.low, price.close],
    };
  });
  console.log(mappedData);
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                data: mappedData,
              },
            ] as any
          }
          options={{
            chart: {
              type: "candlestick",
              height: 500,
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#ff5e57",
                  downward: "#0fbcf9",
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
