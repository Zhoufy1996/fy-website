import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResetDto, SaveLeetcodeDto } from './leetcode.dto';
import { LeetcodeService } from './leetcode.service';

@UseGuards(AuthGuard('jwt'))
@Controller('leetcode')
export class LeetcodeController {
  constructor(private readonly leetcodeService: LeetcodeService) {}

  @Post('getquestions')
  async getQuestions(): Promise<any> {
    const data = await this.leetcodeService.queryRetry(3);
    await this.leetcodeService.batchSave(data);
    return '';
  }

  @Post('save')
  async save(@Body() body: SaveLeetcodeDto) {
    return this.leetcodeService.save(body);
  }

  @Post('reset')
  async reset(@Body() body: ResetDto) {
    return this.leetcodeService.reset(body);
  }
}
