import data from "../about_data.json";
import '../css/timeline.css';
import React, { useEffect, useRef, useState } from 'react';

function Timeline() {
  const [activeItems, setActiveItems] = useState([]);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight } = document.documentElement;
      updateProgress(scrollTop, clientHeight);
      updateActiveItems(scrollTop, clientHeight);
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateProgress = (scrollTop, clientHeight) => {
    if (progressRef.current && timelineRef.current) {
      const timeline = timelineRef.current;
      const progress = progressRef.current;
      const timelineRect = timeline.getBoundingClientRect();
      const progressHeight = Math.min(
        Math.max(scrollTop + clientHeight / 2 - timelineRect.top, 0),
        timelineRect.height
      );
      progress.style.height = `${progressHeight}px`;
    }
  };

  const updateActiveItems = (scrollTop, clientHeight) => {
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.js-timeline_item');
      const activeItemsNew = [];
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top + scrollTop < scrollTop + clientHeight * 0.5) {
          activeItemsNew.push(index);
        }
      });
      setActiveItems(activeItemsNew);
    }
  };

  return (
    <div className="ag-timeline-block">
      <section className="ag-section">
        <div className="ag-format-container">
          <div ref={timelineRef} className="js-timeline ag-timeline">
            <div className="js-timeline_line ag-timeline_line">
              <div ref={progressRef} className="js-timeline_line-progress ag-timeline_line-progress"></div>
            </div>
            <div className="ag-timeline_list">
              {data.phases.map((phase, index) => (
                <div key={index} className={`js-timeline_item ag-timeline_item ${activeItems.includes(index) ? 'js-ag-active' : ''}`}>
                  <div className="ag-timeline-card_box">
                    <div className="js-timeline-card_point-box ag-timeline-card_point-box">
                      <div className="ag-timeline-card_point">{phase.years}</div>
                    </div>
                    <br />
                    <div className="ag-timeline-card_meta-box">
                      <div className="ag-timeline-card_meta">{phase.phase}</div>
                    </div>
                  </div>
                  <div className="ag-timeline-card_item">
                    <div className="ag-timeline-card_inner">
                      <div className="ag-timeline-card_content">
                        <div className="ag-timeline-card_img-box">
                          <img src={phase.image} className="ag-timeline-card_img" alt={phase.phase} />
                        </div>
                        <div className="ag-timeline-card_info">
                          <div className="ag-timeline-card_title">{phase.phase}</div>
                          <div className="ag-timeline-card_desc">
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', textAlign: 'left'}}>
                              {phase.description.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ag-timeline-card_arrow"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Timeline;