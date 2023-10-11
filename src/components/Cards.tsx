import { useEffect, useState } from "react";
import SkeletonCard from '../skeletons/SkeletonCard.tsx';
import '../index.css';

const Cards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [variacion, setVariacion] = useState<VariacionType[]>([]);
  const [cryptoUSD, setCryptoUSD] = useState<CryptoType | null>(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardsResponse, variacionResponse] = await Promise.all([
          fetch('https://dolarapi.com/v1/dolares/').then((res) => res.json()),
          fetch('https://criptoya.com/api/dolar').then((res) => res.json())
        ]);
        setCards(cardsResponse);
        setVariacion(variacionResponse);

        const cryptoUSDRate = await fetch('https://criptoya.com/api/buenbit/usdt/ars/0.1').then((res) => res.json());
        setCryptoUSD(cryptoUSDRate);

        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  // Show '0' on the % variation on the rates the API doesn't cover
  const cardVariationMap = [
    { value: '0.00', label: 'Empty' },
    { value: variacion.blue_var || '0.00', label: 'Blue Var' },
    { value: variacion.mep_var || '0.00', label: 'MEP Var' },
    { value: variacion.ccl_var || '0.00', label: 'CCL Var' },
    { value: '0.00', label: 'Empty' },
  ];

  interface VariacionType {
    blue_var: number;
    mep_var: number;
    ccl_var: number;
    ccb_var: number;
  }
  
  console.log(variacion);

  return (
    <section>
      {/* While the apis are being loaded, return 6 Skeleton cards*/}
      {loading && [1, 2, 3, 4, 5, 6].map(n => <SkeletonCard key={n} />)}

      {/* Show all USD rates except for the last one "Mayorista" because is not needed */}
      {!loading && cards.length > 0 && cards.slice(0, cards.length - 1).map((card, index) => (
        <div className="cards" key={index}>
          <span className="title">
            {card.nombre === "Contado con liquidación" ? (
              <p>Dolar <span>Liqui</span></p>
            ) : card.nombre === "Solidario (Turista)" ? (
              <p>Dolar <span>Tarjeta</span></p>
            ) : (
              <p>Dolar <span>{card.nombre}</span></p>
            )}
            <p className={`variacion ${cardVariationMap[index].value === '0.00' ? 'zero-bg' : cardVariationMap[index].value > 0 ? 'positive-bg' : 'negative-bg'}`}>
              {cardVariationMap[index].value > 0 ? (
                <i className="bi bi-arrow-up-short"></i>
              ) : cardVariationMap[index].value < 0 ? (
                <i className="bi bi-arrow-down-short"></i>
              ) : null}
              {cardVariationMap[index].value}%
            </p>
          </span>
          <p className="valores">
            <span>{card.compra ? `${parseFloat(card.compra).toFixed(2)}$` : <span className="null"> </span>}</span> / <span>{parseFloat(card.venta).toFixed(2)}$</span>
          </p>
          <p className="vC">Compra / Venta</p>
        </div>
      ))}

      {/* Show the last card as another rate that is not on the previous api,
      and only show it when both apis have been fetched*/}
      {!loading && cryptoUSD && (
        <div className="cards">
          <span className="title">
            <p>Dolar <span>Crypto</span></p>
            <p className={`variacion ${variacion.ccb_var > 0 ? 'positive-bg' : variacion.ccb_var < 0 ? 'negative-bg' : ''}`}>
              {variacion.ccb_var > 0 ? (
                <i className="bi bi-arrow-up-short"></i>
              ) : variacion.ccb_var < 0 ? (
                <i className="bi bi-arrow-down-short"></i>
              ) : null}
              {variacion.ccb_var}%
            </p>
          </span>
          <p className="valores">
            <span>{cryptoUSD.ask ? `${parseFloat(cryptoUSD.ask).toFixed(2)}$` : ''}</span> / <span>{parseFloat(cryptoUSD.bid).toFixed(2)}$</span>
          </p>
          <p className="vC">Compra / Venta</p>
        </div>
      )}
    </section>
  );
};

export default Cards;
