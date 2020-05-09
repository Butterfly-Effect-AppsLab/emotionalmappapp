import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderRadius: 24,
            minWidth: 250,
            minHeight: 50,
            fontSize: 16,
        },
    },
});

const ButtonTemplate = (props) => {
    const {background, textColor, isDisabled, onButtonClick, text, path} = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button 
            variant="contained" 
            disabled={isDisabled}
            onClick={(event) => onButtonClick()} 
            style={{color: textColor, background: background}}
            component={Link} 
            to={path}
            >
                {text}
            </Button>
        </div>
    );
};

export default ButtonTemplate;