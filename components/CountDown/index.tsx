import { FC, useEffect, useState } from "react";

interface CountDownProps{
  time: number;
  onEnd: Function;
}
const CountDown: FC<CountDownProps> = ({time, onEnd})=>{
  const [count, setCount] = useState(time || 60)
  useEffect(()=>{
    const _timer = setInterval(()=>{
      if (count === 0){
        clearInterval(_timer)
        onEnd()
      }
      setCount(count-1)
    },1000)
  })
  return (
    <div style={{color: 'gray'}}>{`${count} 秒后重新发送`}</div>
  )
}

export default CountDown;