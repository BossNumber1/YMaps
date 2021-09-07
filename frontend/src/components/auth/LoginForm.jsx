import axios from "axios";
import React from "react";
import styles from "../../styles/Forms.module.css";

const LoginForm = ({ setPassedAuthorization }) => {
    const authHandler = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:80/comparison/", {
                login: document.getElementById("loginForRegistration").value,
                password: document.getElementById("passwordForRegistration")
                    .value,
            })
            .then((resultat) => {
                localStorage.setItem("login", resultat.data.login);
                localStorage.setItem("token", resultat.data.token);
                localStorage.removeItem("exited");
                setPassedAuthorization(true);
            })
            .catch((error) => {
                alert(error.response.data);
            });
    };

    return (
        <div>
            <form className={styles.main_form}>
                <h1 className={styles.title}>Вход</h1>
                <input
                    type="text"
                    id="loginForRegistration"
                    placeholder="Логин"
                    className={styles.input}
                />
                <input
                    type="password"
                    id="passwordForRegistration"
                    placeholder="Пароль"
                    className={styles.input}
                />
                <div className={styles.btn_div}>
                    <button
                        type="submit"
                        onClick={authHandler}
                        className={styles.btn}
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
