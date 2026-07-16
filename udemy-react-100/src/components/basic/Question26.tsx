import { useState } from "react";

function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("ゲスト");

  const handleLogin = () => {
    setUsername("田中太郎");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("ゲスト");
  };

  return (
    <div>
      <h2>ログイン状態管理</h2>

      {isLoggedIn &&
        <>
          <p>{username}さん、ようこそ</p>
          <button
            type="button"
            onClick={handleLogout}
          >
            ログアウト
          </button>
        </>
      }

      {!isLoggedIn &&
        <button
          type="button"
          onClick={handleLogin}
        >
          ログイン
        </button>
      }

    </div>
  );
}

export default LoginStatus;
