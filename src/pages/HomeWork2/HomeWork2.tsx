import {useCallback, useEffect, useRef, useState} from "react";
import './styles.css'

const Widget = () => {
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null)
  const [scrollPercent, setScrollPercent] = useState<number | undefined>(0)

  // для плавающего виджета
  const [prevScrollPercent, setPrevScrollPercent] = useState<number | undefined>(0)
  const [positionY, setPositionY] = useState<number | undefined>(0)

  const refContainer = useRef<HTMLDivElement>(null)

  // вычисляем процент скрола
  const handleOnScroll = useCallback(() => {
    if (!targetRef) return
    const scrollTop = targetRef.scrollTop || 0
    const scrollHeight = targetRef.scrollHeight || 0
    const height = targetRef.clientHeight || 0
    const scrollPercent = Math.round(scrollTop / (scrollHeight - height) * 100)
    setScrollPercent(scrollPercent)
  }, [targetRef])

  useEffect(() => {
    // находим ближайший родительский элемент со скролом
    const findScroll = () => {
      let el = refContainer.current
      const checkScroll = () => {
        if (!el) {
          return
        }
        if (el.scrollHeight > el.clientHeight) {
          return
        } else {
          el = el.parentElement as HTMLDivElement
          checkScroll()
        }
      }
      checkScroll()
      return el;
    }

    const elWithScroll = findScroll()

    setTargetRef(elWithScroll)

    elWithScroll?.addEventListener("scroll", handleOnScroll);

    return () => {
      elWithScroll?.removeEventListener("scroll", handleOnScroll);
    }
  }, [handleOnScroll]);

  // для плавающего виджета
  useEffect(() => {
    if (!targetRef) {
      return
    }
    const height = targetRef.clientHeight || 0
    const pos = (height - 60) * (scrollPercent || 0) / 100 + 10
    setPositionY(pos)
    setTimeout(() => {
      setPrevScrollPercent(scrollPercent)
    }, 2000)
  }, [scrollPercent, targetRef])

  const visible = scrollPercent !== prevScrollPercent

  return (
    <div ref={refContainer} >
      <div className="fixedPosition">
        Прогресс прокрутки: {scrollPercent}%
      </div>
      {/*плавающий виджет*/}
      <div className={`position ${visible ? 'visible' : ''}`} style={{top: `${positionY}px`}}>
        {scrollPercent}%
      </div>
    </div>
  );
}

export const HomeWork2 = () => {
  return (
    <div>
      <Widget/>
      <div className="bigBlock"></div>
    </div>
    )
};
