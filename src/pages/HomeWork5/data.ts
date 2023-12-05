export type TData = {
  id: number;
  value: string;
}

const characters = 'abcdefghij klmnopqrst uvwxyz';

const getRandomIntInclusive = (min: number, max: number) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

const getRandomValue = (minLengthStr: number, maxLengthStr: number) => {
  const lengthStr = getRandomIntInclusive(minLengthStr, maxLengthStr)
  let str = []
  for (let i = 0; i < lengthStr; i++) {
    str.push(characters[getRandomIntInclusive(0, characters.length - 1)]);
  }
  return str.join('')
}

export const getData = (lengthArray: number, minLengthStr: number, maxLengthStr: number): TData[] => {
  console.log('getData')
  let array = []
  for (let i = 0; i < lengthArray; i++) {
    const obj: TData = {
      id: i + 1,
      value: getRandomValue(minLengthStr, maxLengthStr),
    }
    array.push(obj);
  }
  return array
}
