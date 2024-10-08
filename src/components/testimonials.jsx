import React, { useState, useEffect } from "react";
import "../css/testimonials.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "./loader";
import "@fortawesome/fontawesome-free/css/all.min.css";

// const url = "https://script.google.com/macros/s/AKfycbzvYgAwebXfLnmcN0PJmK9AqApj_eeCOqL_J-s25nCkhV-5QKXrxOTUMjHJCSnJTSlu/exec";
const url = "https://script.google.com/macros/s/AKfycbyGnquiCXAdpFSJaJo2mJDB5wDfRPh_p67L98FzCaYboOWzsMYYLiJ0vpeh9FP0nrdMXw/exec?q=testimonials";

export default function Testimonials() {
  const [sheetdata, setSheetdata] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const FetchData = async () => {
    const response = await fetch(url);
    const responseData = await response.json();
    const data = responseData.data;

    const extractedTestimonials = data.map((row) => {
      const [associationType, year, testimonial] = row;
      return { associationType, year, testimonial };
    });

    setSheetdata(extractedTestimonials);
    setLoaded(true);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const ViewMore = () => {
    setLoaded(false);
    FetchData();
  };

  return (
    <>
      {loaded ? (
        <div className="testimonial-container">
          <div className="testimonial-scroll">
            {sheetdata.map((data, i) => (
              <div key={i} className="testimonial-card">
                <span className="icon">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </span>
                <span className="testimonial-text">{data.testimonial}</span>
                <span className="icon">
                  <FontAwesomeIcon icon={faQuoteRight} />
                </span>
                <p className="testimonial-author">- {data.associationType}, {data.year}</p>
              </div>
            ))}
          </div>
          <div className="testimonial-navigation">
            <button onClick={ViewMore}>View More</button>
          </div>
        </div>
      ) : (
        <div style={{ height: "100vh" }}>
          <Loader />
        </div>
      )}
    </>
  );
}