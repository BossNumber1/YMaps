import React from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import styles from "../../styles/Forms.module.css";

function RegistrationForm({ setPassedAuthorization }) {
    const [showAuth, setShowAuth] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem("login")) {
            setPassedAuthorization(true);
        } else {
            if (localStorage.getItem("exited") === "true") {
                setShowAuth(true);
            }
        }
    }, [setPassedAuthorization]);

    const submitHandler = (e) => {
        e.preventDefault();

        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;

        axios
            .post("http://localhost:80/getUserData/", {
                login: login,
            })
            .then(() => {
                alert(
                    "Пользователь с таким логином существует, можете попробовать другой..."
                );
            })
            .catch(() => {
                axios
                    .post("http://localhost:80/auth/", {
                        login: login,
                        password: password,
                    })
                    .then((res) => {
                        axios.post("http://localhost:80/transferId/", {
                            id: JSON.parse(res.data).id,
                        });

                        setShowAuth(true);
                    });
            });
    };

    return (
        <>
            {!showAuth ? (
                <>
                    <div style={{ textAlign: "center" }}>
                        В данном приложении можно сохранять места на карте.
                    </div>
                    <form className={styles.main_form}>
                        <h1 className={styles.title}>Регистрация</h1>
                        <div>
                            <input
                                type="text"
                                id="login"
                                placeholder="Логин"
                                className={styles.input}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Пароль"
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.btn_div}>
                            <input
                                type="submit"
                                value="Зарегистрироваться"
                                onClick={submitHandler}
                                className={styles.btn}
                            />
                        </div>
                    </form>
                </>
            ) : (
                <LoginForm setPassedAuthorization={setPassedAuthorization} />
            )}
        </>
    );
}

export default RegistrationForm;
