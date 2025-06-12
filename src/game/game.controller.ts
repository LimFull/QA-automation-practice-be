import { Controller, Post, Get, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { Card, GameResult } from './types/game.types';
import { AuthGuard } from '../auth/auth.guard';

@Controller('game')
@UseGuards(AuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  startGame(): { sessionId: string } {
    try {
      return this.gameService.startGame();
    } catch (error) {
      throw new HttpException('게임을 시작할 수 없습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':sessionId/cards')
  getCards(@Param('sessionId') sessionId: string): Card[] {
    try {
      return this.gameService.getCards(sessionId);
    } catch (error) {
      throw new HttpException('카드를 가져올 수 없습니다.', HttpStatus.NOT_FOUND);
    }
  }

  @Post(':sessionId/complete')
  completeGame(@Param('sessionId') sessionId: string): GameResult {
    try {
      return this.gameService.completeGame(sessionId);
    } catch (error) {
      throw new HttpException('게임을 완료할 수 없습니다.', HttpStatus.NOT_FOUND);
    }
  }
} 