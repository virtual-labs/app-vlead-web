import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "../css/theme.css";
import "../css/vlead.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Testimonials from "./testimonials";
import Timeline from "./timeline";
import {
    People_Card_Component_Past,
    People_Card_Component_Current,
} from "./people_card";
import data from "../about_data.json";

const Content = ({ type }) => {
    if (type == "past") {
        return (
            <div id="past" style={{ color: 'black' }}>
                <People_Card_Component_Past />
            </div>
        )
    }
    else if (type == "current") {
        return (
            <div id="current" style={{ color: 'black' }}>
                <People_Card_Component_Current />
            </div>
        )
    }
    else if (type == "timeline") {
        return (
            <>
                <div id="timelineContainer" class="visible">
                    <Timeline />
                </div>
            </>
        )
    }
    else if (type == "testimonials") {
        return (
            <>
                <div id="testimonialsContainer" class="visible">
                    <Testimonials />
                </div>
            </>
        )
    }
    else if (type == "init") {
        return (
            <div className="initiatives-container">
                {data.initiatives.map((initiative, i) => (
                    <div key={i} className="initiative-card">
                        <div className="initiative-image-container">
                            <img src={`/public/about-images/${i + 1}.jpeg`} alt={`Initiative ${i + 1}`} className="initiative-image" />
                        </div>
                        <div className="initiative-details">
                            <p className="initiative-description">{initiative}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export const VleadContent = () => {
    const displayDiv = document.getElementById('display-div');

    function handleAnchorClick(type) {
        const activeElements = document.querySelectorAll('.is-active');
        activeElements.forEach(element => {
            element.classList.remove('is-active');
        });

        const clickedLink = document.querySelector(`#${type}`);
        const clickedListItem = clickedLink.parentElement;
        clickedListItem.classList.add('is-active');

        displayDiv.innerHTML = '';
        const root = ReactDOM.createRoot(displayDiv);
        root.render(<Content type={type} />);
    }

    document.body.addEventListener('click', (event) => {

        const target = event.target;
        if (target.matches('#past')) {
            handleAnchorClick('past');
        } else if (target.matches('#current')) {
            handleAnchorClick('current');
        } else if (target.matches('#timeline')) {
            handleAnchorClick('timeline');
        }
        else if (target.matches('#testimonials')) {
            handleAnchorClick('testimonials');
        }
        else if (target.matches('#init')) {
            handleAnchorClick('init');
        }
    });

    useEffect(() => {
        handleAnchorClick('init');
    }, []);

}

export default VleadContent;