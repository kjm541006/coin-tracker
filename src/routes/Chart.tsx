import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

export default function Chart(props: ChartProps) {
  const { isLoading, data } = useQuery(["ohlcv", props.coinId], () =>
    fetchCoinHistory(props.coinId)
  );
  return <div>Chart</div>;
}
