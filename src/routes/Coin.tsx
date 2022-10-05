import React from "react";
import { useParams } from "react-router";

export default function Coin() {
  const { coinId } = useParams();
  return <div>coin: {coinId}</div>;
}
