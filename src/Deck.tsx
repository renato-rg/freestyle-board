import './App.css';

import React, { useMemo } from 'react';

import { CardInHandProps, CardLocation, DraggedElement, DragggedElementType } from './Card.types';
import { CardBlock } from './CardBlock';
import { cardBack, cardInventory } from './CardInventory';

export function Deck(props: { left: string; top: string; length: number }) {
  return (
    <div
      id="DECK1"
      className="sample-card"
      style={{
        //transform: "rotate3d(0, 1, 0, 45deg)",
        transformStyle: 'preserve-3d',
        left: props.left,
        top: props.top,
      }}
      draggable="true"
      onDragStart={(ev) => {
        const draggedDeck: DraggedElement = {
          type: DragggedElementType.DECK,
          id: 'DECK1',
        };
        ev.dataTransfer.setData('text/plain', JSON.stringify(draggedDeck));
        ev.dataTransfer.dropEffect = 'move';
      }}
    >
      {Array.from({ length: props.length }).map((_, index) => {
        const randomRotateZDeg = Math.random() * 4;
        return (
          <CardBlock
            id={'de'}
            frontUrl={cardBack.DEFAULT}
            translateZpx={index * 2}
            rotateZdeg={randomRotateZDeg}
          />
        );
      })}
    </div>
  );
}
