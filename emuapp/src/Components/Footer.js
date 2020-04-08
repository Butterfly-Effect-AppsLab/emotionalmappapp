import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  bottomBar: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  root: {
    height: '10%',
  }
});

export default function Footer() {
  const classes = useStyles();
  const [isPressed, setIsPressed] = React.useState(0);

  return (
    <div className={classes.root}>
    <BottomNavigation
      isPressed={isPressed}
      onChange={(newValue) => {
        setIsPressed(newValue);
      }}
      showLabels
      className={classes.bottomBar}
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
     </div>
  );
}
