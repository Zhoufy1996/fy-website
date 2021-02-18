import { Controller, Post } from '@nestjs/common';
import {
  getHotInfo,
  getQuestionInfo,
  getTranslationInfo,
} from '../scripts/leetcode';

@Controller('leetcode')
export class LeetcodeController {
  @Post('getquestions')
  async getQuestions(): Promise<any> {
    const [hotInfo, traslationInfo, questionInfo] = await Promise.all([
      getHotInfo(),
      getTranslationInfo(),
      getQuestionInfo('two-sum'),
    ]);
    return {
      hotInfo,
      traslationInfo,
      questionInfo,
    };
  }
}
