import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NewsMenu from './NewsMenu';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(({
  appBar: {
    minHeight: 56,
    flexWrap: 'wrap',
  },
  toolBar: {
    minHeight: 56,
    flexWrap: 'wrap',
  },
  menuButton: {
    marginLeft: 'auto',
  },
  title: {
    flexGrow: 1,
  },
  tabs: {
    paddingTop: 50,
  },
  tabsRoot: {
    minHeight: 40,
    height: 40,
  },
  tabRoot: {
    minHeight: 40,
    height: 40,
  },
  size: {
    minHeight: 86,
  }
}));

const Header = (props) => {
  const { showHeader } = props;
  const classes = useStyles();


  if (showHeader) {
    return (
      <div id='HeaderMenu.js' >
        <Box display='flex' flexDirection='column' className={classes.size}>
          <AppBar elevation={0} position='fixed'>
            <Toolbar
              classes={{ regular: classes.toolBar }}
            >
              <Typography variant='h6' className={classes.title}>
                News
                    </Typography>
            </Toolbar>
            <NewsMenu />
          </AppBar>
        </Box>
      </div>
    )
  }
  else return null;
};

export default Header;
