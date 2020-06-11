import React from 'react';
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

const MultilineTextField = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(value)
    };

    return (
        <form className={classes.root} noValidate autoComplete='off'>
            <div>
                <TextField
                    variant="outlined"
                    label='...vaša odpoveď'
                    multiline
                    rows={4}
                    onChange={handleChange}
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
