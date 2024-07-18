import data from "../about_data.json";
import '../css/timeline.css';
import React, { useEffect } from 'react';
// import $ from 'jquery';

function Timeline() {
  const $ = window.jQuery;
  useEffect(() => {
    $(function () {
      $(window).on('scroll', function () {
        fnOnScroll();
      });

      $(window).on('resize', function () {
        fnOnResize();
      });
      var agTimeline = $('.js-timeline'),
        agTimelineLine = $('.js-timeline_line'),
        agTimelineLineProgress = $('.js-timeline_line-progress'),
        agTimelinePoint = $('.js-timeline-card_point-box'),
        agTimelineItem = $('.js-timeline_item'),
        agOuterHeight = $(window).outerHeight(),
        agHeight = $(window).height(),
        f = -1,
        agFlag = false;

      function fnOnScroll() {
        var agPosY = $(window).scrollTop();

        fnUpdateFrame();
      }

      function fnOnResize() {
        var agPosY = $(window).scrollTop();
        agHeight = $(window).height();

        fnUpdateFrame();
      }

      function fnUpdateWindow() {
        agFlag = false;

        agTimelineLine.css({
          top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
          bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
        });

        f !== $(window).scrollTop() && (f = $(window).scrollTop(), agHeight, fnUpdateProgress());
      }

      function fnUpdateProgress() {
        var agPosY = $(window).scrollTop();
        var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;

        var i = agTop + agPosY - $(window).scrollTop();
        var a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
        var n = agPosY - a + agOuterHeight / 2;
        i <= agPosY + agOuterHeight / 2 && (n = i - a);
        agTimelineLineProgress.css({ height: n + "px" });

        agTimelineItem.each(function () {
          var agTop = $(this).find(agTimelinePoint).offset().top;

          (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
        })
      }

      function fnUpdateFrame() {
        agFlag || requestAnimationFrame(fnUpdateWindow);
        agFlag = true;
      }

      fnOnScroll();
    });
  }, []);

  return (
    <div className="ag-timeline-block">
      <section className="ag-section">
        <div className="ag-format-container">
          <div className="js-timeline ag-timeline">
            <div className="js-timeline_line ag-timeline_line">
              <div className="js-timeline_line-progress ag-timeline_line-progress"></div>
            </div>
            <div className="ag-timeline_list">
              {data.phases.map((phase, index) => (
                <div key={index} className="js-timeline_item ag-timeline_item">
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
                            <ul>
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