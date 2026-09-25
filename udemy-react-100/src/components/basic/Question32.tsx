import { useState } from "react";

const getAgeColor = (age: number) => {
  if (age < 20) return "red";
  if (age < 60) return "green";
  return "blue";
};

function UserCards() {
  const [users] = useState([
    { id: 1, name: "田中太郎", age: 20, email: "tanaka@example.com" },
    { id: 2, name: "鈴木花子", age: 18, email: "suzuki@example.com" },
    { id: 3, name: "佐藤次郎", age: 65, email: "sato@example.com" },
    { id: 4, name: "高橋美咲", age: 32, email: "takahashi@example.com" },
  ]);

  const userList = users.map((user) => (
    <div
      key={user.id}
      className="user-card"
      style={{
        backgroundColor: getAgeColor(user.age),
      }}
    >
      <p>{user.name}</p>
      <p>{user.age}</p>
      <p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>
    </div>
  ));

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <div className="user-cards">{userList}</div>
    </div>
  );
}

export default UserCards;
