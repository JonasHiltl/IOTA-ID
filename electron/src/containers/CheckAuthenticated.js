import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
const { ipcRenderer } = require("electron");

import { loadSavedData } from "../../preload"

import {
  FETCH_DATA_FROM_STORAGE,
  HANDLE_FETCH_DATA,
  SAVE_DATA_IN_STORAGE,
  HANDLE_SAVE_DATA
} from "../../utils/constants";

const CheckAuthenticated = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadSavedData();
  }, []);

  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_DATA, handleReceiveData)
    return () => {
      ipcRenderer.removeListener(HANDLE_FETCH_DATA, handleReceiveData)
    };
  });

  const handleReceiveData = (event, data) => {
    console.log("Data received", data)
  }

  return (
    <>
      { props.children }
    </>
  );
}

export default CheckAuthenticated;
