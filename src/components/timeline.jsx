import React, { useState } from 'react'; // Import React
import data from "../about_data.json";
import SmallTimeline from "./smalltimeline";
import '../css/timeline.css';

function Timeline() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 1000);
  };
  
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isLargeScreen ? (
        <SmallTimeline data={data} />
      ) : (
        <div class="timeline">
          {data.phases.map((phase, index) => (
            <div key={index} className="timeline-content">
              <div className="timeline-period">{phase.years}</div>
              <div className="timeline-title">{phase.phase}</div>
              <pre>{phase.description}</pre>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Timeline;
