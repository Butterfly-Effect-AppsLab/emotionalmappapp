import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(({
    // newsMenu: {
    //     position: 'fixed',
    //     top: 56,
    //     width: '100%',
    // },
    tabsRoot: {
        minHeight: 30,
        height: 30,
    },
    tabRoot: {
        minHeight: 30,
        height: 30,
    }
}));

const NewsMenu = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.newsMenu} elevation={0} square>
            <Tabs
                classes={{ root: classes.tabsRoot }}
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                centered
            >
                <Tab classes={{ root: classes.tabRoot }} label="Všetko" />
                <Tab classes={{ root: classes.tabRoot }} label="Novinky" />
                <Tab classes={{ root: classes.tabRoot }} label="Prieskumy" />
            </Tabs>
        </Paper>
    );
};

export default NewsMenu;