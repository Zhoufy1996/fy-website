import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getHotInfo,
  getQuestionInfo,
  getTranslationInfo,
} from 'src/scripts/leetcode';
import { Repository } from 'typeorm';
import { LeetcodeEntity, Level } from './leetcode.entity';

const LevelMap = {
  1: Level.SIMPLE,
  2: Level.MEDIUM,
  3: Level.DIFFICULTY,
};

@Injectable()
export class LeetcodeService {
  constructor(
    @InjectRepository(LeetcodeEntity)
    private readonly leetcodeRepository: Repository<LeetcodeEntity>,
  ) {}

  async getQuestionsInfo(): Promise<LeetcodeEntity[]> {
    const [hotInfo, traslationInfo] = await Promise.all([
      getHotInfo(),
      getTranslationInfo(),
    ]);
    hotInfo.reverse();
    const result: LeetcodeEntity[] = hotInfo.map((info) => {
      const q = new LeetcodeEntity();
      q.questionId = info.stat.question_id;
      q.titleSlug = info.stat.question__title_slug;
      q.level = LevelMap[info.difficulty.level] || Level.SIMPLE;
      q.title = traslationInfo.find(
        (data) => data.questionId === `${q.questionId}`,
      ).title;
      return q;
    });
    return result;
  }

  async queryQusetionsContent(data: LeetcodeEntity[]) {
    let result: LeetcodeEntity[] = [];
    const queryOne = async (index: number) => {
      try {
        const q = await getQuestionInfo(data[index].titleSlug);
        result = [
          ...result,
          {
            ...data[index],
            questionContent: q.translatedContent,
            tags: q.topicTags.map((t) => t.translatedName),
            codes: [],
          },
        ];
      } catch (e) {
      } finally {
        if (index < data.length - 1) {
          await queryOne(index + 1);
        }
      }
    };
    await queryOne(0);
    return result;
  }

  async queryRetry(count: number) {
    let time = count;
    let shoudlQueryData = await this.getQuestionsInfo();
    let result: LeetcodeEntity[] = [];
    const queryOne = async () => {
      if (time > 0) {
        time -= 1;
        const qs = await this.queryQusetionsContent(shoudlQueryData);
        const successIds = qs.map((item) => item.questionId);
        const _shoudlQueryData = shoudlQueryData.filter((item) => {
          return !successIds.includes(item.questionId);
        });
        result = [...result, ...qs];
        shoudlQueryData = _shoudlQueryData;
        if (shoudlQueryData.length > 0) {
          await queryOne();
        }
      }
    };

    await queryOne();
    return result;
  }

  async batchSave(data: LeetcodeEntity[]) {
    return this.leetcodeRepository.save(data);
  }
}
