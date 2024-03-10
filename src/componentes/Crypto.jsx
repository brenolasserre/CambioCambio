import { useEffect, useState } from "react";

export default function CryptoPrices() {
  const [crypto, setCrypto] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/most-visited?limit=4",
          {
            headers: {
              "X-CMC_PRO_API_KEY": "87c32415-6281-4567-98e8-bb7865c21771",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Response wasn't successful.");
        }
        const data = await response.json();
        setCrypto(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(crypto);

  return <div className="text-white">asfasf</div>;
}
