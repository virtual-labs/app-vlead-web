import React from 'react';
import '../css/linkcard.css'

const Card = ({ title, body, href, img }) => {
  return (
    <li className="link-card theme">
      <a href={href} className="has-text-centered p-1">
        <h2>
          {title}
          <span>&rarr;</span>
        </h2>
        <div className="image-cont">
          <img src={img} alt="image" />
        </div>
        <p>{body}</p>
      </a>
    </li>
  );
};

export default Card;