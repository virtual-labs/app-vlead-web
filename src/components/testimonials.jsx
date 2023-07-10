import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "./loader";
import "@fortawesome/fontawesome-free/css/all.min.css";
{/* <style>
.testi dark{

}
</style> */}
export default function Testimonials() {
  const [sheetdata, setSheetdata] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetch_func = async () => {
      const url =
        "https://script.google.com/macros/s/AKfycbzapvDQRF3bY8dm5MYFVWqFjg83NibzZy0Dsid9VnucIxwCohPRxGMVTImgGoYjvrs/exec?q=testimonials";
      const response = await fetch(url);
      const info = await response.json();
      const data = info.data.data;
      setSheetdata(data);
      setLoaded(true);
    };
    fetch_func();
  }, []);

  return (
    <>
      {loaded ? (
        <>
          {Object.values(sheetdata).map((c, i) => {
            return (
              <div key={i} className="has-text-black testi" style={{ marginBottom: "3rem" , color:"black!important"}}>
                <span className="icon">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </span>
                <span
                  style={{
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                    lineHeight: "2",
                  }}
                >
                  {c[2]}
                </span>
                <span className="icon">
                  <FontAwesomeIcon icon={faQuoteRight} />
                </span>
                <p style={{ textAlign: "right", width: "100%" }}>
                  {"- " + c[0] + " " + c[1]}
                </p>
              </div>
            );
          })}
        </>
      ) : (
        <div style={{ height: "100vh" }}>
          <Loader />
        </div>
      )}
    </>
  );
}
