import React from 'react';
import PropTypes from 'prop-types';

import * as emailjs from 'emailjs-com'

// Material-ui Components
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';


// Components
import UserSignup from '../components/UserSignup';
import CraftMessage from '../components/CraftMessage';
import EmailConfirmation from '../components/EmailConfirmation';

//https://stackoverflow.com/questions/24147331/react-the-right-way-to-pass-form-element-state-to-sibling-parent-elements





const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    paddingTop: `${theme.spacing.unit * 8}px`,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
      
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Tell us about yourself', 'Craft message', 'Review and send'];

class Checkout extends React.Component {
  //   constructor (props) {
  //     super(props)
  // } 
  state  = {
    activeStep: 0,
    firstName:null,
    lastName:null,
    email:null,
    phoneNumber:null,
    message:null
  }

  componentDidMount(){
    window.scrollTo(0,0);
  } 
  
  getStepContent(step) {
    switch (step) {
      case 0:
        return <UserSignup 
          firstName={this.state.firstName}
          firstNameChanged={this.firstNameChangeHandler}

          lastName={this.state.lastName}
          lastNameChanged={this.lastNameChangeHandler}

          email={this.state.email}
          emailChanged={this.emailChangeHandler}

          phone={this.state.phoneNumber}
          phoneChanged={this.phoneChangeHandler}
        />;
      case 1:
        return <CraftMessage
          message={this.state.message}
          messageChanged={this.messageChangeHandler}
         />;
      case 2:
        return <EmailConfirmation 
                  email={this.state.email} 
                  message={this.state.message}
                  firstName={this.state.firstName}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  

  firstNameChangeHandler = (event) => {this.setState({firstName:event.target.value})}
  lastNameChangeHandler = (event) => {this.setState({lastName:event.target.value})}
  emailChangeHandler = (event) => {this.setState({email:event.target.value})}
  phoneChangeHandler = (event) => {this.setState({phoneNumber:event.target.value})}
  messageChangeHandler = (event) => {this.setState({message:event.target.value})}  

  

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));

    if(this.state.activeStep === 2){
      this.handleSendEmail();
    }
  };

  // Still trying to figure out what variable is what, going to head home, put in a CC and see if I can get it working
    handleSendEmail = (event) => {

    const templateParams = {
      from_name: this.state.firstName + " " + this.state.lastName,
      to_name: 'Oliver or Tucker',
      subject: 'A new Form Submission on Bunzly.io!!',
      email_address: this.state.email,
      phone_number: this.state.phoneNumber,
      message_html: this.state.message
    }

    emailjs.send("gmail", "template_g1MaYj9z", templateParams, 'user_SLzvnEX4yUPaPfECV478E')
      .then(function (response) {
        console.log('SUCCESS!')
      })
  }; 

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  
  render() {
    const { classes } = this.props;
    const activeStep  = this.state.activeStep;

    return (
      <MuiThemeProvider theme={this.theme}>
     
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Contact us
            </Typography>


            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>
                  {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>


            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your message, {this.state.firstName}!
                  </Typography>
                  <Typography variant="subtitle1">
                        A staff member will reach out as soon as possible.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>


                  {this.getStepContent(activeStep)}



                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                        color="secondary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                    {/* this is where the handleSendEmail goes */}
                      {activeStep === steps.length - 1 ? 'Send Email' : 'Next'}
                    </Button>
                  </div>

                </React.Fragment>
              )}
            </React.Fragment>




          </Paper>
        </main>
      </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);

