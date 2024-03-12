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
      if (!response.ok) throw new Error("Network response was not ok");
      const json: CryptoData = await response.json();
      setCryptoData((prevData) => ({ ...prevData, [currencyCode]: json }));
    } catch (error) {
      console.log("Failed to fetch ", currencyCode, "-", error);
    }
  };

  useEffect(() => {
    Monedas.forEach(fetchCurrencyPrice);
  }, []);

  const getIconPath = (currencyCode: string) => `/crypto/${currencyCode}.svg`;

  return (
    <div className="mx-8">
      <h1 className="mx-0 lg:mx-[12vw] text-3xl font-extrabold text-[#E5ECFF] mt-12">
        Crypto
      </h1>

      <div className="relative overflow-hidden mt-12 lg:mx-[12vw]">
        {/* Gradient */}
        <div className="absolute inset-0 z-50 bg-gradient-to-r from-[#030712] via-[transparent] to-[#030712]"></div>

        <div className="my-auto flex w-full justify-between relative whitespace-nowrap animate-marquee text-textColor">
          {Monedas.map((currencyCode, index) => {
            const data = cryptoData[currencyCode]?.data?.[0];
            const price = parseFloat(data?.last || "0").toFixed(2);
            const changePercent = (
              ((parseFloat(data?.last) - parseFloat(data?.open24h)) /
                parseFloat(data?.open24h)) *
              100
            ).toFixed(2);

            const getChangeClass = () => {
              const changePercentValue = parseFloat(changePercent);
              if (changePercentValue > 0) {
                return "bg-successBackground text-successColor";
              } else if (changePercentValue < 0) {
                return "bg-warningBackground text-warningColor";
              }
              return "bg-textColorBackground";
            };

            return (
              <div key={index} className="flex items-center mr-20 text-white">
                <img
                  src={getIconPath(currencyCode)}
                  alt={`${currencyCode} icon`}
                  className="mr-2 w-5 h-5"
                />
                {data && (
                  <>
                    {`${currencyCode} $${price}`}
                    <span
                      className={`${getChangeClass()} flex items-center justify-center gap-1 px-2 ml-2 py-[3px] text-xs rounded-full`}
                    >
                      {parseFloat(changePercent) !== 0 &&
                        `${
                          parseFloat(changePercent) > 0 ? "+" : ""
                        }${changePercent}%`}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <style>
          {`

          
            @keyframes marquee-animation {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }

            .animate-marquee { animation: marquee-animation 10s linear infinite; }
          `}
        </style>
      </div>
    </div>
  );
};

export default Crypto;
