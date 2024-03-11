// @ts-expect-error TSERROR
import Crypto from "./componentes/Crypto";
import Dolares from "./componentes/Dolares";

function App() {
  return (
    <div className="flex-col w-full justify-center">
      <Crypto />
      <Dolares />
    </div>
  );
}

export default App;
