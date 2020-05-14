import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ReactComponent as Home } from '../icons/home.svg';
import { ReactComponent as Surveys } from '../icons/surveys.svg';
import { ReactComponent as Notifications } from '../icons/notifications.svg';
import { ReactComponent as Profile } from '../icons/profile.svg';
import { ReactComponent as HomeSelected } from '../icons/home_selected.svg';
import { ReactComponent as SurveysSelected } from '../icons/surveys_selected.svg';
import { ReactComponent as NotificationsSelected } from '../icons/notifications_selected.svg';
import { ReactComponent as ProfileSelected } from '../icons/profile_selected.svg';
import { RED, WHITE, TRANSWHITE } from '../utils/colours';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  bottomBar: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  footerDiv: {
    height: 56,
  },
  root: {
    backgroundColor: RED,
  },
  label: {
    color: TRANSWHITE,
  },
  selected: {
    fontWeight: 'bold',
    color: WHITE,
  }
});

const Footer = (props) => {
  const {showFooter} = props;
  const classes = useStyles();
  const [isPressed, setIsPressed] = React.useState(0);

  return showFooter == 1 ? (
    <div className={classes.footerDiv}>
    <BottomNavigation
      classes={{root: classes.root}}
      value={isPressed}
      onChange={(newValue) => {
        setIsPressed(newValue);
      }}
      showLabels
      className={classes.bottomBar}
    >
      <BottomNavigationAction classes={{label: classes.label, selected: classes.selected}} label="Domov" icon={isPressed !== 0 ? <Home /> : <HomeSelected />} />
      <BottomNavigationAction classes={{label: classes.label, selected: classes.selected}} label="Prieskumy" icon={isPressed !== 1 ? <Surveys /> : <SurveysSelected />} />
      <BottomNavigationAction classes={{label: classes.label, selected: classes.selected}} label="Notifikácie" icon={isPressed !== 2 ? <Notifications /> : <NotificationsSelected />} />
      <BottomNavigationAction classes={{label: classes.label, selected: classes.selected}} label="Môj profil" icon={isPressed !== 3 ? <Profile /> : <ProfileSelected />} />
    </BottomNavigation>
     </div>
  ) : null;
}

export default Footer;