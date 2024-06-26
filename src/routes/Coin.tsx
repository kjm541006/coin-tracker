import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: any;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 100%;

  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  span:nth-child(2) {
    font-size: 18px;
  }
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  text-align: center;
  border-radius: 10px;
  padding: 7px 0;
  color: ${(props) => (props.isActive ? props.theme.accentColor : "white")};
  a {
    display: block;
  }
`;

export default function Coin() {
  const { coinId } = useParams();
  const location = useLocation();
  const { state } = location;
  const priceMatch = useMatch(`/:coinId/price`);
  const chartMatch = useMatch(`/:coinId/chart`);
  const [date, setDate] = useState(new Date());
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [price, setPrice] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     console.log(infoData);
  //     console.log(priceData);
  //     setInfo(infoData);
  //     setPrice(priceData);
  //     setLoading(false);
  //     setDate(new Date(priceData.last_updated));
  //     console.log(date.toLocaleString());
  //   })();
  // }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!),
    {
      refetchInterval: 300000,
    }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 300000,
    }
  );

  console.log(infoData);
  console.log(tickersData);

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Link to={"/"}>홈으로</Link>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      <Overview>
        <OverviewItem>
          <span>Rank</span>
          <span>{infoData?.rank}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Symbol</span>
          <span>${infoData?.symbol}</span>
        </OverviewItem>
        <OverviewItem>
          <span>최대 공급량</span>
          <span>{tickersData?.max_supply}</span>
        </OverviewItem>
      </Overview>
      <Description>업데이트: {new Date(tickersData?.last_updated).toLocaleString()}</Description>
      <Description>{infoData?.description}</Description>
      <Overview>
        <OverviewItem>
          <span>유통 공급량</span>
          <span>{tickersData?.circulating_supply}</span>
        </OverviewItem>
        <OverviewItem>
          <span>변동(7일)</span>
          <span>{tickersData?.quotes.USD.percent_change_7d}%</span>
        </OverviewItem>
        <OverviewItem>
          <span>가격</span>
          <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
        </OverviewItem>
      </Overview>
      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>차트</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>가격</Link>
        </Tab>
      </Tabs>
      <Routes>
        <Route path="chart" element={<Chart coinId={coinId!} />} />
        <Route path="price" element={<Price coinId={coinId!} />} />
      </Routes>
    </Container>
  );
}
