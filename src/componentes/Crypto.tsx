import React, { useEffect, useState } from "react";

interface CryptoData {
  code: string;
  msg: string;
  data: {
    last: string;
    open24h: string;
  }[];
}

interface CryptoProps {}

const Crypto: React.FC<CryptoProps> = () => {
  const [cryptoData, setCryptoData] = useState<Record<string, CryptoData>>({});
  const Monedas: string[] = ["BTC", "ETH", "SOL", "ADA", "XRP", "LINK"];

  const fetchCurrencyPrice = async (currencyCode: string) => {
    try {
      const response = await fetch(
        `https://www.okx.com/api/v5/market/ticker?instId=${currencyCode}-USD-SWAP`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json: CryptoData = await response.json();
      setCryptoData((prevData) => ({ ...prevData, [currencyCode]: json }));
    } catch (error) {
      console.log("Failed to fetch ", currencyCode, "-", error);
    }
  };

  useEffect(() => {
    Monedas.forEach((currencyCode) => fetchCurrencyPrice(currencyCode));
  }, []);

  const getIconPath = (currencyCode: string) => `/crypto/${currencyCode}.svg`;

  return (
    <div className="mx-8">
      <h1 className="text-3xl font-extrabold text-[#E5ECFF] mt-12">Crypto</h1>

      <div className="relative overflow-hidden mt-12">
        {/* Gradient */}
        <div className="absolute inset-0 z-50 bg-gradient-to-r from-[#030712] via-[transparent] to-[#030712]"></div>

        <div className="my-auto flex w-full justify-between relative whitespace-nowrap animate-marquee text-textColor">
          {Monedas.map((currencyCode, index) => (
            <div key={index} className="flex items-center mr-20 text-white">
              <img
                src={getIconPath(currencyCode)}
                alt={`${currencyCode} icon`}
                className="mr-2 w-5 h-5"
              />
              {cryptoData[currencyCode]?.data && (
                <>
                  {`${currencyCode} $${parseFloat(
                    cryptoData[currencyCode].data[0].last
                  ).toFixed(2)} 
                
                ${(
                  (parseFloat(cryptoData[currencyCode].data[0].last) -
                    parseFloat(cryptoData[currencyCode].data[0].open24h)) /
                  parseFloat(cryptoData[currencyCode].data[0].open24h)
                ).toFixed(2)}%`}
                </>
              )}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marquee-animation {
            0% {
              transform: translateX(100%);
            }

            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            animation: marquee-animation 10s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Crypto;
