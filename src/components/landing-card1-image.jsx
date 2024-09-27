import React from 'react'
import '../css/landing-card1.css'
import all from '../home_data.js'
import Typewriter from "typewriter-effect";
import Gears from './gears';
import Flask from './flask';
import CardImage from '../../public/cards/landing-card-1.png'

const Card1 = () => {
  return (
    <div className='landing-card-1'>
        <Typewriter
          options={{
            strings: ["EXPLORE", "EXPERIMENT", "DISCOVER"],
            autoStart: true,
            loop: true,
          }}
        />
        <div className='landing-card-1--header'>
            <div className='landing-card-1--heading'>
              Explore, Experiment and Discover
            </div>
            <svg width="153" height="123" viewBox="0 0 113 123" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-0 top-6"> <g opacity="0.2" filter="url(#filter0_f_252_1350)"> <circle cx="61" cy="61.5" r="56.5" fill="white"></circle> </g> <g opacity="0.4" filter="url(#filter1_f_252_1350)"> <circle cx="61.0001" cy="61.5" r="39.4434" fill="white"></circle> </g> <circle opacity="0.4" cx="60.9999" cy="61.5001" r="23.4528" fill="white"></circle> <defs> <filter id="filter0_f_252_1350" x="0.0226417" y="0.522642" width="121.955" height="121.955" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="2.23868" result="effect1_foregroundBlur_252_1350"></feGaussianBlur> </filter> <filter id="filter1_f_252_1350" x="17.0793" y="17.5793" width="87.8415" height="87.8416" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="2.23868" result="effect1_foregroundBlur_252_1350"></feGaussianBlur> </filter> </defs> </svg>
        </div>
        <div className='landing-card-1--body' 
        >
            <div style={{flex: 2,lineHeight: '2rem'}}>
            <span>{all.shorty}</span>
            </div>
            <div style={{flex: 1, position: 'relative'}} >
              <div className='landing-card-1--body-image-container'>
                <img src={`${import.meta.env.BASE_URL}/cards/landing-card-1.png`} className='landing-card-1--body-image' style={{
                  borderRadius: '10px',
                  objectFit: 'fill',
                }}/>
              </div> 
            </div>
        </div>
    </div>
  )
}

export default Card1
