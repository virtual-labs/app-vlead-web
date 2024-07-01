import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Devcontent } from "./Devcontent";
import Faqs from "./faqs";
import '../css/faq.css';

const Content = ({ url, type }) => {
    if (type == "markdown") {
        return (
            <Devcontent url={url} />
        )
    }
    else if (type == "iframe") {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <iframe style={{ width: '100vw', height: '90vh' }} src={url} allowFullScreen></iframe>
            </div>
        )
    }
    else if (type == "faq") {
        return (
            <>
                <Faqs type="outreach" />
            </>
        )
    }
}

export const OutreachContent = () => {
    const displayDiv = document.getElementById('display-div');
    const galDiv = document.getElementById('GAL');

    function handleInitialHash() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const correspondingAnchor = document.querySelector(`a[href="#${hash}"]`);
            if (correspondingAnchor) {
                const nearestSpan = correspondingAnchor.querySelector('span');
                if (nearestSpan) {
                    nearestSpan.click();
                    console.log(nearestSpan);
                } else {
                    correspondingAnchor.click();
                    console.log(correspondingAnchor);
                }
            } else {
                console.log('No corresponding anchor found');
            }
        } else {
            console.log('No hash in URL');
        }
    }

    useEffect(() => {
        handleInitialHash();
    }, []);

    function ChangeActiveClass(event) {
        const activeElements = document.querySelectorAll('.is-active');
        activeElements.forEach(element => {
            element.classList.remove('is-active');
        });

        const clickedLink = event.target;
        const clickedListItem = clickedLink.closest('li');
        clickedListItem.classList.add('is-active');
    }

    function handleAnchorClick(event, type) {
        // event.preventDefault();
        showMarkdownDisplay();
        ChangeActiveClass(event);
        const url = event.target.dataset.category;
        displayDiv.innerHTML = '';
        const root = ReactDOM.createRoot(displayDiv);
        root.render(<Content url={url} type={type} />);
    }

    document.body.addEventListener('click', (event) => {
        const target = event.target;
        console.log(target);
        if (target.matches('#markdown_display')) {
            handleAnchorClick(event, 'markdown');
        } else if (target.matches('#iframe')) {
            handleAnchorClick(event, 'iframe');
        } else if (target.matches('#faq')) {
            handleAnchorClick(event, 'faq');
        }
    });

    const galleryLink = document.getElementById('gallery');
    galleryLink.addEventListener('click', showGallery);

    function showGallery() {
        displayDiv.style.display = 'none';
        ChangeActiveClass(event);
        galDiv.style.display = 'block';
    }

    function showMarkdownDisplay() {
        displayDiv.style.display = 'block';
        galDiv.style.display = 'none';
    }
}

export default OutreachContent;