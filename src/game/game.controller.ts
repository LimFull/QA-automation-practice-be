import { Controller, Post, Get, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GameService } from './game.service';
import { Card, GameResult } from './types/game.types';
import { AuthGuard } from '../auth/auth.guard';
import { StartGameResponseDto, CardDto, GameResultDto } from './dto/game.dto';

@ApiTags('게임')
@ApiBearerAuth()
@Controller('game')
@UseGuards(AuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  @ApiOperation({ summary: '게임 시작', description: '새로운 게임 세션을 시작합니다.' })
  @ApiResponse({ status: 201, description: '게임 시작 성공', type: StartGameResponseDto })
  @ApiResponse({ status: 401, description: '인증 실패' })
  startGame(): { sessionId: string } {
    try {
      return this.gameService.startGame();
    } catch (error) {
      throw new HttpException('게임을 시작할 수 없습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':sessionId/cards')
  @ApiOperation({ summary: '카드 목록 조회', description: '게임에 사용될 16장의 카드 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '카드 목록 조회 성공', type: [CardDto] })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 404, description: '게임 세션을 찾을 수 없음' })
  getCards(@Param('sessionId') sessionId: string): CardDto[] {
    try {
      return this.gameService.getCards(sessionId);
    } catch (error) {
      throw new HttpException('카드를 가져올 수 없습니다.', HttpStatus.NOT_FOUND);
    }
  }

  @Post(':sessionId/complete')
  @ApiOperation({ summary: '게임 완료', description: '게임 완료를 기록하고 점수를 계산합니다.' })
  @ApiResponse({ status: 201, description: '게임 완료 성공', type: GameResultDto })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 404, description: '게임 세션을 찾을 수 없음' })
  completeGame(@Param('sessionId') sessionId: string): GameResultDto {
    try {
      return this.gameService.completeGame(sessionId);
    } catch (error) {
      throw new HttpException('게임을 완료할 수 없습니다.', HttpStatus.NOT_FOUND);
    }
  }
} 