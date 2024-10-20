import './App.css';

import React from 'react';

import { CardPlace, CardProps } from './Card.types';
import { cardInventory } from './CardInventory';

//  const [canCameraMove, setCanCameraMove] = useState(false);
//  const [isTriggerKeyHeld, setIsTriggerKeyHeld] = useState(false);
//  const onKeyDown = useCallback((e: KeyboardEvent) => {
//    if (e.key === 's') setIsTriggerKeyHeld(true);
//  }, []);
//  const onKeyUp = useCallback((e: KeyboardEvent) => {
//    if (e.key === 's') setIsTriggerKeyHeld(false)
//  }, []);
//  window.onkeydown = onKeyDown;
//  window.onkeyup = onKeyUp;
//  useEffect(() => {
//    console.log({isTriggerKeyHeld})
//  }, [isTriggerKeyHeld])

export function Card(props: CardProps) {
  console.log({ props });
  const { frontUrl, backUrl } = cardInventory[props.id];
  return (
    <div
      className="sample-card"
      style={{
        //transform: "rotate3d(0, 1, 0, 45deg)",
        transformStyle: 'preserve-3d',
        left: props.place === CardPlace.TABLE ? props.left : undefined,
        top: props.place === CardPlace.TABLE ? props.top : undefined,
      }}
      draggable="true"
      onDragStart={(ev) => {
        ev.dataTransfer.setData('text/plain', props.id);
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
          <img src={frontUrl} alt={props.id} />
        </div>
        <div className="card-back">
          <img src={backUrl} alt={props.id} />
        </div>
        <div className="card-left-side card-border" />
        <div className="card-right-side card-border" />
        <div className="card-top-side card-border" />
        <div className="card-bottom-side card-border" />
      </div>
    </div>
  );
}
