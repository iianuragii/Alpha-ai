import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

const Navbar = () => {
  return (
    <>
      <Grid >
        <Grid>
          <Button variant="outlined" >
            <Link to={'/'}>
              Logout
            </Link>
          </Button>
        </Grid>      
      </Grid>
    </>    
  )
}

export default Navbar