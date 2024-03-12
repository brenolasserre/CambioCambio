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
      <div
        x-data="{}"
        x-init="$nextTick(() => {
        let ul = $refs.logos;
        ul.insertAdjacentHTML('afterend', ul.outerHTML);
        ul.nextSibling.setAttribute('aria-hidden', 'true');
        })"
        className="overflow-hidden ml-0 mr-0 mt-12 mx-8 lg:mx-[12vw] lg:w-[72vw] w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      >
        {/* Gradient */}
        <ul className="my-auto h-8 flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none infinite-scroll text-[#E5ECFF]">
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
              <>
                <li
                  key={index}
                  className="inline-block mr-20 text-white animate-marquee"
                >
                  <div className="flex items-center">
                    <img
                      src={getIconPath(currencyCode)}
                      alt={`${currencyCode} icon`}
                      className="mr-2 w-5 h-5"
                    />
                    {data && (
                      <>
                        <b className="mr-1">{`${currencyCode}`}</b>
                        {`$${price}`}
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
                </li>
              </>
            );
          })}
        </ul>
        <ul className="my-auto h-8 flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none infinite-scroll text-[#E5ECFF]">
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
              <>
                <li
                  key={index}
                  className="inline-block mr-20 text-white animate-marquee"
                >
                  <div className="flex items-center">
                    <img
                      src={getIconPath(currencyCode)}
                      alt={`${currencyCode} icon`}
                      className="mr-2 w-5 h-5"
                    />
                    {data && (
                      <>
                        <b className="mr-1">{`${currencyCode}`}</b>
                        {`$${price}`}
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
                </li>
              </>
            );
          })}
        </ul>
        <style>
          {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0%) opacity: 0 }
            5% { transform: translateX(5%) opacity: 1 }
            100% { transform: translateX(-100%); }
          }
          
          .infinite-scroll { animation: infinite-scroll 18s linear infinite; }
        `}
        </style>
      </div>
    </div>
  );
};

export default Crypto;
