import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
    const [log, setLog] = useState("");
    const getData = async() =>{
        const response = await axios.get("http://localhost:5000/login")
        setLog(response.data);
    }

    useEffect(() => {
      getData();
    }, [])    
    
  return (
    <Grid>
        {log}
        <Button sx={{backgroundColor:'green'}}>
          <Link to={'/chat'}>
            Login
          </Link>
        </Button>
    </Grid>
  )
}

export default Login