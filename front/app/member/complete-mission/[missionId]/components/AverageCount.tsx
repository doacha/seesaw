interface Props {
  value: number
}

const AverageCount = (props: Props) => {
  const counter = (value: number) => {
    let now = value
    const counter = document.querySelector('#count')

    const handle = setInterval(() => {
      if (counter)
        counter.innerHTML = `평균 ${Math.ceil(value - now).toLocaleString()} 원`

      // 목표수치에 도달하면 정지
      if (now < 1) {
        clearInterval(handle)
      }

      // 증가되는 값이 계속하여 작아짐
      const step = now / 10

      // 값을 적용시키면서 다음 차례에 영향을 끼침
      now -= step
    }, 10)
  }

  counter(props.value)

  return <div id="count">0</div>
}

export default AverageCount
