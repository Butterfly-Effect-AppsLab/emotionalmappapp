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
    div: {
        width: '90vw',
        backgroundColor: PINK,
        borderRadius: 10,
        height: 40,
        marginLeft: 0,
        marginBottom: 10,
    },
    box: {
        marginLeft: 5,
        marginRight: 5,
    },
    text: {
        marginTop: 'auto',
        marginBottom: 'auto',
        fontWeight: 'bold',
    },
}));

const CheckBox = (props) => {
    const { options, sendData, questionId } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({});
    const [value, setValue] = React.useState('');

    useEffect(() => {
        options.forEach(option => { if (option.option !== 'other') { setState({ ...state, [option.option]: false }) } });
    }, []);

    useEffect(() => {
        let data = []
        Object.keys(state).forEach((key) => {
            if (state[key]) {
                data.push({ question_id: questionId, answer: key })
            }
        });
        sendData(data);
    }, [state]);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleBlur = (event) => {
        let newValue = event.target.value;
        let newState = Object.assign({},state);
        setState({ ...newState, [newValue]: true, [value]: false });
        setValue(newValue);
    };

    const renderOptions = (option) => {
        if (option.option !== "other") {
            return (
                <div className={classes.div} >
                    <FormControlLabel className={classes.box} control={<RedCheckbox checked={state[option.id]} onChange={handleChange} name={option.option} />} label={option.option} />
                </div>
            )
        }
        else {
            return (
                <div>
                    <Typography className={classes.text} variant="subtitle2" component="p">
                        Iné
                    </Typography>
                    <MultilineTextField handleBlur={(value) => { handleBlur(value) }} />
                </div>
            )
        }
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset">
                {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                {options.map((option) => renderOptions(option))}
            </FormControl>
        </div>
    );
};

export default CheckBox;
