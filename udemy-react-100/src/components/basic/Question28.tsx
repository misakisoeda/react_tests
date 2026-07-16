import { useState } from "react";

type UserRole = 'guest' | 'user' | 'admin'

function PermissionControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("guest"); // guest, user, admin
  const [showDetails, setShowDetails] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoggedIn(e.target.checked)
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
  }

  const handleShowDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDetails(e.target.checked)
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>権限管理システム</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={isLoggedIn}
            onChange={handleLoginChange}
          />
          ログイン状態
        </label>

        <label>
          権限レベル:
          <select
            style={{ marginLeft: "5px" }}
            value={userRole}
            onChange={handleUserChange}
          >
            <option value="guest">ゲスト</option>
            <option value="user">一般ユーザー</option>
            <option value="admin">管理者</option>
          </select>
        </label>
      </div>

      {/* 基本情報（全員表示） */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          margin: "10px 0",
        }}
      >
        <h3>公開情報</h3>
        <p>誰でも見られる情報です</p>
      </div>

      {isLoggedIn &&
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px 0",
          }}
        >
          ログインユーザーのみ
        </div>
      }

      {isLoggedIn && (userRole === 'user' || userRole === 'admin') &&
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px 0",
          }}
        >
          一般ユーザー以上
        </div>
      }

      {isLoggedIn && userRole === 'admin' &&
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px 0",
          }}
        >
          管理者
          <label>
            <input
              type="checkbox"
              checked={showDetails}
              onChange={handleShowDetailChange}
            />
              詳細を見る
          </label>
        </div>
      }

      {isLoggedIn && userRole === 'admin' && showDetails &&
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px 0",
          }}
        >
          詳細情報
        </div>
      }
    </div>
  );
}

export default PermissionControl;
