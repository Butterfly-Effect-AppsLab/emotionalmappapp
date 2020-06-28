import React, { useEffect } from 'react';
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
import history from '../utils/history';

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
  const { showFooter } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const processPathName = pathname => {
      switch (pathname) {
        case "/":
          setValue(0);
          break;
        case "/surveys":
          setValue(1);
          break;
        default:
          break;
      }
    };

    if (history) {
      processPathName(history.location.pathname);
      history.listen((location, action) => {
        processPathName(location.pathname);
      });
    }
  }, [history]);

  const handleLocationChange = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        history.push('/');
        break;
      case 1:
        history.push("/surveys");
        break;
      default:
        break;
    }
  };

  return showFooter == 1 ? (
    <div className={classes.footerDiv}>
      <BottomNavigation
        classes={{ root: classes.root }}
        value={value}
        onChange={(event, newValue) => { handleLocationChange(newValue) }}
        showLabels
        className={classes.bottomBar}
      >
        <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} label="Domov" icon={value !== 0 ? <Home /> : <HomeSelected />} />
        <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} label="Prieskumy" icon={value !== 1 ? <Surveys /> : <SurveysSelected />} />
        {/* <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} label="Notifikácie" icon={value !== 2 ? <Notifications /> : <NotificationsSelected />} /> */}
        {/* <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} label="Môj profil" icon={value !== 3 ? <Profile /> : <ProfileSelected />} /> */}
      </BottomNavigation>
    </div>
  ) : null;
}

export default Footer;