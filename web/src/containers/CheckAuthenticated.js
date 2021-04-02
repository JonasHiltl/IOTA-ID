import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Localbase from "localbase"

import { verify, loadPersonalInformation } from "../store/actions/auth";

const CheckAuthenticated = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  useEffect(async () => {
    const db = new Localbase("db")
    await db.collection("identity").doc("did").get().then(identity => {
      if (identity) {
        dispatch(verify(identity.id))
      }
    })
    if (isAuthenticated) {
      dispatch(loadPersonalInformation())
    }
  }, [dispatch, isAuthenticated])

  return (
    <>
      { props.children }
    </>
  );
}

export default CheckAuthenticated;
