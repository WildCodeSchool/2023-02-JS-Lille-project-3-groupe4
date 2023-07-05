import React from "react";
import { useMediaQuery } from "react-responsive";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";
import UnderstandingMobile from "../../components/patient/understandingMobile/UnderstandingMobile";
import styles from "./PatientUnderstandingPage.module.css";

function PatientUnderstandingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div className={styles.understandingPageContainer}>
      {isTabletOrMobile && <UnderstandingMobile />}
      {isDesktop && <PatientPreparationMenu />}
      <div className={styles.prepContainer} />
    </div>
  );
}

export default PatientUnderstandingPage;
