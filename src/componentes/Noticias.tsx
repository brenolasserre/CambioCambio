import React from "react";

// interface CryptoData {
//   code: string;
//   msg: string;
//   data: {
//     last: string;
//     open24h: string;
//   }[];
// }

interface CryptoProps {}

const Crypto: React.FC<CryptoProps> = () => {
  // const [cryptoData, setCryptoData] = useState<Record<string, CryptoData>>({});
  // const Monedas: string[] = ["BTC", "ETH", "SOL", "ADA", "XRP", "LINK"];

  // const fetchCurrencyPrice = async (currencyCode: string) => {
  //   try {
  //     const response = await fetch(
  //       `https://www.okx.com/api/v5/market/ticker?instId=${currencyCode}-USD-SWAP`
  //     );
  //     if (!response.ok) throw new Error("Network response was not ok");
  //     const json: CryptoData = await response.json();
  //     setCryptoData((prevData) => ({ ...prevData, [currencyCode]: json }));
  //   } catch (error) {
  //     console.log("Failed to fetch ", currencyCode, "-", error);
  //   }
  // };

  // useEffect(() => {
  //   Monedas.forEach(fetchCurrencyPrice);
  // }, []);

  return (
    <div className="mx-8 mt-20">
      <h1 className="mx-0 lg:mx-[11.5vw] text-3xl font-extrabold text-textColor mt-12">
        Noticias
      </h1>

      <div className="relative bg-[#0C1324] border border-[#1D2639] h-[30em] rounded-t-2xl overflow-hidden mt-12 lg:mx-[11.5vw]"></div>
    </div>
  );
};

export default Crypto;
