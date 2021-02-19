import { Controller, Post } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';

@Controller('leetcode')
export class LeetcodeController {
  constructor(private readonly leetcodeService: LeetcodeService) {}

  @Post('getquestions')
  async getQuestions(): Promise<any> {
    const data = await this.leetcodeService.queryRetry(3);
    await this.leetcodeService.batchSave(data);
    return '';
  }
}
