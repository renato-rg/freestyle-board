import './App.css';

import React from 'react';

import { CardLocation, CardOnFieldProps, DraggedElement, DragggedElementType } from './Card.types';
import { CardBlock } from './CardBlock';
import { cardInventory } from './CardInventory';

export function CardOnField(card: CardOnFieldProps) {
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
        const draggedCard: DraggedElement = {
          type: DragggedElementType.CARD,
          location: CardLocation.FIELD,
          id: card.id,
        };
        ev.dataTransfer.setData('text/plain', JSON.stringify(draggedCard));
        ev.dataTransfer.dropEffect = 'move';
      }}
    >
      <CardBlock id={card.id} frontUrl={frontUrl} backUrl={backUrl} />
    </div>
  );
}
