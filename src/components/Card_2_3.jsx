import React from 'react';
import '../css/linkcard.css'

const Card = ({ title, body, href, img }) => {
  return (
    <li className="link-card theme">
      <a href={href} className="has-text-centered p-1" style={{
        maxHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <h2>
          {title}
          <span>&rarr;</span>
        </h2>
        <div className="image-cont" style={{
          flex: '1',
          minHeight: '0',
          position: 'relative'
        }}>
          <img src={img} alt="image" style={{
            maxHeight: '100%',
            maxWidth: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
          }} />
        </div>
        <p>{body}</p>
      </a>
    </li>
  );
};

export default Card;