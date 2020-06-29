import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { PINK, DARKGRAY, WHITE } from '../utils/colours';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginTop: 10,
            width: '90vw',
        },
    },
    resize: {
        fontSize: 14
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
    const { handleBlur, questionId, sendData, sendNote, retrievedText, retrievedAnswers } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({});
    const [value, setValue] = React.useState('');
    const [noteValue, setNoteValue] = React.useState('');
    const [retrievedTextLocal, setRetrievedTextLocal] = React.useState({});

    useEffect(() => {
        if (retrievedAnswers) {
            Object.keys(retrievedAnswers).forEach((key) => {
                if (Number(key) === questionId) {
                    setState(retrievedAnswers[key]);
                    if (retrievedAnswers[key].other) {
                        setRetrievedTextLocal(retrievedAnswers[key].other)
                    }
                }
            });
        }
    }, [retrievedAnswers]);

    useEffect(() => {
        if (retrievedText) {
            let keyValues = Object.keys(retrievedText)
            for (var i = 0; i < keyValues.length; i++) {
                let key = keyValues[i];
                if (key) {
                    if (retrievedText[key] === true) {
                        setValue(key);
                    }

                }
            }
        }
        else if (retrievedTextLocal) {
            let keyValues = Object.keys(retrievedTextLocal)
            for (var i = 0; i < keyValues.length; i++) {
                let key = keyValues[i];
                if (key) {
                    if (retrievedTextLocal[key] === true) {
                        setValue(key);
                    }

                }
            }
        }
    }, [retrievedText, retrievedTextLocal]);

    useEffect(() => {
    }, [retrievedTextLocal]);

    useEffect(() => {
        if (sendData) {
            sendData(state, questionId);
        }
    }, [state]);

    useEffect(() => {
        if (sendNote) {
            sendNote(noteValue);
        }
    }, [noteValue]);

    const handleBlurLocal = (event) => {
        if (sendData) {
            let newValue = event.target.value;
            let newState = Object.assign({}, state);
            setState({ ...newState, other: { [newValue]: true } }); ///Nemam sajnu preco to funguje 
            setValue(newValue);
        }
    };

    const handleChange = (event) => {
        if (sendNote) {
            setNoteValue(event.target.value)
        }
        setValue(event.target.value);
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
                    value={value}
                    onChange={handleChange}
                    // classes={{
                    //     input: classes.resize,
                    // }}
                    className={classes.textField}
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline,
                            input: classes.resize,

                        }
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.resize,
                        }
                    }}
                />
            </div>
        </form>
    );
};

export default MultilineTextField;
