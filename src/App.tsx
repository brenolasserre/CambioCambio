// App.js
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Cards from './components/Cards';

function App() {
  const [euroBlueValue, setEuroBlueValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.bluelytics.com.ar/v2/latest');
      const data = await res.json();
      const euroBlue = data.blue_euro.value_sell;
      setEuroBlueValue(euroBlue);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar euroBlueValue={euroBlueValue} />
      <Cards  />
    </div>
  );
}

export default App;
