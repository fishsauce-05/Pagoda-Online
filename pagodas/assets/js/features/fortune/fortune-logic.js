import { FLAGS } from '../../core/config/flags.js';
import { getRandomResponse } from '../../core/data/fortune.data.js';

export function isAllowedFortuneIndex(index) {
  return FLAGS.fortuneAllowedIndexes.includes(index);
}

export function createFortuneResult(questionIndex, fortuneQueries) {
  return {
    question: fortuneQueries[questionIndex].question,
    response: getRandomResponse(questionIndex)
  };
}
