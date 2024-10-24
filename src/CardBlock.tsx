import './App.css';

import React, { useState } from 'react';

export function CardBlock(props: {
  id: string;
  frontUrl?: string;
  backUrl?: string;
  translateZpx?: number;
  rotateZdeg?: number;
}) {
  const [initialRotateZdeg] = useState(props.rotateZdeg);
  return (
    <div
      className="card-container"
      style={{
        transform: `
          ${props.translateZpx ? `translateZ(${props.translateZpx}px)` : ''}
          ${initialRotateZdeg ? `rotateZ(${initialRotateZdeg}deg)` : ''}
        `,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="card-front">
        {props.frontUrl && <img draggable="false" src={props.frontUrl} alt={props.id} />}
      </div>
      <div className="card-back">
        {props.backUrl && <img draggable="false" src={props.backUrl} alt={props.id} />}
      </div>
      <div className="card-left-side card-border" />
      <div className="card-right-side card-border" />
      <div className="card-top-side card-border" />
      <div className="card-bottom-side card-border" />
    </div>
  );
}
