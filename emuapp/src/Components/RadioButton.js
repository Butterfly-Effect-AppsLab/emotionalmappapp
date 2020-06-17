import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { PINK, RED } from '../utils/colours';

const RedRadio = withStyles({
    root: {
        color: RED,
        '&$checked': {
            color: RED,
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles({
    box: {
        marginLeft: 5,
        marginRight: 5,
        width: '90vw',
        backgroundColor: PINK,
        borderRadius: 10,
        verticalAlign: 'middle',
    },
    form: {
        marginTop: 10,
    }
});

const RadioButton = (props) => {
    const { options, sendData, questionId } = props;
    const [value, setValue] = React.useState();
    const classes = useStyles();
    const [state, setState] = React.useState({});

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
        setValue(event.target.value);
        setState({[event.target.name]: true });
    };

    const renderOptions = (option) => {

        return (
                <FormControlLabel className={classes.box} value={option.option} name={option.option} control={< RedRadio />} label={option.option} />
        )

    };

    return (
        <FormControl className={classes.form} component="fieldset">
            {/* <FormLabel component="legend">Gender</FormLabel> */}
            <RadioGroup  value={value} onChange={handleChange}>
                {options.map((option) => renderOptions(option))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButton;
