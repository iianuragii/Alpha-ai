import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Grid,Box } from '@mui/material';
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
        <Grid sx={{textAlign:'center',pb:'5%',pt:'2%',fontSize:'3rem'}}>
          Welcome to Anu.ai, an Alpha-AI initiative!!
        </Grid>
        <Grid sx={{pl:'33%'}}>
          <Box sx={{width:'50%',height:'30rem',border: 1,borderColor: 'blue'}}>
            <Grid sx={{textAlign:'center',pt:'80%'}}>
              <Button sx={{backgroundColor:'skyblue',borderRadius:'12px','&:hover': {
                backgroundColor: 'lightblue', // Change this to your desired hover color
              },width:'7rem'}}>
                <Link to={'/chat'} >
                  Login
                </Link>
              </Button>
            </Grid>
          </Box>
        </Grid>
    </Grid>
  )
}

export default Login