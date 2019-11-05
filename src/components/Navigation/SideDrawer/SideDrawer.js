import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
    const attachClasses = [classes.SideDrawer, props.show ? classes.Open : classes.Close];
    return (
        <>
        <Backdrop show={props.show} clicked={props.clicked}/>
        <div className={attachClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </>
    );
}

export default sideDrawer;