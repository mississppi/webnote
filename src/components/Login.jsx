import { signInWithPopup, signInAnonymously } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import btn_google from "../assets/btn_google_signin_light_normal_web.png"
import "./Login.css";

const Login = ({ setIsAuth }) => {
    const navigate = useNavigate();
    const LoginInWithGoogle = () => {
        //google login
        signInWithPopup(auth, provider).then((result) => {
            navigate("/");
        });
    }

    const LoginInWithAnonymous = () => {
        signInAnonymously(auth)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/");
        })
        .catch((error) => {
            // エラーハンドリング
            console.log('匿名ログインエラー', error);
        });
    }

  return (
    <div className="app-login-container">
        <div className="app-login">
            <h2>ノート</h2>
            <button onClick={LoginInWithGoogle}><img src={btn_google} /></button>
            <button className="anonymous-login" onClick={LoginInWithAnonymous}>テストでログイン</button>
        </div>
    </div>
  )
}

export default Login