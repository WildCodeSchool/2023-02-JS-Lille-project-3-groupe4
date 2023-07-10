import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";
import styles from "./InfoIntervention.module.css";

function InfoIntervention() {
  const [inputs, setInputs] = useState({ roles: "patient" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5050/interventions", inputs);
      navigate("/secretariat/intervention");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.addInterventionContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/intervention">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <h3>Gestion d'une intervention</h3>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.leftContainer}>
            <label>
              Nom de l'intervention:
              <input
                type="text"
                name="nom_Intervention"
                value={inputs.nom_Intervention || ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <label>
              N° sécurité sociale:
              <input
                type="text"
                name="social_secu_number"
                value={inputs.social_secu_number || ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <label>
              Identifiant RPPS:
              <input
                type="text"
                name="identifier_rpps"
                value={inputs.identifier_rpps || ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <label>
              Date de procédure:
              <input
                type="date"
                name="procedure_date"
                value={inputs.procedure_date || ""}
                onChange={handleChange}
                disabled
              />
            </label>
          </div>
          <div className={styles.middleContainer}>
            <label>
              Type d'intervention:
              <select
                className={styles.multipleChoicesMenu}
                name="type_intervention"
                value={inputs.type_intervention || ""}
                onChange={handleChange}
                disabled
              >
                <option
                  value=""
                  aria-label="Select list for intervention type"
                  disabled
                  hidden
                />
                <option value="Pose implant">Pose implant</option>
                <option value="Chirurgie">Chirurgie</option>
              </select>
            </label>
            <label>
              Nom du patient:
              <input
                type="text"
                value={inputs.last_name || ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <label>
              Nom du practicien:
              <input
                type="text"
                value={inputs.last_name || ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <input type="submit" className={styles.sendButton} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default InfoIntervention;
