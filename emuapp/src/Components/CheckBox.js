import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { PINK, RED } from '../utils/colours';
import MultilineTextField from './MultilineTextField';
import { Typography } from '@material-ui/core';


const RedCheckbox = withStyles({
    root: {
        color: RED,
        '&$checked': {
            color: RED,
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: 10,
    },
    box: {
        marginLeft: 5,
        marginRight: 5,
        width: '90vw',
        backgroundColor: PINK,
        borderRadius: 10,
        verticalAlign: 'middle',
    },
    text: {
        marginTop: 'auto',
        marginBottom: 'auto',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
    }
}));

const CheckBox = (props) => {
    const { options, sendData, questionId, retrievedAnswers } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({});
    const [value, setValue] = React.useState('');


    useEffect(() => {
        if (retrievedAnswers) {
            Object.keys(retrievedAnswers).forEach((key) => {
                if (Number(key) === questionId) {
                    setState(retrievedAnswers[key])
                }
            });
        }
    }, [retrievedAnswers]);

    useEffect(() => {
        sendData(state, questionId);
    }, [state]);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleBlur = (event) => {
        let newValue = event.target.value;
        let newState = Object.assign({}, state);
        setState({ ...newState, other: { [newValue]: true } });  ///Nemam sajnu preco to funguje 
        setValue(newValue);
    };

    const renderOptions = (option, index) => {
        if (option.option !== "other") {
            return (
                    <FormControlLabel classes={{ label: classes.label }} className={classes.box} control={<RedCheckbox checked={state[option.option] ? true : false} onChange={(event) => { handleChange(event) }} name={option.option} />} label={option.option} />
            )
        }
        else {
            return (
                <div>
                    <Typography className={classes.text} variant="subtitle2" component="p">
                        Iné
                    </Typography>
                    <MultilineTextField retrievedText={state ? state.other : null} handleBlur={(value) => { handleBlur(value) }} />
                </div>
            )
        }
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset">
                {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                {options.map((option, index) => <div key={index}>{renderOptions(option, index)}</div>)}
            </FormControl>
        </div>
    );
};

export default CheckBox;
