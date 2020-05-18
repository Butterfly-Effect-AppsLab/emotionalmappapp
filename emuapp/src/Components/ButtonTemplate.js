import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderRadius: 24,
            width: '70vw',
            maxWidth: 350,
            minHeight: 50,
            fontSize: '2vh',
        },
    },
});

const ButtonTemplate = (props) => {
    const {background, textColor, isDisabled, onButtonClick, text, path, variant, primary} = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button 
            variant={variant}
            color={primary ? 'primary' : ''}
            disabled={isDisabled}
            onClick={onButtonClick ? (event) => onButtonClick() : null} 
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