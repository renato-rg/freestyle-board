export enum CardLocation {
  HAND = 'HAND',
  FIELD = 'FIELD',
  DECK = 'DECK',
}

export enum CardOnFieldPosition {
  UP_ATK = 'UP_ATK',
  UP_DEF = 'UP_DEF',
  DOWN_ATK = 'DOWN_ATK',
  DOWN_DEF = 'DOWN_DEF',
}

export interface CardInHandProps {
  location: CardLocation.HAND;
  id: string;
  cardRef: string;
  index: number;
}

export interface CardOnFieldProps {
  location: CardLocation.FIELD;
  id: string;
  cardRef: string;
  position: CardOnFieldPosition;
  left: string;
  top: string;
}

export interface CardInDeckProps {
  location: CardLocation.DECK;
  id: string;
  cardRef: string;
  index: number;
}

export type CardProps = CardInHandProps | CardOnFieldProps | CardInDeckProps;

export enum DragggedElementType {
  CARD = 'CARD',
  DECK = 'DECK',
}

export type DraggedElement =
  | {
      type: DragggedElementType.CARD;
      location: CardLocation;
      id: string;
    }
  | {
      type: DragggedElementType.DECK;
      id: string;
    };
