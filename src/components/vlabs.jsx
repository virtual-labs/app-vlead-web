import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "../css/vlabs.css";
import "../css/theme.css";
import "../css/vlead.css";
import "../css/testimonials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import data from "../about_data.json";
import Faqs from "./faqs.jsx";


function Testimonials() {
    return (
        <div className="testimonial-container">
            <div className="testimonial-scroll">
                {data.testimonials.map((t, i) => (
                    <div key={i} className="testimonial-card">
                        <span className="icon">
                            <FontAwesomeIcon icon={faQuoteLeft} />
                        </span>
                        <span className="testimonial-text">{t.description}</span>
                        <span className="icon">
                            <FontAwesomeIcon icon={faQuoteRight} />
                        </span>
                        <p className="testimonial-author">- {t.author}<br />{t.inst}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ObjContainer() {
    return (
        <div className="objectives-philosophy">
            <h1 className="section-title"><strong>Goals</strong></h1>
            <ul className="list">
                {data.objectives.map((objective, i) => (
                    <li key={i} className="list-item">{objective}</li>
                ))}
            </ul>
            <h1 className="section-title"><strong>Philosophy</strong></h1>
            <p className="description">{data.philosophy.description}</p>
            <ul className="list">
                {data.philosophy.points.map((point, i) => (
                    <li key={i} className="list-item">{point}</li>
                ))}
            </ul>
            <p className="conclusion">{data.philosophy.conclusion}</p>
        </div>
    )
}

function InstContainer() {
    return (
        <div className="institutes">
            <div className="institutes-container">
                <div className="institutes-grid">
                    {data.institutes.map((institute, index) => (
                        <a href={institute.url} target="_blank">
                            <div key={index} className="institute-card">
                                <div className="image-container">
                                    <img src={institute.image} alt={institute.title} className="overview-image" />
                                </div>
                                <div className="institute-info">
                                    <h2 className="institute-title">{institute.title}</h2>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

function OvwContainer() {
    return (
        <div className="purpose-card">
            <h1 className="purpose-title">Overview</h1>
            <p className="purpose-description">{data.overview.description}</p>
            <h3 className="beneficiaries-title"><strong>Stakeholders</strong></h3>
            <div className="grid-container">
                {data.overview.points.map((point, i) => (
                    <div key={i} className="grid-item">
                        <img src={point.image} alt={point.title} className="overview-image" />
                        <div className="content">
                            <h2 className="title">{point.title}</h2>
                        </div>
                        <div className="description">
                            <p><strong style={{ color: 'white' }}>{point.title}</strong></p>
                            <p>{point.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Content = ({ type }) => {
    if (type == "obj") {
        return <ObjContainer />
    }
    else if (type == "inst") {
        return <InstContainer />
    }
    else if (type == "ovw") {
        return <OvwContainer />
    }
    else if (type == "testimonials") {
        return <Testimonials />
    }
    else if (type == "faq") {
        return (
            <Faqs />
        )
    }
}

export const VlabsContent = () => {
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

    function handleInitialHash() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            handleAnchorClick(hash);
        } else {
            console.log('No hash in URL');
            handleAnchorClick('ovw');
        }
    }

    useEffect(() => {
        handleInitialHash();

        const handleClick = (event) => {
            const target = event.target;
            const types = ['obj', 'inst', 'ovw', 'testimonials', 'faq'];

            for (const type of types) {
                if (target.matches(`#${type}`) || target.closest(`#${type}`)) {
                    handleAnchorClick(type, event);
                    break;
                }
            }
        };

        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        };
    }, []);

}

export default VlabsContent;