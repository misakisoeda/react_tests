import Greeting from "../Greeting"

function Question06() {
  const names = ["太郎", "次郎", "三郎"];

  return (
    <div>
      {names.map((names, index) => (
        <Greeting key={index} name={names} />
      ))}
      {/* 実務ではindexの使用は推奨されないはず */}
    </div>
  )
}

export default Question06
