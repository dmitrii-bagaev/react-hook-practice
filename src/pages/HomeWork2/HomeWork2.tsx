import {useEffect, useRef, useState} from "react";
import './styles.css'

export const HomeWork2 = () => {
  const [scrollPercent, setScrollPercent] = useState<number | undefined>(0)
  const [prevScrollPercent, setPrevScrollPercent] = useState<number | undefined>(0)
  const [positionY, setPositionY] = useState<number | undefined>(0)

  const refContainer = useRef<HTMLDivElement>(null)

  const handleOnScroll = () => {
    if (!refContainer?.current) return
    const scrollTop = refContainer.current.scrollTop || 0
    const scrollHeight = refContainer.current.scrollHeight || 0
    const height = refContainer.current.clientHeight || 0
    const scrollPercent = Math.round(scrollTop / (scrollHeight - height) * 100)
    setScrollPercent(scrollPercent)
  }

  useEffect(() => {
    refContainer.current?.addEventListener("scroll", handleOnScroll);

    return () => {
      refContainer.current?.removeEventListener("scroll", handleOnScroll);
    }
  }, []);

  useEffect(() => {
    if (!refContainer?.current) {
      return
    }
    const height = refContainer.current.clientHeight || 0
    const pos = (height - 60) * (scrollPercent || 0) / 100 + 60
    setPositionY(pos)
    setTimeout(() => {
      setPrevScrollPercent(scrollPercent)
    }, 2000)
  }, [scrollPercent])

  const visible = scrollPercent !== prevScrollPercent

  return (
    <div ref={refContainer} className="container">
      <div className="bigBlock"></div>
      <div className="fixedPosition">
        Прогресс прокрутки: {scrollPercent}%
      </div>
      <div className={`position ${visible ? 'visible' : ''}`} style={{top: `${positionY}px`}}>
        {scrollPercent}%
      </div>
    </div>
  );
};
