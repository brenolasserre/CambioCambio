// App.js
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import MobileCard from './components/MobileCard';

function App() {
  const [euroBlueValue, setEuroBlueValue] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.bluelytics.com.ar/v2/latest');
      const data = await res.json();
      const euroBlue = data.blue_euro.value_sell;
      setEuroBlueValue(euroBlue);

      const update = new Date(data.last_update);
      const updateTime = `${update.getHours()}:${String(update.getMinutes()).padStart(2, '0')}`;
      setDate(updateTime);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar euroBlueValue={euroBlueValue} date={date} />
      <Cards  />
       <MobileCard euroBlueValue={euroBlueValue} date={date} />
    </div>
  );
}

export default App;
