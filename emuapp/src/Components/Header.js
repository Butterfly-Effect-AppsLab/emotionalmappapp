import React from 'react';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const headerTheme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      regular: {
        '@media (min-width: 600px)': {
          minHeight: 56,
        }}}}
});

const useStyles = makeStyles(({
  appBar: {
    flexGrow: 1,
    minHeight: 56,
  },
  menuButton: {
    marginLeft: 'auto',
  },
  title: {
    flexGrow: 1,
  },

}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log('som tu');
    setAnchorEl(null);
  };

  return (
    <div className={classes.appBar}>
      <ThemeProvider theme={headerTheme}>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              News
          </Typography>
            <IconButton onClick={handleClick} edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
              <MenuIcon />
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onBlur={handleClose}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component='a' href='https://google.com'>Profile</MenuItem>
                <MenuItem onClick={handleClose} component='a' href='https://messenger.com'>My account</MenuItem>
                <MenuItem onClick={handleClose} component='a' href='https://bing.com'>Logout</MenuItem>
              </Menu>
            </IconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  )
};

export default Header;
