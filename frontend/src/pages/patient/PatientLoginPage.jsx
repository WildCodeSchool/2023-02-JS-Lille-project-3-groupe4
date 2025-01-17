import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import styles from "./PatientLoginPage.module.css";

function PatientLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [messageError, setMessageError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        toast.success("Authentification réussie !", {
          progressClassName: styles.toastProgress,
          autoClose: 1500,
        });

        const { user } = response.data;
        setAuth({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          identifierRpps: user.identifierRpps,
          socialSecuNumber: user.socialSecuNumber,
        });

        // Redirect based on the user's role
        switch (user.role) {
          case "Patient":
            navigate(`/patient/${user.socialSecuNumber}/intervention`);
            break;
          case "Secrétaire":
            navigate("/secretariat");
            break;
          case "Praticien":
            navigate(`/practitioner/${user.identifierRpps}`);
            break;
          default:
            console.error("Unknown role. Cannot redirect.");
            break;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (response.status === 401) {
          setMessageError(response.data.error); // Accès au message d'erreur renvoyé par le backend
        } else {
          setMessageError("Erreur d'authentification. Veuillez réessayer.");
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessageError(error.response.data.error); // Accès au message d'erreur renvoyé par le backend
      } else {
        setMessageError("Erreur de connexion au serveur.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      togglePasswordVisibility();
    }
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.headerContainer}>
        <div className={styles.logoContainer} />
      </header>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Connexion</h1>
        <p className={styles.text}>
          Je me connecte à mon espace personnel à l'aide de mes identifiants
          Serenity reçus par mail.
        </p>
        <div className={styles.formContainer}>
          <label className={styles.emailLabel}>
            E-mail
            <input
              className={styles.emailField}
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Saisissez votre adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.passwordLabel}>
            Mot de passe
            <div className={styles.passwordInputContainer}>
              <input
                className={styles.passwordField}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Saisissez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className={styles.passwordVisibilityIcon}
                onClick={togglePasswordVisibility}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </label>
          <input
            className={styles.submitButton}
            type="submit"
            value="Me connecter"
            onClick={handleLogin}
          />
        </div>
        {messageError && <p className={styles.errorText}>{messageError}</p>}
      </div>
    </div>
  );
}

export default PatientLoginPage;
