import { useState } from "react";

type ModeType = "card" | "list" | "grid";

// アイテム1個分
type CardListType = {
  id: number;
  title: string;
  description: string;
};

// props 全体の形
type CardItemType = {
  items: CardListType[];
};

// 個別の表示コンポーネント
function CardView({ items }: CardItemType) {
  return (
    <div className="card-view">
      {items.map((item) => (
        <div key={item.id} className="card">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function ListView({ items }: CardItemType) {
  return (
    <ul className="list-view">
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.title}:</strong> {item.description}
        </li>
      ))}
    </ul>
  );
}

function GridView({ items }: CardItemType) {
  return (
    <div className="grid-view">
      {items.map((item) => (
        <div key={item.id} className="grid-item">
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

function ViewModeSwitcher() {
  const [viewMode, setViewMode] = useState<ModeType>("card"); // card, list, grid

  const items = [
    { id: 1, title: "アイテム1", description: "説明1" },
    { id: 2, title: "アイテム2", description: "説明2" },
    { id: 3, title: "アイテム3", description: "説明3" },
  ];

  const renderContent = () => {
    switch (viewMode) {
      case "card":
        return <CardView items={items} />;
      case "list":
        return <ListView items={items} />;
      case "grid":
        return <GridView items={items} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>表示モード切り替え</h2>

      <div className="mode-selector">
        <button
          onClick={() => setViewMode("card")}
          className={viewMode === "card" ? "active" : ""}
        >
          カード
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={viewMode === "list" ? "active" : ""}
        >
          リスト
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={viewMode === "grid" ? "active" : ""}
        >
          グリッド
        </button>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default ViewModeSwitcher;
