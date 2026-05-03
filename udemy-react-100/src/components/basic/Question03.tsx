function Introduction() {
  const name = "田中太郎";
  const age = 25;
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <p>私は{name}です。{age}歳です。今年は{currentYear}年です。</p>
    </div>
  );
}

export default Introduction;
