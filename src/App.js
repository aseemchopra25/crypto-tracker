import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios';
import Coin from './Coin/Coin';
function App() {
  const [coins,setCoins]=useState([]);
  const [search, setSearch]=useState('');
  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res =>{
        setCoins(res.data)
        // console.log(res.data)
      }).catch(error => console.log(error))
// empty dependency array means this effect will only run once (like componentDidMount in classes)
  },[])


  const handleChange = e => {
    setSearch(e.target.value)
  }
  
  const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    )


    return (
      <div>
        <div className="header">
          <h1 className="brand">
            <i className="fa fa-coins"></i> Crypto-Tracker
          </h1>
          <form>
            <input
              className="inputField"
              type="text"
              onChange={handleChange}
              placeholder="Search a Coin"
            />
          </form>
        </div>
        <div className="coinsContainer">
        {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                price={coin.current_price}
                symbol={coin.symbol}
                marketcap={coin.market_cap}
                volume={coin.total_volume}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
              />
            );
          })}
        </div>
      </div>
  );
}

export default App;
// Axios lets us help us data from the API like fetch 