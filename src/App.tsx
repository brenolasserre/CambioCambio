import Crypto from "./componentes/Crypto";
import Dolares from "./componentes/Dolares";
import Noticias from "./componentes/Noticias";
import Nav from "./componentes/Nav";

function App() {
  return (
    <div className="flex-col w-full justify-center">
      <Nav />
      <Crypto />
      <Dolares />
      <Noticias />
    </div>
  );
}

export default App;
