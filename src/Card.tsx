import './App.css';

import React from 'react';

import { CardLocation, CardOnField, DraggedCard } from './Card.types';
import { cardInventory } from './CardInventory';

export function Card(card: CardOnField) {
  const { frontUrl, backUrl } = cardInventory[card.cardRef];
  return (
    <div
      className="sample-card"
      style={{
        //transform: "rotate3d(0, 1, 0, 45deg)",
        transformStyle: 'preserve-3d',
        left: card.left,
        top: card.top,
      }}
      draggable="true"
      onDragStart={(ev) => {
        const draggedCard: DraggedCard = { location: CardLocation.FIELD, id: card.id };
        ev.dataTransfer.setData('text/plain', JSON.stringify(draggedCard));
        ev.dataTransfer.dropEffect = 'move';
      }}
    >
      <div
        className="card-container"
        style={{
          transform: 'rotate3d(0, 1, 0, 0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="card-front">
          <img src={frontUrl} alt={card.id} />
        </div>
        <div className="card-back">
          <img src={backUrl} alt={card.id} />
        </div>
        <div className="card-left-side card-border" />
        <div className="card-right-side card-border" />
        <div className="card-top-side card-border" />
        <div className="card-bottom-side card-border" />
      </div>
    </div>
  );
}
