import React from "react";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

export default class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  drawerToggleHandler = () => {
    this.setState((prevState) => { 
        return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <>
        <Toolbar clicked={this.drawerToggleHandler}/>
        <SideDrawer
          show={this.state.showSideDrawer}
          clicked={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}
