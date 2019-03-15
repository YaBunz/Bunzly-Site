
import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Home from './pages/Home';
import NavAppBar from './components/NavAppBar';
import ContactUs from './pages/ContactUs';
import About from './pages/About'
import Tucker from './pages/Tucker';
import Oliver from './pages/Oliver';
import Footer from './components/Footer';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import cyan from '@material-ui/core/colors/cyan';
import lightBlue from '@material-ui/core/colors/lightBlue';
import NavAppBarPlaceholder from './components/NavAppBarPlaceholder';

const theme = createMuiTheme({
  palette: {
    primary: { main: lightBlue[700] }, // Purple and green play nicely together.
    secondary: { main: cyan[700] }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true }, //??
});

const styles = theme => ({
  parallax : {
    backgroundColor: theme.palette.grey[800],

    /* The image used */
    backgroundImage:"url(https://cdn.pixabay.com/photo/2017/01/24/03/53/plant-2004483__340.jpg)",
    /* Full height */
    height:"100vh",
    opacity:".65",
    /* Create the parallax scrolling effect */
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", 
  },
  appBarPlaceHolder : {
    backgroundColor: theme.palette.grey[800],
  },
  button: {
    margin: theme.spacing.unit,
    left: '50vw',
    top: '80vh',
    transform: 'translate(-50%, -50%)',
  },
});

class App extends Component {

  constructor() {
    super()
    this.state = {
      pageId: 0,
      plxHeight: 0,
      appBarState:'static',
      pageId: 0
      ,plxHeight: 0
      ,logoMultiplyer: 1
      ,logoSize: 30
      ,appBarTransparency:'transparent'
      ,appBarShadow:'none'
      ,appBarState:'static'
    }
    this.goHere = React.createRef()
}


getPage(pageId) {
  switch (pageId) {
    case 0:
      return <Home/>;
    case 1:
      return <ContactUs/>;
    case 2:
      return <About 
      handleTuckPage = {this.handleTuckPage}
      handleOliverPage = {this.handleOliverPage}
      />;
      case 3:
        return <Tucker />;
      case 4:
        return <Oliver />;
    default:
      throw new Error('Unknown step');
  }
}

handleHomePage = () => {
  this.setState({
    pageId: 0,
  });
};

handleContactPage = () => {
  this.setState({
    pageId: 1,
  });
};

handleAboutPage = () => {
  this.setState({
    pageId: 2,
  });
};

handleTuckPage = () => {
  this.setState({
    pageId: 3,
  });
};

handleOliverPage = () => {
  this.setState({
    pageId: 4,
  });
};


  componentDidMount() {
    window.scrollTo(0,0);
    window.addEventListener('scroll', this.handleScroll);
    this.setState({ plxHeight: document.getElementById('backGrnd').clientHeight});  
  }

  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  logState = () =>{
    console.log(this.state)
  }

  logScrolledState = () => {
    console.log(this.state.scrolled)
  }
  
  handleScroll = () => {
   
    const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop
        
    //this.state.plxHeight = 928

  
    if(winScroll >= this.state.plxHeight){
      this.setState({appBarState:'fixed'})
      this.setState({appBarTransparency:'white'})
      //this.setState({appBarShadow:null})

      //console.log('Sticky!')
    }
    else {
      this.setState({logoMultiplyer:(this.state.plxHeight- winScroll)/this.state.plxHeight})
      this.setState({appBarState:'static'})
      this.setState({appBarTransparency:'transparent'})
      this.setState({appBarShadow:'none'})
    }
  

   }

   getAppBarDiv() {
      if(this.state.appBarState === "fixed"){
        return <NavAppBarPlaceholder/>
      }
      else 
        return <div/>;
  }

  scrollToMyRef = () => window.scrollTo({
    top: this.goHere.current.offsetTop,
    bottom: this.goHere.current.offsetBottom,
    behavior: 'smooth'
  })

  handleClick = () => {
    this.scrollToMyRef()
  }

  
  render() {
    const { classes } = this.props;
    const { scrolled } = this.state;
    this.logScrolledState()

    return (
      <div className="App">       
        <NavAppBar 
          appBarState={this.state.appBarState} 
          logoSize={this.state.logoSize + (this.state.logoSize * this.state.logoMultiplyer)}
          appBarTransparency={this.state.appBarTransparency}
          appBarShadow={this.state.appBarShadow}
        />
        <Paper id='backGrnd' className={classes.parallax}>
          <Button variant="contained" onClick={this.handleClick} className={classes.button}>
            Scroll Down 
            <br />
            (Or Click, who cares)
          </Button>
        </Paper>
        <div ref={this.goHere} className='locator'></div>
        {this.getPage(this.state.pageId)}
        <Paper id='backGrnd' className={classes.parallax}></Paper>
        <Footer 
        handleHomePage={this.handleHomePage} 
        handleContactPage={this.handleContactPage} 
        handleAboutPage={this.handleAboutPage} 
        />
      </div>

    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

