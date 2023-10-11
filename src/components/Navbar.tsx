import { useEffect, useState } from "react";
import SkeletonElement from "../skeletons/SkeletonElement";

function Navbar() {
  const [date, setDate] = useState('');
  const [euroBlueValue, setEuroBlueValue] = useState(''); 
  const isDataLoaded = euroBlueValue !== '' && date !== '';

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.bluelytics.com.ar/v2/latest');
      const data = await res.json();
      // EuroBlue value
      const euroBlue = data.blue_euro.value_sell;
      setEuroBlueValue(euroBlue); 
      // Last update value
      const update = new Date(data.last_update);
      const updateTime = `${update.getHours()}:${String(update.getMinutes()).padStart(2, '0')}`;
      setDate(updateTime);
    };
    fetchData();
  }, []);

  // If market for usd is open (weekdays and 10-16) change color
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const isMarketOpen = currentHour >= 10 && currentHour < 16;
  const currentDay = currentTime.getDay();
  const isWeekend = currentDay === 6 || currentDay === 0;
  const mercadoClass = isMarketOpen && !isWeekend ? '' : 'cerrado';
  const textColor = isMarketOpen ? '#77aeff' : '#FB5C5C';

  return (
    <div id="navBar">
      <h3 className="logo"><img src="/icon2.svg" alt="Cambio Cambio Icon" /> CambioCambio</h3>
      <span className="euroBlueValor">
        Euro Blue: &nbsp;{isDataLoaded
          ? euroBlueValue === ''
            ? <SkeletonElement type={"line"} />
            : `${euroBlueValue}€`
          : <SkeletonElement type={"line"} />}
      </span>
      <span className="ultimaActualizacion">
        Actualizado&nbsp; {isDataLoaded
          ? date === ''
            ? <SkeletonElement type={"line"} />
            : `${date}`
          : <SkeletonElement type={"line"} />}
      </span>

      <span id="mercado" className={mercadoClass}>
        <span className={`status ${isMarketOpen ? 'online' : 'offline'}`}></span>
        <span id="text" style={{ color: textColor }} > {isMarketOpen ? 'Mercado Abierto' : 'Mercado Cerrado'}</span>
      </span>
    </div>
  );
}

export default Navbar;
