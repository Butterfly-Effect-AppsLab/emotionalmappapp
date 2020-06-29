import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NewsMenu from './NewsMenu';
import Box from '@material-ui/core/Box';
import { WHITE, RED } from '../utils/colours';
import { ReactComponent as Logo } from '../icons/logo_red_large.svg';
import history from '../utils/history'

const useStyles = makeStyles(({
  appBar: {
    color: RED,
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
    fontWeight: 'bold'
  },
  size: {
    // minHeight: 86, //TOTO MAS NA PRIDAVNY PANEL S MOZNOSTAMI
    minHeight: 56,
  },
  logo: {
    marginRight: 20,
    width: 29,
    height: 30
  },
}));

const Header = (props) => {
  const { showHeader, headerText } = props;
  const classes = useStyles();

  const handleClose = () => {
    history.push('/surveys');
  };

  if (showHeader) {
    return (
      <div id='HeaderMenu.js' >
        <Box display='flex' flexDirection='column' className={classes.size}>
          <AppBar className={classes.appBar} color={WHITE} elevation={0} position='fixed'>
            <Toolbar
              classes={{ regular: classes.toolBar }}
            >
              <Logo className={classes.logo} />
              <Typography variant="h5" component="h2" className={classes.title}>
                {headerText}
              </Typography>
            </Toolbar>
            {/* <NewsMenu /> */}
          </AppBar>
        </Box>
      </div>
    )
  }
  else return null;
};

export default Header;
