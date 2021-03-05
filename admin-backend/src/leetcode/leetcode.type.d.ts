import { CodeLanguage, QuestionStatus } from './leetcode.entity';

interface SaveProps {
  id: number;

  status: QuestionStatus;

  alalysis: string;

  language: CodeLanguage;

  description: string;

  codes: string[];
}

interface RestProps {
  id: number;
}
