import React, { useEffect, useState } from 'react'
import '../css/landing-card2.css'
import all from '../home_data.json'
import Card from './Card'

const data = all.domains

const Card2 = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState(null)

  useEffect(() => {
    const checkUrlFragment = () => {
      const fragment = window.location.hash.slice(1)
      if (fragment) {
        const matchedDomain = data.find(item => item.frag === fragment)
        if (matchedDomain) {
          setPopupContent(matchedDomain)
          setShowPopup(true)
        }
      }
    }

    checkUrlFragment()
    window.addEventListener('hashchange', checkUrlFragment)

    return () => {
      window.removeEventListener('hashchange', checkUrlFragment)
    }
  }, [])

  const closePopup = () => {
    setShowPopup(false)
    setPopupContent(null)
    window.history.pushState("", document.title, window.location.pathname + window.location.search)
  }

  return (
    <div className='landing-card-2'>
      <div className='landing-card-2--header'>
        <div className='landing-card-2--heading'>
          Our Domains
        </div>
        <svg width="140" height="104" viewBox="0 0 140 104" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-2 top-8">
          <svg width="140" height="104" viewBox="0 0 140 104" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-2 top-8"> <g opacity="0.2" filter="url(#filter0_f_247_1221)"> <rect opacity="0.5" x="6" y="27.5371" width="109.983" height="70.8367" rx="3.67159" fill="white"></rect> <path opacity="0.5" d="M115.983 31.9433C115.983 33.971 114.339 35.6149 112.312 35.6149L9.67157 35.6149C7.64381 35.6149 5.99998 33.971 5.99999 31.9433L5.99999 31.2086C5.99999 29.1808 7.64381 27.537 9.67158 27.537L112.312 27.537C114.339 27.537 115.983 29.1808 115.983 31.2086L115.983 31.9433Z" fill="white"></path> </g> <g opacity="0.4" filter="url(#filter1_f_247_1221)"> <rect opacity="0.5" x="17.9326" y="16.082" width="109.983" height="70.8367" rx="3.67159" fill="white"></rect> <path opacity="0.5" d="M130.67 16.8167C130.67 18.8445 129.026 20.4883 126.998 20.4883L24.358 20.4883C22.3302 20.4883 20.6864 18.8444 20.6864 16.8167L20.6864 16.082C20.6864 14.0542 22.3302 12.4104 24.358 12.4104L126.998 12.4104C129.026 12.4104 130.67 14.0542 130.67 16.082L130.67 16.8167Z" fill="white"></path> </g> <g opacity="0.5"> <path d="M140 9L30 8.99999L30 3.67159C30 1.64383 31.6438 6.39452e-08 33.6716 2.41218e-07L136.328 9.21576e-06C138.356 9.39304e-06 140 1.64384 140 3.6716L140 9Z" fill="white"></path> <rect opacity="0.5" x="30" width="109.983" height="70.8367" rx="3.67159" fill="white"></rect> </g> <circle opacity="0.4" cx="37" cy="5" r="2" fill="white"></circle> <circle opacity="0.4" cx="43" cy="5" r="2" fill="white"></circle> <circle opacity="0.4" cx="49" cy="5" r="2" fill="white"></circle> <defs> <filter id="filter0_f_247_1221" x="0.395727" y="21.9327" width="121.192" height="82.0453" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="2.80214" result="effect1_foregroundBlur_247_1221"></feGaussianBlur> </filter> <filter id="filter1_f_247_1221" x="13.4492" y="7.92698" width="121.704" height="83.4751" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="2.24171" result="effect1_foregroundBlur_247_1221"></feGaussianBlur> </filter> </defs> </svg>
        </svg>
      </div>
      <div className='landing-card-2--body'>
        <swiper-container
          class="mySwiper"
          navigation="true"
          pagination="true"
          effect="coverflow"
          grab-cursor="true"
          centered-slides="true"
          slides-per-view="4"
          coverflow-effect-rotate="25"
          coverflow-effect-stretch="0"
          coverflow-effect-depth="50"
          coverflow-effect-modifier="1"
          pagination-dynamic-bullets="true"
          keyboard="true"
          loop="true"
          id="domains"
        >
          {
            data.map((item, i) => {
              return (
                <swiper-slide key={i} class="common_domains" id={item.title}>
                  <div>
                    <Card
                      img={item.img}
                      href={`#${item.frag}`}
                      body=""
                      title={item.title}
                    />
                  </div>
                </swiper-slide>
              );
            })
          }
        </swiper-container>
      </div>
      {showPopup && popupContent && (
        <div className="popup">
          <div className="popup-content">
            <button className="popup-close" onClick={closePopup}>&times;</button>
            <h2>{popupContent.title}</h2>
            <img src={popupContent.img} alt={popupContent.title} />
            <p>{popupContent.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card2