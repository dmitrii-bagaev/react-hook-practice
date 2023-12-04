import {useMemo} from "react";
import './styles.css'

const getRandomIntInclusive = (min: number, max: number) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

const useRef = (init: HTMLButtonElement | null) =>
  useMemo(() => {
    const button = (el: HTMLButtonElement) => {
      button.current = el
    }
    button.current = init
    return button
  }, [])

export const HomeWork4 = () => {
  const ref = useRef(null)

  const handleOnClick = () => {
    console.log('handleOnClick')
    if (!ref.current) return
    ref.current.style.backgroundColor =
      `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}`
  }

  console.log('render')

  return (
    <div className="container">
      <button ref={ref} onClick={handleOnClick}>
        КНОПКА
      </button>
    </div>
  )
};
