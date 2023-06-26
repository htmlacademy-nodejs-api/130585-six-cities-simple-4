import dayjs from 'dayjs';

export const getRandomNumberFromInterval = (min: number, max: number, toFixed = 0) => (
  Number((min + Math.random() * (max - min)).toFixed(toFixed))
);

export const getRandomItem = <T>(items: T[]): T => (
  items[getRandomNumberFromInterval(0, items.length - 1)]
);

export const getRandomItems = <T>(items: T[], count?: number): T[] => {
  const itemsCount = count || getRandomNumberFromInterval(0, items.length - 1);
  const resultItems: T[] = [];

  for (let itemIndex = 0; itemIndex < itemsCount; itemIndex++) {
    resultItems.push(getRandomItem<T>(items));
  }

  return resultItems;
};

export const getRandomDate = (daysBefore: number) => {
  const from = dayjs().subtract(daysBefore, 'day').valueOf();
  const today = dayjs().valueOf();
  const randomDateInMs = getRandomNumberFromInterval(from, today);

  return dayjs(randomDateInMs).toISOString();
};

export const getRandomBoolean = () => (
  getRandomNumberFromInterval(0, 1)
);
