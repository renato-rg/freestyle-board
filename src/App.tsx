import './App.css';

import React, { MouseEventHandler, useEffect, useRef, useState, WheelEventHandler } from 'react';

import { Card } from './Card';
import { CardPlace, CardProps, CardTablePosition } from './Card.types';

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
  const MIN_SCALE = 0.1;

  const MAX_ROTATE_X = -7; // Lowest vertical POV
  const MIN_ROTATE_X = -80; // Highest vertical POV

  const MAX_ROTATE_Y = 50; // Max left horizontal POV
  const MIN_ROTATE_Y = -50; // Max right horizontal POV

  // Move somewhere else, separated from camera logic
  const [fieldCards, setFieldCards] = useState<CardProps[]>([]);

  const resetCamera = () => {
    setScale(0.4);
    setMouseMovePosition(null);
    setRotateXDegrees(-60);
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
  }, []);

  return (
    <div
      className="App"
      style={{ userSelect: 'none' }}
      onMouseMove={onMouseMove}
      onWheel={onWheel as unknown as WheelEventHandler<HTMLDivElement>}
    >
      <div className={'pov-hand'}>
        My handddd
        <Card {...{ id: 'test1', place: CardPlace.HAND }} />
        <Card {...{ id: 'test2', front: '', back: '', place: CardPlace.HAND }} />
        <Card {...{ id: 'test3', front: '', back: '', place: CardPlace.HAND }} />
      </div>

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
              console.log('onDrop', ev);
              ev.preventDefault();
              // Get the id of the target and add the moved element to the target's DOM
              const cardId = ev.dataTransfer.getData('text/plain');

              const { clientX, clientY } = ev;
              const { left, width, top, height } = (
                ev.target as HTMLElement
              ).getBoundingClientRect();
              const horizontal = (((clientX - left) / width) * 100).toFixed(2);
              const vertical = (((clientY - top) / height) * 100).toFixed(2);

              setFieldCards((prevState) => [
                ...prevState,
                {
                  id: cardId,
                  place: CardPlace.TABLE,
                  position: CardTablePosition.DOWN_ATK,
                  left: `${horizontal}%`,
                  top: `${vertical}%`,
                },
              ]);
            }}
            onDragOver={(ev) => {
              console.log('onDragOver', ev);
              ev.preventDefault();
              ev.dataTransfer.dropEffect = 'move';
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

            {fieldCards.map((cardProps) => (
              <Card {...cardProps} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
