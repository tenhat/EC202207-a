import styles from './layout.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { User } from '../types/types';
import { userAgent } from 'next/server';

// fetchでuserのlogined値を取得
export function getAllUserLogined() {
  return fetch(`http://localhost:8000/users/`)
    .then((res) => res.json())
    .then((data) => {
      return data.map((data: User) => {
        return {
          user: { logined: data.logined },
        };
      });
    });
}


// ログアウト機能（loginedがtrueのデータを取得してfalseに変更）

// const handleClick = () => {
//   fetch(
//     `http://localhost:8000/users?logined=true`,
//     {
//       method: 'GET',
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       data.logined = false;
//     });
// };






export function Layout({ children, show }: { children: any; show: boolean }) {
  // const [show, setShow] = useState("");
  // const onClickShow = () => {
  //   if (show === "") {
  //     setShow("show");
  //   } else {
  //     setShow("");
  //   }
  // }

  // userのlogined値をfalesに変換
  async function onClickLogout() {
    const users = await getAllUserLogined();
    users.logined === true;
    console.log(users);
    return fetch("http://localhost:8000/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users)
    });

  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <img src="/img_curry/header_logo.png" height={35} />
          </a>
        </Link>
        {/* <div className={styles.hamburgerMenu} onClick={onClickShow}>
          <span></span>
        </div> */}
        <div className={styles.pcHeaderNav}>
          <ul>
            <Link href="/order">
              <a>
                <li>ショッピングカート</li>
              </a>
            </Link>
            {show === true ?
              <>
                <Link href="/">
                  <a>
                    <li>注文履歴</li>
                  </a>
                </Link>
                <Link href="/posts/login">
                  <a>
                    <li>ログイン</li>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <li>
                      <button onClick={() => onClickLogout}>
                        ログアウト
                      </button>
                    </li>
                  </a>
                </Link>
              </> :
              <></>
            }
          </ul>
        </div>
      </header>
      {/* <nav id="headerNav" className={`${styles.headerNav} ${show}`}>
        <ul>
          <li>ショッピングカート</li>
          <li>注文履歴</li>
          <li>ログイン</li>
          <li>ログアウト</li>
        </ul>
      </nav> */}
      {children}
    </div>
  );
}
