import { ApiProperty } from '@nestjs/swagger';

export class StartGameResponseDto {
  @ApiProperty({
    description: '게임 세션 ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6'
  })
  sessionId: string;
}

export class CardDto {
  @ApiProperty({
    description: '카드의 고유 ID',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: '카드의 이모지 값',
    example: '🐶'
  })
  value: string;
}

export class GameResultDto {
  @ApiProperty({
    description: '게임 점수 (0-1000)',
    example: 850
  })
  score: number;

  @ApiProperty({
    description: '게임 완료까지 걸린 시간 (초)',
    example: 45.5
  })
  timeSpentSeconds: number;

  @ApiProperty({
    description: '점수에 따른 피드백 메시지',
    example: '훌륭해요! 아주 잘했어요! 🌟'
  })
  message: string;
} 