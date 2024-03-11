import React from "react";

const Crypto = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-50 bg-gradient-to-r from-[#030712] via-[transparent] to-[#030712]"></div>
      <div className="flex relative whitespace-nowrap animate-marquee text-textColor">
        <p className="mr-8 text-white">BTC $70.689,50</p>
        <p className="mr-8 text-white">ETH $3.689,50</p>
        <p className="mr-8 text-white">ADA $89,31</p>
        <p className="mr-8 text-white">BNB $689,22</p>
      </div>

      <style jsx="true">{`
        @keyframes marquee-animation {
          0% {
            transform: translateX(100%);
          }

          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee-animation 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Crypto;

// import { useEffect, useState } from "react";

// export default function CryptoPrices() {
//   const [crypto, setCrypto] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/most-visited?limit=4",
//           {
//             headers: {
//               "X-CMC_PRO_API_KEY": "87c32415-6281-4567-98e8-bb7865c21771",
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Response wasn't successful.");
//         }
//         const data = await response.json();
//         setCrypto(data);
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log(crypto);

//   return <div className="text-white">asfasf</div>;
// }
