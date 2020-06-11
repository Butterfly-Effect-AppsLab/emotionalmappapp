import React from 'react';
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
    root: {
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
    form: {
        marginTop: 10,
    }
});

const RadioButton = (props) => {
    const { options } = props;
    const [value, setValue] = React.useState();
    const classes = useStyles();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const renderOptions = (option) => {

        return (
            <div className={classes.root} >
                <FormControlLabel className={classes.box} value={option.option} control={< RedRadio />} label={option.option} />
            </div>
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
