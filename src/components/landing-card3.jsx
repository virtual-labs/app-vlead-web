import React from 'react'
import '../css/landing-card3.css'
import all from '../home_data.js'
import Card from './Card_2_3'

const services = all.services

const Card3 = () => {
  
  return (
    <div className='landing-card-3'>
        <div className='landing-card-3--header'>
            <div className='landing-card-3--heading'>
                Our Activities
            </div>
            {/* <svg width="105" height="119" viewBox="0 0 105 119" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2 top-6"> <g opacity="0.5"> <g opacity="0.2" filter="url(#filter0_f_252_1342)"> <rect x="6.00012" y="23.8284" width="73.0131" height="89.1717" rx="1.55917" fill="white"></rect> </g> <g opacity="0.4" filter="url(#filter1_f_252_1342)"> <rect x="17.6938" y="13.6938" width="72.4146" height="89.1717" rx="1.55917" fill="white"></rect> </g> <g opacity="0.5" filter="url(#filter2_f_252_1342)"> <path d="M29.6553 3.55917C29.6553 2.69807 30.3534 2 31.2145 2H84.8723C85.2751 2 85.6623 2.15589 85.9527 2.43501L102.19 18.0399C102.496 18.3338 102.668 18.7398 102.668 19.164V89.6125C102.668 90.4736 101.97 91.1717 101.109 91.1717H31.2145C30.3534 91.1717 29.6553 90.4736 29.6553 89.6125V3.55917Z" fill="white"></path> </g> <g filter="url(#filter3_f_252_1342)"> <path d="M83 3.64376L83 19.4408C83 20.3019 83.6981 21 84.5592 21L101.108 21C102.515 21 103.203 19.2842 102.185 18.313L85.6357 2.51593C84.6435 1.56883 83 2.2721 83 3.64376Z" fill="white"></path> </g> </g> <defs> <filter id="filter0_f_252_1342" x="0.0154452" y="17.8437" width="84.9824" height="101.141" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="2.99234" result="effect1_foregroundBlur_252_1342"></feGaussianBlur> </filter> <filter id="filter1_f_252_1342" x="12.9061" y="8.90611" width="81.99" height="98.7471" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="2.39387" result="effect1_foregroundBlur_252_1342"></feGaussianBlur> </filter> <filter id="filter2_f_252_1342" x="28.0962" y="0.440834" width="76.1314" height="92.29" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="0.779583" result="effect1_foregroundBlur_252_1342"></feGaussianBlur> </filter> <filter id="filter3_f_252_1342" x="81.4408" y="0.522377" width="22.7891" height="22.0368" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="0.779583" result="effect1_foregroundBlur_252_1342"></feGaussianBlur> </filter> </defs> </svg> */}
        </div>
        <div className='landing-card-3--body' style={{margin: 10}}>
            <div style={{
                width: '100%',
                display: 'flex',
                columnGap: '1rem',
                flexWrap: 'wrap',
                rowGap: '1rem'
             }}
            >
            {
                services.map((item, i) => {
                return (
                    <div style={{flex: 1}}>
                    <Card
                    img={item.img}
                    href={item.href}
                    body=""
                    title={item.title}
                    style={{height: '50% !important'}}
                    />
                    </div>
                    
                );
                })
            }
            </div>
        </div>
      
    </div>
  )
}

export default Card3
