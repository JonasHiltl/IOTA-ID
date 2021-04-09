import React from 'react';
import { Link} from 'react-router-dom'

import { 
  Button
} from "antd";

const Index = () => {
  return (
    <div>
      <Link to="/create">
        <Button>Create</Button>
      </Link>
    </div>
  );
}

export default Index;
