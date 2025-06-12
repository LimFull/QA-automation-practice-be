export interface Card {
  id: number;
  value: string;
}

export interface GameSession {
  id: string;
  startTime: Date;
  cards: Card[];
  isCompleted: boolean;
}

export interface GameResult {
  score: number;
  timeSpentSeconds: number;
  message: string;
} 