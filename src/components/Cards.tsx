import { useEffect, useState } from "react";
import SkeletonCard from '../skeletons/SkeletonCard.tsx';
import '../index.css';

interface CardType {nombre: string; compra: number | null; venta: number;fechaActualizacion: number;}
interface CryptoType { ask: number; bid: number;time: number;}
interface VariacionType { blue_var: number; mep_var: number;ccl_var: number;ccb_var: number;}

// Cards
const Cards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [cryptoUSD, setCryptoUSD] = useState<CryptoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [variacion, setVariacion] = useState<VariacionType>({blue_var: 0,mep_var: 0,ccl_var: 0,ccb_var: 0,});

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
        setLoading(false); // Set loading to false when data is succesfully fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
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

  function calculateTimePassed(fechaActualizacion: Date) {
    const fechaActualizacionDate = fechaActualizacion.getTime();
    const currentTime = new Date().getTime();
    const timeDifferenceInSeconds = Math.floor((currentTime - fechaActualizacionDate) / 1000);
  
    if (timeDifferenceInSeconds < 60) {
      return `Hace ${timeDifferenceInSeconds} segundo${timeDifferenceInSeconds !== 1 ? 's' : ''}`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutesPassed = Math.floor(timeDifferenceInSeconds / 60);
      return `Hace ${minutesPassed} minuto${minutesPassed !== 1 ? 's' : ''}`;
    } else {
      const hoursPassed = Math.floor(timeDifferenceInSeconds / 3600);
      return `Hace ${hoursPassed} hora${hoursPassed !== 1 ? 's' : ''}`;
    }
  }
  
  return (
    <section>
      {/* While the APIs are being loaded, return 6 Skeleton cards */}
      {loading && [1, 2, 3, 4, 5, 6].map(n => <SkeletonCard key={n} />)}
  
      {/* Show all USD rates except for the last one "Mayorista" because it is not needed */}
      {!loading && cards.length > 0 && (
        <>
          {cards.slice(0, cards.length - 1).map((card, index) => (
            <div className="cards" key={index}>
              <span className="title">
                {card.nombre === "Contado con liquidación" ? (
                  <p>Dolar <span>CCL</span></p>
                ) : card.nombre === "Solidario (Turista)" ? (
                  <p>Dolar <span>Turista</span></p>
                ) : card.nombre === "Bolsa" ? (
                  <p>Dolar <span>MEP</span></p>
                ) : (
                  <p>Dolar <span>{card.nombre}</span></p>
                )}
                <p className={`variacion ${parseFloat(cardVariationMap[index].value as string) === 0 ? 'zero-bg' : parseFloat(cardVariationMap[index].value as string) > 0 ? 'positive-bg' : 'negative-bg'}`}>
                  {parseFloat(cardVariationMap[index].value as string) > 0 ? (
                    <i className="bi bi-arrow-up-short"></i>
                  ) : parseFloat(cardVariationMap[index].value as string) < 0 ? (
                    <i className="bi bi-arrow-down-short"></i>
                  ) : null}
                  {cardVariationMap[index].value}%
                </p>
              </span>
              <p className="valores">
                <span className="nullSpan">
                  {card.nombre === "Solidario (Turista)" ? (
                    cards[0].compra !== null ? `${cards[0].compra.toFixed(2)}$` : "N/A"
                  ) : card.compra !== null ? (
                    `${card.compra.toFixed(2)}$`
                  ) : (
                    <span className="null">N/A</span>
                  )}
                </span> / &nbsp;
                <span>{card.venta.toFixed(2)}$</span> 
              </p>
              <p className="actualizacion">
                  {calculateTimePassed(new Date(card.fechaActualizacion))}
              </p>
            </div>
          ))}

          {/* Show the last card as another rate that is not on the previous api,
          and only show it when both APIs have been fetched*/}
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
                <span>{cryptoUSD && `${cryptoUSD.ask.toFixed(2)}$`}</span> / &nbsp;<span>{cryptoUSD && cryptoUSD.bid.toFixed(2)}$</span>
              </p>
              <p className="actualizacion">
                    {cryptoUSD && cryptoUSD.time && (
                      (() => {
                        const cryptoTimeInSeconds = cryptoUSD.time;
                        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
                        const timeDifference = currentTimeInSeconds - cryptoTimeInSeconds;

                        if (timeDifference < 60) {
                          return `Hace ${timeDifference} segundo${timeDifference !== 1 ? 's' : ''}`;
                        } else if (timeDifference < 3600) {
                          const minutesPassed = Math.floor(timeDifference / 60);
                          return `Hace ${minutesPassed} minuto${minutesPassed !== 1 ? 's' : ''}`;
                        } else {
                          const hoursPassed = Math.floor(timeDifference / 3600);
                          return `Hace ${hoursPassed} hora${hoursPassed !== 1 ? 's' : ''}`;
                        }
                      })()
                    )}
                  </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Cards;