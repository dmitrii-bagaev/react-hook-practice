import {useState} from "react";

const options = [1, 2, 3, 4, 5, 6]

export const HomeWork1 = () => {
  const [countDice, setCountDice] = useState<number>(1);
  const [state, setState] = useState<number[] | undefined>();
  const [sum, setSum] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [visibleHistory, setVisibleHistory] = useState<boolean>(false);

  const getRandomIntInclusive = (min: number, max: number) => {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  }

  const handleChangeSelect = (e: any) => {
    setCountDice(e.target.value)
    setState(undefined);
  }

  const handleClickButton = () => {
    const randomValue = []
    for (let i = 0; i < countDice; i++) {
      randomValue.push(getRandomIntInclusive(1, 6));
    }
    setState(randomValue);
    setSum(randomValue.reduce((value, acc) => acc + value));
    setHistory([...history, randomValue.join(' ')]);
  }

  const handleClickButtonClear = () => {
    setHistory([]);
  }

  const handleClickButtonShow = () => {
    setVisibleHistory(prevState => !prevState)
  }

  return (
    <div className="wrapper">
      <div>
        <div>
          Выберите количество кубиков
          <select
            onChange={handleChangeSelect}
            value={countDice}
          >{options.map(o => <option>{o}</option>)}</select>
        </div>
        <button onClick={handleClickButton}>БРОСИТЬ КУБИК</button>
        {state && (
          <>
            <div>Выпало: <strong>{sum}</strong></div>
            {state.map(n => <span className="bigText">{n}</span>)}
          </>
        )}
      </div>
      <div className="historyBlock">
        <div>История бросков</div>
        <div>
          <button onClick={handleClickButtonShow}>{visibleHistory ? 'СКРЫТЬ' : 'ПОКАЗАТЬ'}</button>
          {visibleHistory && Boolean(history.length) && <button onClick={handleClickButtonClear}>ОЧИСТИТЬ</button>}
        </div>
        {visibleHistory && Boolean(history.length) && (
          <div className="table">
            {history.map(num => (
              <div className="cell">
                {num}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
