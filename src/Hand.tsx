import './App.css';

import React from 'react';

import { CardInHandProps, CardLocation, DraggedElement, DragggedElementType } from './Card.types';
import { cardInventory } from './CardInventory';

export function HandWithCards(props: { cards: Record<string, CardInHandProps> }) {
  return (
    <div className={'pov-hand'}>
      My handddd
      {Object.values(props.cards).map((card) => {
        const { frontUrl } = cardInventory[card.cardRef];
        return (
          <div
            key={card.id}
            style={{
              width: '25px',
              height: '35px',
            }}
            draggable="true"
            onDragStart={(ev) => {
              const draggedCard: DraggedElement = {
                type: DragggedElementType.CARD,
                location: CardLocation.HAND,
                id: card.id,
              };
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
                <img src={frontUrl} alt={card.cardRef} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
