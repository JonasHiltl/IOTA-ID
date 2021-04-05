import React, { useState } from 'react';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import {
  Button
} from "antd";

const Index = () => {
  const [payload, setPayload] = useState({
    size: undefined,
    created: "",
    hash: "",
    ipfs: ""
  })

  const { size, created, hash, ipfs } = payload;

  const tangleHash = "O9HMIQVBNUIP9RKHFKCWYLKQHALGMMHLDGORHO9KLHDGN9FMNEKUSNRJDDGVZYZUHHJEN9BZFZE9A9999"
  const retrieve = async () => {
    const res = await axios.post("http://localhost:3001/patient-questionnaire/retrieve", {
      tangleHash: tangleHash,
    });

    setPayload({
      size: res.data.payload.size,
      created: res.data.payload.created,
      hash: res.data.payload.hash,
      ipfs: res.data.payload.ipfs
    })

  }
  return (
    <div>
      <Button onClick={retrieve}>Retrieve</Button>
      { ipfs.length > 1 &&
        <a href={`https://ipfs.io/ipfs/${ipfs}`}>Test</a>
      }
    </div>
  );
}

export default Index;
