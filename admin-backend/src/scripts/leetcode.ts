/**
 * 1. 获取leetcode-hot-100信息
 * 2. 获取中文翻译
 * 3. 根据titleSlug 查题目信息
 */
import Axios from 'axios';

interface HotInfo {
  stat: {
    question_id: number;
    question__title_slug: string;
  };
  difficulty: {
    level: number; // 1 2 3
  };
}

interface translationInfo {
  questionId: number;
  title: string; // title
}

interface QuestionInfo {
  translatedContent: string;
  topicTags: {
    translatedName: string;
    slug: string;
  };
}

export const getHotInfo = async () => {
  const res = await Axios.get(
    'https://leetcode-cn.com/api/problems/favorite_lists/leetcode-hot-100/',
    {
      headers: {
        origin: 'https://leetcode-cn.com',
      },
    },
  );
  const data: HotInfo[] = res.data.stat_status_pairs;
  return data;
};

export const getTranslationInfo = async () => {
  const res = await Axios.post(
    'https://leetcode-cn.com/graphql',
    {
      operationName: 'getQuestionTranslation',
      variables: {},
      query:
        'query getQuestionTranslation($lang: String) {  translations: allAppliedQuestionTranslations(lang: $lang) {    title    questionId      }}',
    },
    {
      headers: {
        origin: 'https://leetcode-cn.com',
      },
    },
  );
  const data: translationInfo[] = res.data.data.translations;
  return data;
};

// two-sum
export const getQuestionInfo = async (titleSlug: string) => {
  const res = await Axios.post(
    'https://leetcode-cn.com/graphql',
    {
      operationName: 'questionData',
      variables: { titleSlug },
      query:
        'query questionData($titleSlug: String!) { question(titleSlug: $titleSlug) {   translatedContent     topicTags {     name     slug    translatedName      __typename    }}}',
    },
    {
      headers: {
        origin: 'https://leetcode-cn.com',
      },
    },
  );
  const data: QuestionInfo = res.data.data.question;
  return data;
};
