import React from 'react'

export default function FeatureUser({img, alt, title, text}) {
  return (
    <div className="feature-item">
          <img src={img} alt={alt}  className="feature-icon" />
          <h3 className="feature-item-title">{title}</h3>
          <p>
           {text}
          </p>
        </div>
  )
}
