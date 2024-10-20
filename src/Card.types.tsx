export enum CardPlace {
  TABLE = 'TABLE',
  HAND = 'HAND',
}

export enum CardTablePosition {
  UP_ATK = 'UP_ATK',
  UP_DEF = 'UP_DEF',
  DOWN_ATK = 'DOWN_ATK',
  DOWN_DEF = 'DOWN_DEF',
}

export type CardProps =
  | {
      id: string;
      place: CardPlace.TABLE;
      position: CardTablePosition;
      left: string;
      top: string;
    }
  | {
      id: string;
      place: CardPlace.HAND;
    };
