import SkeletonElement from "../skeletons/SkeletonElement";

interface NavbarProps {
  euroBlueValue: string;
  date: string;
}

function Navbar({ euroBlueValue, date }: NavbarProps) {
  const isDataLoaded = euroBlueValue !== '' && date !== '';

  // If market for usd is open (weekdays and 10-16) change color
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const isMarketOpen = currentHour >= 10 && currentHour < 16;
  const currentDay = currentTime.getDay();
  const isWeekend = currentDay === 6 || currentDay === 0;
  const mercadoClass = isMarketOpen && !isWeekend ? '' : 'cerrado';
  const textColor = isMarketOpen ? '#77aeff' : '#FB5C5C';

  return (
    <>
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
    </>
  );
}

export default Navbar;
