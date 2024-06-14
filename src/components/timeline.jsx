import React from 'react'; // Import React
import data from "../about_data.json";
import '../css/timeline.css';

function Timeline() {
  return (
    <div className="timeline" id="timeline-container">
      {/* Map over phases array */}
      {data.phases.map((phase, index) => (
        <ul key={index}>
          <li>
            <span>{phase.years}</span>
            <div className="content">
              <h3>{phase.phase}</h3>
              <pre>{phase.description}</pre>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Timeline;
