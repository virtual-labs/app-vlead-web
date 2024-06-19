import React, { useState, useEffect } from "react";
import "../css/testimonials.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "./loader";
import "@fortawesome/fontawesome-free/css/all.min.css";

const id = "1SUOs97mV0MUgad0shGq2Kfpl24RHyvSjtbzR4VrrRjM";
const gid = "1581174192";
const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}`;

export default function Testimonials() {
  const [sheetdata, setSheetdata] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.text();

        const startIndex = jsonData.indexOf('{"version":"0.6"');
        const endIndex = jsonData.lastIndexOf('}') + 1;
        const jsonString = jsonData.substring(startIndex, endIndex);
        const parsedData = JSON.parse(jsonString);

        const extractedTestimonials = parsedData.table.rows.map((row) => {
          const [associationType, , testimonial] = row.c;
          return { associationType: associationType.v, testimonial: testimonial.v };
        });

        setSheetdata(extractedTestimonials);
        setLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % sheetdata.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 4 + sheetdata.length) % sheetdata.length);
  };

  return (
    <>
      {loaded ? (
        <div className="testimonial-container">
          <div className="testimonial-scroll">
            {sheetdata.slice(currentIndex, currentIndex + 4).map((data, i) => (
              <div key={i} className="testimonial-card">
                <span className="icon">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </span>
                <span className="testimonial-text">{data.testimonial}</span>
                <span className="icon">
                  <FontAwesomeIcon icon={faQuoteRight} />
                </span>
                <p className="testimonial-author">- {data.associationType}</p>
              </div>
            ))}
          </div>
          <div className="testimonial-navigation">
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
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