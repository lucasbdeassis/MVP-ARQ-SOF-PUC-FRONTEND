import React, { useState, useEffect } from "react";

export default function BtcBanner() {
  const [btcPrice, setBtcPrice] = useState(0);

  useEffect(() => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setBtcPrice(data.bpi.USD.rate));
  }, []);

  console.log(btcPrice);

  return (
    <div className='container text-center'>
      <div className='row justify-content-center'>
        <div className='col'>
          <h4>Preço do BTC em USD: {btcPrice}</h4>
        </div>
      </div>
    </div>
  );
}
