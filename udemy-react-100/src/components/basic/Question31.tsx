import { useState } from "react";

function FruitList() {
  const [fruits] = useState([
    "りんご",
    "バナナ",
    "オレンジ",
    "ぶどう",
    "いちご",
  ]);

  const listItems = fruits.map((fruit, index) => (
    <li key={fruit}>
      {index + 1}.{fruit}
    </li>
  ));

  return (
    <div>
      <h2>果物リスト</h2>
      <ul>{listItems}</ul>
    </div>
  );
}

export default FruitList;
