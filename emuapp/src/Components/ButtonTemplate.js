import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderRadius: 24,
            minWidth: 300,
            minHeight: 50,
            fontSize: 16,
        },
    },
}));

const ButtonTemplate = (props) => {
    const {background, text, isDisabled} = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained" disabled={isDisabled} style={{color: text, background: background}}>
                Odoslať
            </Button>
        </div>
    );
};

export default ButtonTemplate;