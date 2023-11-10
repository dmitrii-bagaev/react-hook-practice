import {useMemo, useState} from "react";
import './styles.css'

const options = [1, 2, 3, 4, 5, 6]

const classList = ['numOne', 'numTwo', 'numThree', 'numFour', 'numFive', 'numSix']

export const HomeWork1 = () => {
  const [countDice, setCountDice] = useState<number>(1);
  const [state, setState] = useState<number[] | undefined>();
  const [sum, setSum] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [visibleHistory, setVisibleHistory] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

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
    setAnimation(true)
    setTimeout(() => {
      const randomValue = []
      for (let i = 0; i < countDice; i++) {
        randomValue.push(getRandomIntInclusive(1, 6));
      }
      setState(randomValue);
      setSum(randomValue.reduce((value, acc) => acc + value));
      setHistory([...history, randomValue.join(' ')]);
      setAnimation(false)
    }, 1500)
  }

  const handleClickButtonClear = () => {
    setHistory([]);
  }

  const handleClickButtonShow = () => {
    setVisibleHistory(prevState => !prevState)
  }

  const arrDice = useMemo(() => {
    const arr = []
    for (let i = 0; i < countDice; i++) {
      arr.push(i);
    }
    return arr
  }, [countDice])

  return (
    <div className="wrapper">
      <div className="actionBlock">
        <div>
          Выберите количество кубиков
          <select
            onChange={handleChangeSelect}
            value={countDice}
          >{options.map(o => <option key={o}>{o}</option>)}</select>
        </div>
        <button onClick={handleClickButton}>БРОСИТЬ КУБИК</button>
        <div className="diceContainer">
          {arrDice.map(d => (
            <div className="cubeWrapper">
              <Dice animation={animation} num={state?.[d]}/>
            </div>
          ))}\
        </div>
        {state && !animation && (
          <>
            <div>Выпало: <strong>{sum}</strong></div>
            {state.map((n, index) => <span key={index} className="bigText">{n}</span>)}
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
            {history.map((num, index) => (
              <div className="cell" key={index}>
                {num}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Dice = ({animation, num = 1}: { animation: boolean, num?: number }) => {
  const classNum = classList[num - 1]
  return (
    <div className={`dice ${animation ? 'animation' : ''} ${classNum || ''}`}>
      <div className="side one"></div>
      <div className="side two"></div>
      <div className="side three"></div>
      <div className="side four"></div>
      <div className="side five"></div>
      <div className="side six"></div>
    </div>
  )
}