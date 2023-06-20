import React from "react";
import styles from "./PatientSerenityPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/patientPreparationMenu";

function PatientSerenityPage() {
  return (
    <div className={styles.serenityPageContainer}>
      <PatientPreparationMenu />
      <div className={styles.prepContainer}></div>
    </div>
  );
}

export default PatientSerenityPage;
