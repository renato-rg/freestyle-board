import './App.css';

import React, { MouseEventHandler, useEffect, useState, WheelEventHandler } from 'react';

import { Card } from './Card';
import {
  CardInHand,
  CardLocation,
  CardOnField,
  CardOnFieldPosition,
  DraggedCard,
} from './Card.types';
import { HandWithCards } from './Hand';

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

function App() {
  const [scale, setScale] = useState(0.4);

  // Vertical position. Lower the number, higher on screen
  const [mouseMovePosition, setMouseMovePosition] = useState<{
    initialClientX: number;
    initialClientY: number;
  } | null>(null);
  const [rotateXDegrees, setRotateXDegrees] = useState(-13);
  const [rotateYDegrees, setRotateYDegrees] = useState(-8);

  const MAX_SCALE = 3.9;
  const MIN_SCALE = 0.3;

  const MAX_ROTATE_X = -7; // Lowest vertical POV
  const MIN_ROTATE_X = -90; // Highest vertical POV

  const MAX_ROTATE_Y = 0; // Max left horizontal POV
  const MIN_ROTATE_Y = 0; // Max right horizontal POV

  const [deck, setDeck] = useState([]);
  const [oponentDeck, setOponentDeck] = useState([]);

  const [handCards, setHandCards] = useState<Record<string, CardInHand>>({});
  const [oponentHandCards, setOponentHandCards] = useState<CardInHand[]>([]);

  const [fieldCards, setFieldCards] = useState<Record<string, CardOnField>>({});

  const resetCamera = () => {
    setScale(0.4);
    setMouseMovePosition(null);
    setRotateXDegrees(-70);
    setRotateYDegrees(-0);
  };

  const onMouseMove: MouseEventHandler = (e) => {
    if (e.buttons !== 1 || !e.metaKey) {
      setMouseMovePosition(null);
    } else {
      if (!mouseMovePosition) {
        setMouseMovePosition({
          initialClientX: e.clientX,
          initialClientY: e.clientY,
        });
        return;
      }

      const { initialClientX, initialClientY } = mouseMovePosition;
      const { clientX, clientY } = e;

      setRotateXDegrees((prev) => {
        const delta = (initialClientY - clientY) / 100;
        let newValue = prev + delta;
        if (newValue < MIN_ROTATE_X) newValue = MIN_ROTATE_X;
        if (newValue > MAX_ROTATE_X) newValue = MAX_ROTATE_X;
        return newValue;
      });

      setRotateYDegrees((prev) => {
        const delta = (initialClientX - clientX) / 300;
        let newValue = prev - delta;
        if (newValue < MIN_ROTATE_Y) newValue = MIN_ROTATE_Y;
        if (newValue > MAX_ROTATE_Y) newValue = MAX_ROTATE_Y;
        return newValue;
      });
    }
  };

  const onWheel = (e: Record<string, unknown>) => {
    const deltaY = e.deltaY;
    if (typeof deltaY === 'number' && deltaY !== 0) {
      console.log(deltaY);
      setScale((prev) => {
        const fraction = deltaY / 300;
        let newVal = prev + fraction;
        if (newVal < MIN_SCALE) newVal = MIN_SCALE;
        if (newVal > MAX_SCALE) newVal = MAX_SCALE;
        return newVal;
      });
    }
  };

  useEffect(() => {
    resetCamera();

    const id1 = Date.now().toString();
    const id2 = (Date.now() + 1).toString();
    const id3 = (Date.now() + 2).toString();
    setHandCards({
      [id1]: { location: CardLocation.HAND, id: id1, cardRef: 'test1', index: 0 },
      [id2]: {
        location: CardLocation.HAND,
        id: id2,
        cardRef: 'test2',
        index: 1,
      },
      [id3]: { location: CardLocation.HAND, id: id3, cardRef: 'test3', index: 2 },
    });
  }, []);

  return (
    <div
      className="App"
      style={{ userSelect: 'none' }}
      onMouseMove={onMouseMove}
      onWheel={onWheel as unknown as WheelEventHandler<HTMLDivElement>}
    >
      <HandWithCards cards={handCards} />

      <div style={{ transition: 'all 0.3s', transform: `scale(${scale})` }}>
        <div
          className="App-header"
          style={{
            transition: 'all 0.3s',
            transform: `
              perspective(130cm)
              rotateX(${rotateXDegrees}deg)
              rotateY(${rotateYDegrees}deg)
              rotateZ(0deg)
              translate3d(0px, 0cm, 0px)
            `,
            transformStyle: 'preserve-3d' as const,
            perspectiveOrigin: 'center',
          }}
        >
          <div
            className="bottom"
            onDrop={(ev) => {
              ev.preventDefault();
              const draggedCard: DraggedCard = JSON.parse(ev.dataTransfer.getData('text/plain'));

              const { clientX, clientY } = ev;
              const { left, width, top, height } = (
                ev.target as HTMLElement
              ).getBoundingClientRect();
              const horizontal = (((clientX - left) / width) * 100).toFixed(2);
              const vertical = (((clientY - top) / height) * 100).toFixed(2);

              if (draggedCard.location === CardLocation.FIELD) {
                setFieldCards((prevState) => ({
                  ...prevState,
                  [draggedCard.id]: {
                    ...prevState[draggedCard.id],
                    left: `${horizontal}%`,
                    top: `${vertical}%`,
                  },
                }));
              } else if (draggedCard.location === CardLocation.HAND) {
                const cardInHand = handCards[draggedCard.id];
                setFieldCards((prevState) => ({
                  ...prevState,
                  [draggedCard.id]: {
                    id: draggedCard.id,
                    location: CardLocation.FIELD,
                    cardRef: cardInHand.cardRef,
                    position: CardOnFieldPosition.DOWN_DEF,
                    left: `${horizontal}%`,
                    top: `${vertical}%`,
                  },
                }));
              }
            }}
            onDragOver={(ev) => {
              console.log('onDragOver', ev);
              ev.preventDefault();
              ev.dataTransfer.dropEffect = 'link';
            }}
            style={{
              transform: 'rotateX(90deg) translateY(0%)',
              transformOrigin: 'center',
              transformStyle: 'preserve-3d' as const,
            }}
          >
            <div className="App-link" onClick={resetCamera}>
              Reset Camera
            </div>

            {Object.keys(fieldCards).map((cardId) => {
              const fieldCard = fieldCards[cardId];
              return <Card {...fieldCard} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
