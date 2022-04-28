import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import styled from "styled-components";

export default function Cryptocurrencies() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Container>
        <div className="coin-app">
          <div className="coin-search">
            <h1 className="coin-text">Search a currency</h1>
            <form>
              <input
                className="coin-input"
                type="text"
                onChange={handleChange}
                placeholder="Search"
              />
            </form>
          </div>
          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                price={coin.current_price}
                symbol={coin.symbol}
                volume={coin.total_volume}
                marketcap={coin.market_cap}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  .coin-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 64px;
    color: #fff;
  }

  .coin-search {
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .coin-text {
    margin-bottom: 32px;
    text-align: center;
  }

  .coin-input {
    padding-left: 16px;
    width: 300px;
    height: 50px;
    border-radius: 4px;
    border: none;
    background-image: linear-gradient(
      -225deg,
      #ac32e4 0%,
      #7918f2 48%,
      #4801ff 100%
    );

    color: #e2e2e2;
  }

  .coin-input::placeholder {
    color: #e2e2e2;
  }
`;
