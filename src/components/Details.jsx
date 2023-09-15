import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const auth = "994fbd785097a24aced5094b7f2f77c3";

const Details = () => {
  const predictions = useSelector((state) => state.days.content);
  const [info, setInfo] = useState([]);

  const fiveDays = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${predictions[0][0].lat}&lon=${predictions[0][0].lon}&appid=${auth}`
      );
      if (response.ok) {
        const data = await response.json();
        setInfo(data.list);
      } else {
        alert("Could not get forecast");
      }
    } catch (error) {
      alert("Could not get forecast, " + error.message);
    }
  };

  useEffect(() => {
    fiveDays();
  }, []);

  return (
    <Row className="main">
      <Col md={10}>
        <h2 className="p-4 fs-5 m-3 text-light bg-secondary fw-bold rounded bg-opacity-50 text-center">
          FOR THE NEXT HOURS:
        </h2>
        {info.map((day) => {
          return (
            <>
              <p className="p-4 fs-5 m-3 text-light bg-secondary rounded bg-opacity-50">
                {day.dt_text}, {day.weather[0].description}
              </p>
            </>
          );
        })}
      </Col>
    </Row>
  );
};

export default Details;
