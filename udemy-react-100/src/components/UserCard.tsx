interface UserCardProps {
  name: string;
  age: number;
  isActive: boolean;
}

function UserCard({ name, age, isActive }: UserCardProps) {
  return (
    <div className="user-card">
      {name}
      {age}
      {isActive ? "アクティブ" : "非アクティブ"}
    </div>
  );
}
// こちらの方が好きなのでこっちで

// function UserCard(props: UserCardProps) {
//   return (
//     <div className="user-card">
//       {props.name}
//       {props.age}
//       {props.isActive ? "アクティブ" : "非アクティブ"}
//     </div>
//   );
// }

export default UserCard;
