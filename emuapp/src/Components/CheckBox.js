import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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
                    // let keyValue = Object.keys(retrievedAnswers[key])
                    // console.log(keyValue.length)
                    // for (var i = 0; i < keyValue.length; i++) {
                    //     setState({ ...state, [keyValue[i]]: true })
                    // }
                    setState(retrievedAnswers[key]) //////FUNGUJE, ale nezobrazuje sa checked ikona, treba doriesit
                }
            });
        }
    }, [retrievedAnswers]);

    useEffect(() => {
        console.log('toto je state v Check Boxe', state)
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
            console.log('state v checkboxe', state[option.option], index)
            return (
                    <FormControlLabel className={classes.box} control={<RedCheckbox checked={state[option.option] ? true : false} onChange={(event) => { handleChange(event) }} name={option.option} />} label={option.option} />
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
