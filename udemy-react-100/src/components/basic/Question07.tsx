import UserCard from '../UserCard'

function Question07() {
  const users = [
    { name: "太郎", age: 30, isActive: true },
    { name: "次郎", age: 25, isActive: false }
  ]

  return (
    <div>
      {users.map((user, index) => (
        // <UserCard key={index} name={user.name} age={user.age} isActive={user.isActive} />
        <UserCard key={index} {...user} />  //今回はスプレッド構文で
        // {/* 実務ではindexの使用は推奨されないはず */}
      ))}
    </div>
  )
}

export default Question07
