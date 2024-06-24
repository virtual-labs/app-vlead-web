import React, { useState, useEffect } from "react";
import "../css/testimonials.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "./loader";
import "@fortawesome/fontawesome-free/css/all.min.css";

const url = "https://script.google.com/macros/s/AKfycbzvYgAwebXfLnmcN0PJmK9AqApj_eeCOqL_J-s25nCkhV-5QKXrxOTUMjHJCSnJTSlu/exec";

export default function Testimonials() {
  const [sheetdata, setSheetdata] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const FetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const extractedTestimonials = data.map((row) => {
        const [associationType, year, testimonial] = row;
        return { associationType, year, testimonial };
      });

      setSheetdata(extractedTestimonials);
      setLoaded(true);
    };
    FetchData();
  }, []);

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
        </div>
      ) : (
        <div style={{ height: "100vh" }}>
          <Loader />
        </div>
      )}
    </>
  );
}