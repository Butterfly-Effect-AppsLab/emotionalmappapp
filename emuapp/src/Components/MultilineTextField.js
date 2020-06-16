import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { PINK, DARKGRAY, WHITE } from '../utils/colours';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginTop: 10,
            width: '90vw',
            //   width: '25ch',
        },
    },
    resize: {
        fontSize: 12
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 10,
        },
        backgroundColor: PINK,
        borderRadius: 10,
        color: DARKGRAY
    },
    notchedOutline: {
        borderColor: WHITE,
    }
}));

const MultilineTextField = (props) => {
    const { handleBlur, questionId, sendData } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({});
    const [value, setValue] = React.useState('');

    useEffect(() => {
        if (sendData) {
            let data = []
            Object.keys(state).forEach((key) => {
                if (state[key]) {
                    data.push({ question_id: questionId, answer: key })
                }
            });
            sendData(data);
        }
    }, [state]);

    const handleBlurLocal = (event) => {
        let newValue = event.target.value;
        let newState = Object.assign({},state);
        setState({ ...newState, [newValue]: true, [value]: false });
        setValue(newValue);
    };


    return (
        <form className={classes.root} noValidate autoComplete='off'>
            <div>
                <TextField
                    variant="outlined"
                    label='...vaša odpoveď'
                    multiline
                    rows={4}
                    onBlur={handleBlur ? handleBlur : handleBlurLocal}
                    classes={{
                        input: classes.resize,
                    }}
                    className={classes.textField}
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
            </div>
        </form>
    );
};

export default MultilineTextField;
