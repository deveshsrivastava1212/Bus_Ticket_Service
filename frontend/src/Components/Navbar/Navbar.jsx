import React from "react";
import styles from "./Navbar.module.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { RiArrowDropDownLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import {Link } from "react-router-dom";
import logo from '../../image/logo.png'


const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const setIsOpen = (bool) => {
    setIsModelOpen(bool);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setIsOpen(true);
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <div className={styles.Navbar}>
      <div className={styles.leftSide_header}>
        <img style={{height:'70px', width:'80px'}}
          src={logo}
          alt="logo"
          onClick={() => {
            //   history.push("/");
          }}
        />
        <ul className={styles.Navbar__listOne}>
          
          
            
            <li>  
              <Link to ="/" > Book Ticket </Link>
              </li>
          <li onClick={() => setIsOpen(true)}>
            <sup>New</sup>
          </li>
        
        </ul>
      </div>
      <ul className={styles.Navbar__listTwo} />
      <div className={styles.rightSide_header} />
      <li onClick={() => setIsOpen(true)}>HELP</li>
      <li onClick={() => setIsOpen(true)}>MANAGE BOOKING</li>
      <li>
        <div>
          <RiArrowDropDownLine className={styles.icons} onClick={handleClick} />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={() => setIsOpen(true)}
          >
            <MenuItem onClick={handleClose}>Bus Ticket</MenuItem>
            <MenuItem onClick={handleClose}>Cancel</MenuItem>
            <MenuItem onClick={handleClose}>Reschedule</MenuItem>
            <MenuItem onClick={handleClose}>Show My Ticket</MenuItem>
            <MenuItem onClick={handleClose}>Email / SMS</MenuItem>
          </Menu>
        </div>
      </li>
      <li>
        <MdAccountCircle
          className={styles.icons}
          style={{ fontSize: "25px" }}
        />
      </li>
      <li>
        <div>
          <RiArrowDropDownLine
            className={styles.icons}
            onClick={handleClick2}
          />
           <Menu
                  id="simple-menu"
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={handleClose2}
               / >
                  <MenuItem
                    onClick={handleClose2}
                    //onClick={() => setIsOpen(true)}
                  ></MenuItem>
        </div>
      </li>
    </div>
  );
};

export default Navbar;
