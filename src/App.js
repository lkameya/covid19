import React, { useEffect, useState, Suspense } from 'react';
import RacingBarChart from './components/RacingBarChart';
import useInterval from './hooks/useInterval';
import countries from "./countries";
import moment from "moment";
import './App.css';

const getColors = country => {
  let color;
  switch (country) {
    case "China":
      color = "#d6344740";
      break;
    case "Brazil":
      color = "#ffe75e80";
      break;
    case "Italy":
      color = "#baf1a1";
      break;
    case "Germany":
      color = "#ff1e5680";
      break;
    case "France":
      color = "#19296580";
      break;
    case "Canada":
      color = "#ff1e5690";
      break;
    case "US":
      color = "#b21f6680";
      break;
    case "Iran":
      color = "#1eb2a6";
      break;
    case "Spain":
      color = "#feb72b";
      break;
    case "Korea, South":
      color = "#4a47a350";
      break;
    case "Switzerland":
      color = "#d6344740";
      break;
    case "Japan":
      color = "#d6344720";
      break;
    case "United Kingdom":
      color = "#00508280";
      break;
    case "Netherlands":
      color = "#ffa41b95";
      break;
    default:
      color = "black";
  }
  return color;
}

function App() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [iteration, setIteration] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const [type, setType] = useState("cases");

  useEffect(() => {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then(response => response.ok && response.json())
      .then(data => {
        setData(data);
        setTotal(data["US"].length);
      })
      .catch(error => console.error(error));
  }, []);

  useInterval(() => {
    if (!data || iteration > (total - 1))
      return;

    setCurrentData([...Object.keys(data).map((x, i) => {
      return {
        name: x,
        value: type === "cases" ? data[x][iteration].confirmed : data[x][iteration].deaths,
        color: getColors(x),
        date: data[x][iteration].date
      }
    }).filter(x => countries.some(item => item.includes(x.name)))]
    );
    setIteration(iteration + 1);
  }, 1000);

  const handleChange = (e) => {
    setType(e.target.value);

    if (iteration > total - 1) {
      setCurrentData([...Object.keys(data).map((x, i) => {
        return {
          name: x,
          value: type === "deaths" ? data[x][iteration - 1].confirmed : data[x][iteration - 1].deaths,
          color: getColors(x),
          date: data[x][iteration - 1].date
        }
      }).filter(x => countries.some(item => item.includes(x.name)))]
      );
    }
  }


  return (
    <>
      <h1>Covid-19</h1>
      <Suspense>
        <h2>{currentData[0] && moment(currentData[0].date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</h2>
        <h2>Day {iteration + 1}</h2>
        <div className="options">
          <label>
            <input
              type="radio" name="type" value="cases"
              checked={type === "cases"}
              onChange={handleChange}
            /> Cases
          </label>
          <label>
            <input
              type="radio" name="type" value="deaths"
              checked={type === "deaths"}
              onChange={handleChange}
            /> Deaths
          </label>
        </div>
        <div className="container">
          <RacingBarChart data={currentData} type={type} />
        </div>
      </Suspense>
      <button onClick={() => setIteration(0)}>Restart</button>
      <footer>
        <div>Made by <a href="https://www.github.com/lkameya">Leo</a></div>
        <div>Data from <a href="https://github.com/pomber/covid19">@pomber</a></div>
      </footer>
    </>
  );
}

export default App;
