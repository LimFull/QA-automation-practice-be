import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Card, GameSession, GameResult } from './types/game.types';

@Injectable()
export class GameService {
  private sessions: Map<string, GameSession> = new Map();

  private readonly cardValues = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'
  ];

  startGame(): { sessionId: string } {
    const cards: Card[] = this.generateCards();
    const sessionId = uuidv4();
    
    this.sessions.set(sessionId, {
      id: sessionId,
      startTime: new Date(),
      cards,
      isCompleted: false,
    });

    return { sessionId };
  }

  getCards(sessionId: string): Card[] {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Game session not found');
    }
    return session.cards;
  }

  completeGame(sessionId: string): GameResult {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Game session not found');
    }

    const endTime = new Date();
    const timeSpentSeconds = (endTime.getTime() - session.startTime.getTime()) / 1000;
    
    // 점수 계산 로직: 60초를 기준으로 빠를수록 높은 점수
    const baseScore = 1000;
    const score = Math.max(0, Math.round(baseScore * (1 - timeSpentSeconds / 60)));

    session.isCompleted = true;

    return {
      score,
      timeSpentSeconds,
      message: this.getScoreMessage(score),
    };
  }

  private generateCards(): Card[] {
    // 카드 쌍 생성
    const cards: Card[] = [];
    this.cardValues.forEach((value, index) => {
      // 각 값을 두 번씩 추가
      cards.push({ id: index * 2, value });
      cards.push({ id: index * 2 + 1, value });
    });

    // 카드 섞기 (Fisher-Yates 알고리즘)
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
  }

  private getScoreMessage(score: number): string {
    if (score >= 900) return '대단해요! 완벽한 기억력이네요! 🏆';
    if (score >= 700) return '훌륭해요! 아주 잘했어요! 🌟';
    if (score >= 500) return '좋아요! 잘 해냈어요! 👍';
    if (score >= 300) return '괜찮아요! 다음에는 더 잘할 수 있을 거예요! 😊';
    return '연습하면 더 좋은 점수를 얻을 수 있을 거예요! 💪';
  }
} 