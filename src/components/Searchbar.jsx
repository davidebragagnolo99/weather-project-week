import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import thermometer from "../assets/img/thermometer.png";
import clearsky from "../assets/img/clearsky.png";
import windlogo from "../assets/img/windlogo.png";
import citylogo from "../assets/img/citylogo.png";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const auth = "994fbd785097a24aced5094b7f2f77c3";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState([]);
  const [weather, setWeather] = useState([]);
  const [sky, setSky] = useState("");
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${auth}`);
      if (response.ok) {
        const data = await response.json();
        setCity(data);
        dispatch({ type: "DAYS", payload: data });
      } else {
        alert("Error fetching results 1");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const weatherFetch = async () => {
    try {
      const weatherObj = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city[0].lat}&lon=${city[0].lon}&appid=${auth}&units=metric`
      );
      if (weatherObj.ok) {
        const weatherData = await weatherObj.json();
        setWeather(weatherData);
        setSky(weatherData.weather[0].main);
        setTemp(weatherData.main.temp);
        setWind(weatherData.wind.speed);
      } else {
        alert("Error fetching results 2");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    weatherFetch();
  }, [city]);

  return (
    <Container className="main">
      <Row>
        <Col xs={10} className="mx-auto m-3 text-center">
          <img src={logo} alt="logo" className="img-fluid" width="200px" />
          <h1 className="p-4 m-3 text-light bg-secondary rounded bg-opacity-50">Look for your city weather!</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control type="search" value={search} onChange={handleChange} placeholder="Enter your city here..." />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto m-3">
          {weather && (
            <>
              <p className="p-4 fs-5 m-3 text-light bg-secondary rounded bg-opacity-50">
                <img className="me-2" src={citylogo} alt="city-logo" width="40px" />
                Selected city:{" "}
                <Link to={`/cityDetails`} className="text-decoration-none">
                  {weather.name}
                </Link>
              </p>
              <p className="p-4 fs-5 m-3 text-light bg-secondary rounded bg-opacity-50">
                <img className="me-2" src={clearsky} alt="sky-logo" width="40px" /> Sky: {sky}
              </p>
              <p className="p-4 fs-5 m-3 text-light bg-secondary rounded bg-opacity-50">
                <img className="me-2" src={windlogo} alt="wind-logo" width="40px" /> Wind speed: {wind} km/h
              </p>
              <p className="p-4 fs-5 m-3 text-light bg-secondary rounded bg-opacity-50">
                <img className="me-2" src={thermometer} alt="temperature-logo" width="40px" /> Temperature: {temp} °C
              </p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Searchbar;
