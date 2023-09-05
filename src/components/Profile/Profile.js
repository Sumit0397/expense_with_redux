import React, { Fragment,  useState } from 'react';
import styles from "./Navbar.module.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [showVerify, setShowVerify] = useState(true);
  const [showUpdate , setShowUpdate] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const showUpdateHandler = () => {
    setShowUpdate(true);
    navigate("/profile/update" , {replace : true})
  }
  

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/", { replace: true })
  }

  return (
    <Fragment>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Welcome to Expense Tracker!!!</div>
        <div className={`${styles.navLinks} ${isOpen ? styles.showMenu : ''}`}>

          <div className={styles.profile}>
            {!showUpdate ? <><span>Your Profile is Incomplete.</span>{" "}</> : <><span>Your Profile is X% complete.</span>{" "}</>}
            <Link onClick={showUpdateHandler} to="/profile/update">Complete now</Link>
          </div>
          
          <div>
            <Button onClick={logoutHandler} variant="danger">Log Out</Button>
          </div>
        </div>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
        </div>
      </nav>
    </Fragment>
  )
}

export default Profile
