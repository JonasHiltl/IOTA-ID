import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Localbase from "localbase"

import { verify, loadPersonalInformation, loadPatientQuestionnaire } from "../store/actions/auth";

const CheckAuthenticated = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  useEffect( () => {
    async function getDID() {
      const db = new Localbase("db")
      await db.collection("identity").doc("did").get().then(identity => {
        if (identity) {
          dispatch(verify(identity.id))
        }
      })
      if (isAuthenticated) {
        dispatch(loadPersonalInformation())
        const patientQuestionnaire = await db.collection("patientQuestionnaire").get();
        dispatch(loadPatientQuestionnaire(patientQuestionnaire))
      }
    }
    getDID()
  }, [dispatch, isAuthenticated])

  return (
    <>
      { props.children }
    </>
  );
}

export default CheckAuthenticated;
