export const CATEGORIES = {
  learning: 'learning',
  hard: 'hard',
  deleted: 'deleted',
}

export const CATEGORIES_WORDS = {
  [CATEGORIES.learning]: {
    filter: {'$and':[{'userWord.difficulty':{'$in':['normal', 'easy']}, 'userWord.optional.mode': {'$not': {'$eq':'deleted'}}}]},
    text: 'Изучаемые',
  },
  [CATEGORIES.hard]: {
    filter: {'$and':[{'userWord.difficulty':'hard', 'userWord.optional.mode': {'$not': {'$eq':'deleted'}}}]},
    text: 'Сложные',
  },
  [CATEGORIES.deleted]: {
    filter: {'userWord.optional.mode':{'$eq':'deleted'}},
    text: 'Удаленные',
  },
}

export const SORTING_OPTIONS = {
  prescription: {
    text: 'давности',
    nameFunction: 'getlastUpdateDate',
  },
  repetition: {
    text: 'повторам',
    nameFunction: 'getRepeatCount',
  },
  alphabet: {
    text: 'алфавиту',
    nameFunction: 'getWord',
  },
}

