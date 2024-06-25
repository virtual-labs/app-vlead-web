import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "../css/vlabs.css";
import "../css/theme.css";
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
            <h1 className="section-title">Objectives</h1>
            <ul className="list">
                {data.objectives.map((objective, i) => (
                    <li key={i} className="list-item">{objective}</li>
                ))}
            </ul>
            <h1 className="section-title">Philosophy</h1>
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
        <div className="institutes-container">
            <div className="institutes-grid">
                {data.institutes.map((institute, index) => (
                    <a href={institute.url} target="_blank">
                        <div key={index} className="institute-card">
                            <img
                                src={institute.image}
                                alt={institute.title}
                                className="institute-image"
                            />
                            <div className="institute-info">
                                <h2 className="institute-title">{institute.title}</h2>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

function OvwContainer() {
    return (
        <div className="overview-container">
            <div className="overview-description">
                <h2 className="overview-title">Overview</h2>
                <p className="overview-text">{data.overview.description}</p>
            </div>

            <div className="beneficiaries-section">
                <h3 className="beneficiaries-title">Beneficiaries</h3>
                <ul className="beneficiaries-list">
                    {data.overview.beneficiaries.map((beneficiary, i) => (
                        <li key={i} className="beneficiary-item">
                            <span className="beneficiary-icon">✓</span>
                            {beneficiary}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="requirements-section">
                <p className="requirements-text">{data.overview.requirements}</p>
            </div>
        </div>)
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
        if (target.matches('#obj')) {
            handleAnchorClick('obj');
        } else if (target.matches('#inst')) {
            handleAnchorClick('inst');
        } else if (target.matches('#ovw')) {
            handleAnchorClick('ovw');
        }
        else if (target.matches('#testimonials')) {
            handleAnchorClick('testimonials');
        }
        else if (target.matches('#faq')) {
            handleAnchorClick('faq');
        }
    });

    useEffect(() => {
        handleAnchorClick('ovw');
    }, []);

}

export default VlabsContent;