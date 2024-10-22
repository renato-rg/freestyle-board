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

export interface CardInHand {
  location: CardLocation.HAND;
  id: string;
  cardRef: string;
  index: number;
}

export interface CardInHand {
  location: CardLocation.HAND;
  id: string;
  cardRef: string;
  index: number;
}

export interface CardOnField {
  location: CardLocation.FIELD;
  id: string;
  cardRef: string;
  position: CardOnFieldPosition;
  left: string;
  top: string;
}

export interface CardInDeck {
  location: CardLocation.DECK;
  id: string;
  cardRef: string;
  index: number;
}

export type CardProps = CardInHand | CardOnField | CardInDeck;

export interface DraggedCard {
  location: CardLocation;
  id: string;
}
