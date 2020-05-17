import React, { useCallback, useEffect } from 'react';
import DashBoard from '../hoc/Dashboard';
import { Grid, Avatar, Typography, Button, Divider } from '@material-ui/core';
import {  Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/EditOutlined';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  imageContainer:{
    // margin: theme.spacing(2)
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    // width:200,
    // height: 200
  },
  roleTitle: {
    color: '#828080',
    fontSize: '1.2rem',
  },
  paidBtn: {
    backgroundColor: '#00c853 !important',
    color: '#fff !important'
  },
  statusTitle: {
    color: '#828080',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    paddingLeft: 8
  },
  infoWrapper: {
    marginBottom: 8
  },
  infoTitle: {
    textAlign: 'right',
    color: '#828080'
  }
}));

const Home = () => {
  const classes = useStyles()
  const [state, setState] = useState({})
  
  // const history = useHistory();
  const initiateState = useCallback(() => {
    const getUser = () => {
      var user = JSON.parse(localStorage.getItem('ipf-user'))
      setState(user)
    }

    getUser()
  }, [setState])
  useEffect(() => {
    initiateState()
  }, [initiateState])
  return(
    
    <DashBoard>
         <Grid container>
            <Grid item sm={1}>
             </Grid>
           <Grid item sm={10}>
               <Grid container spacing={2}>
                 <Grid className={classes.imageContainer} item sm={2}>
                    <div className={classes.root}>
                      <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/2.jpg" className={classes.large} />
                  </div>
                 </Grid>
                  <Grid item sm={10}>
                      <div>
                      <Typography
                        variant="h3"
                      >
                        {`${state.firstName} ${state.lastName}`}
                      </Typography>
                      <Typography
                        body1="span"
                        className={classes.roleTitle}
                      >
                        Administrator
                      </Typography>
                      <div style={{display:'flex'}}>
                        <Button
                        // onClick={() => history.push('/user/membership-payment')}
                        // className={classes.paidBtn}
                        component={Link}
                        to="/user/membership-payment"
                        variant="contained" color="secondary">
                          Pay Dues
                        </Button>
                        <div className="btn-edit">
                        <Button
                        // className={classes.paidBtn}
                        variant="outlined" color="secondary">
                          Edit <EditIcon />
                        </Button>
                        </div>
                      </div>
                      <div className="status-wrapper" style={{marginTop: 16}}>
                        <Typography
                          body1="span"
                          className={classes.roleTitle}
                        >
                          Status: 
                        </Typography>
                        <Typography
                          body1="span"
                          className={classes.statusTitle}
                        >
                          Member
                        </Typography>
                      </div>
                      </div>
                      
                  </Grid>
               </Grid>
               <Divider />
               <div className="prof-info-wrapper">
                <Grid  className={classes.infoWrapper} container spacing={2}>
                  <Grid className={classes.infoTitle}  sm item>
                    FullName
                  </Grid>
                  <Grid sm item>
                    <Typography body1="span">
                    {`${state.firstName} ${state.lastName}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid className={classes.infoWrapper} container spacing={2}>
                  <Grid sm className={classes.infoTitle} item>
                    Email
                  </Grid>
                  <Grid sm item>
                  <Typography body1="span">
                  {`${state.emailAddress}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid className={classes.infoWrapper} container spacing={2}>
                  <Grid className={classes.infoTitle} sm item>
                    Contact
                  </Grid>
                  <Grid  sm item>
                  <Typography body1="span">
                    {`${state.phoneNumber}`}
                    </Typography>
                  </Grid>
                </Grid>
               </div>
               <Divider />
               <div className="prof-info-wrapper">
                <Typography variant="h4">
                        Events
                </Typography>
               </div>
             </Grid>
             <Grid item sm={1}>

            </Grid>
         </Grid>
    </DashBoard>
  );
}

export default Home;

// class Home extends Component {

//   render() {
//     const {classes} = this.props;
//     return (
//       <DashBoard>
//         <Grid container>
//             <Grid item sm={2}>

//             </Grid>
//             <Grid item sm={8}>
//               <div>
//                 <div className={classes.root}>
//                   <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/2.jpg" />
//                 </div>
//               </div>
//             </Grid>
//             <Grid item sm={2}>

//             </Grid>
//         </Grid>
//       </DashBoard>
//     );
//   }
// }

// const styles = {

// }

// export default connect(null, null)(withStyles(styles)(Home));