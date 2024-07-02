import { useState, useEffect } from 'react';
import data from "../about_data.json";
import SmallTimeline from "./smalltimeline";
import '../css/timeline.css';


function Timeline() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isLargeScreen) {
    return <SmallTimeline data={data} />;
  }

  return (
    <div className="timeline-wrapper">
      <div className="container" id="container">
        <div className="timeline"></div>
        <div className="entries" id="entries">
          {data.phases.map((phase, index) => (
            <div key={index} className="entry">
              <div className="dot"></div>
              <div className="label">
                <div className="time">{phase.years}</div>
                <div className="detail">{phase.phase}</div>
              </div>
              <div className="timepass">
                <ul className="description-preview">
                  {phase.description.slice(0, 2).map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                  {phase.description.length > 2 && <li>...</li>}
                </ul>
                <ul className="description-full">
                  {phase.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;