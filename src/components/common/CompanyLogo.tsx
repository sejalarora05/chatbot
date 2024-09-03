import React from 'react';
import logo from '../../assets/SignIn/netsmartz-logo-with-gptw.png'; // Import your logo image
import { makeStyles } from '@material-ui/core';


const useStyles:any = makeStyles((theme:any) => ({
  logo: {
    // margin: theme.spacing(1), // Adjust margin as needed
    width:'185px',
    margin:'10px'
  },
}));

const CompanyLogo = ()=> {
  const classes:any = useStyles();

  return (
    <div style={{marginLeft:"32px", marginTop:"16px"}}>
      <img src={logo} alt="Logo" className={classes.logo} />
    </div>
  );
}

export default CompanyLogo;
