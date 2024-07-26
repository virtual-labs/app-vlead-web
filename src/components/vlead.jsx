import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "../css/theme.css";
import "../css/vlead.css";
import "../css/initiative.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import Testimonials from "./testimonials";
import Timeline from "./timeline";
import {
    People_Card_Component_Past,
    People_Card_Component_Current,
} from "./people_card";
import data from "../about_data.json";

function InitiativesContainer() {
    const [activeToggle, setActiveToggle] = useState('users');

    const handleToggleChange = (event) => {
        setActiveToggle(event.target.value);
    };

    return (
        <div className="main-container">
            <div className="tw-toggle">
                <input id="users" type="radio" name="toggle" value="users" checked={activeToggle === 'users'} onChange={handleToggleChange} />
                <label htmlFor="users" className="toggle toggle-yes">User Tools</label>
                <input id="developer" type="radio" name="toggle" value="developer" checked={activeToggle === 'developer'} onChange={handleToggleChange} />
                <label htmlFor="developer" className="toggle toggle-yes">Developer Tools</label>
                <input id="vlead" type="radio" name="toggle" value="vlead" checked={activeToggle === 'vlead'} onChange={handleToggleChange} />
                <label htmlFor="vlead" className="toggle toggle-yes">VLEAD Tools</label>
                <span className="slider"></span>
            </div>
            <br />

            {activeToggle === 'users' && (
                <div className="initiatives-container">
                    {data.initiatives.users.map((initiative, i) => (
                        <div key={i} className="initiative-card" style={{ backgroundColor: '#f5f5f5' }}>
                            <div className="initiative-image-container">
                                <img
                                    src={initiative.url}
                                    alt={`Initiative ${i + 1}`}
                                    className="initiative-image"
                                />
                            </div>
                            <div className="initiative-details">
                                <p className="initiative-description" style={{ color: 'black' }}><strong>{initiative.title}</strong>{initiative.description}</p>
                                <a target="_blank" href={initiative.readmore}>Read More</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeToggle === 'developer' && (
                <div className="initiatives-container">
                    {data.initiatives.developers.map((initiative, i) => (
                        <div key={i} className="initiative-card" style={{ backgroundColor: '#0071c5' }}>
                            <div className="initiative-image-container">
                                <img
                                    src={initiative.url}
                                    alt={`Initiative ${i + 1}`}
                                    className="initiative-image"
                                />
                            </div>
                            <div className="initiative-details">
                                <p className="initiative-description" style={{ color: 'white' }}><strong style={{ color: 'white' }}>{initiative.title}</strong>{initiative.description}</p>
                                <a href={initiative.readmore} style={{ color: '#D5FFFF' }}>Read More</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeToggle === 'vlead' && (
                <div className="initiatives-container">
                    {data.initiatives.team.map((initiative, i) => (
                        <div key={i} className="initiative-card" style={{ backgroundColor: '#27ae60' }}>
                            <div className="initiative-image-container">
                                <img
                                    src={initiative.url}
                                    alt={`Initiative ${i + 1}`}
                                    className="initiative-image"
                                />
                            </div>
                            <div className="initiative-details">
                                <p className="initiative-description" style={{ color: 'white' }}><strong style={{ color: 'white' }}>{initiative.title}</strong>{initiative.description}</p>
                                <a href={initiative.readmore} style={{ color: '#ADF802' }}>Read More</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function PurposeContainer() {
    return (
        <div className="purpose-card">
            <h1 className="purpose-title">Our Purpose</h1>
            <p className="purpose-description">{data.purpose.intro}</p>
            <div className="grid-container">
                {data.purpose.points.map((point, i) => (
                    <div className="grid-item">
                        <img src={point.image} alt={point.title} className="overview-image" />
                        <div className="content">
                            <h2 className="title">{point.title}</h2>
                        </div>
                        <div className="description">
                            <p><strong style={{color: 'white'}}>{point.title}</strong></p>
                            <p>{point.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

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
        return <InitiativesContainer />
    }
    else if (type == "purpose") {
        return <PurposeContainer />
    }
}

export const VleadContent = () => {
    const displayDiv = document.getElementById('display-div');

    function handleAnchorClick(type, event) {
        if (event) {
            event.preventDefault();
            
            const newUrl = `${window.location.pathname}#${type}`;
            history.pushState(null, '', newUrl);
        }

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
            handleAnchorClick('past', event);
        } else if (target.matches('#current')) {
            handleAnchorClick('current', event);
        } else if (target.matches('#timeline')) {
            handleAnchorClick('timeline', event);
        } else if (target.matches('#testimonials')) {
            handleAnchorClick('testimonials', event);
        } else if (target.matches('#init')) {
            handleAnchorClick('init', event);
        } else if (target.matches('#purpose')) {
            handleAnchorClick('purpose', event);
        }
    });

    useEffect(() => {
        handleAnchorClick('purpose');
    }, []);

    function handleInitialHash() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            handleAnchorClick(hash);
        } else {
            console.log('No hash in URL');
        }
    }

    useEffect(() => {
        handleInitialHash();
    }, []);

}

export default VleadContent;