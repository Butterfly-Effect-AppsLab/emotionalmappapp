import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { WHITE, DARKGRAY  } from '../utils/colours';

const useStyles = makeStyles({
    root: {
        marginTop: 10,
        marginBottom: 30,
        width: '80vw',

    },
    inputStyle: {
        fontSize: 14,
        color: DARKGRAY,
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 6,
        },
        backgroundColor: WHITE,
        borderRadius: 6,
        color: DARKGRAY
    },
    // listbox: {
    //     maxHeight: 150,
    // },
    resize: {
        fontSize: 14
    }
});

const ComboBox = (props) => {
    const { type, otherOption, idComponent, sendData } = props;
    const classes = useStyles();
    const [inputText, setInputText] = React.useState('');
    const [inputOption, setInputOption] = React.useState({
        id: '',
        street: '',
        sub_part: '',
    });

    useEffect(() => {
        if(inputOption){
           sendData(inputOption.street, idComponent)
        }
    }, [inputOption])


    const handleInputChange = (value) => {
        setInputText(value);
        if (value == '') {
            setInputOption({...value, id: value, street: value, sub_part: value});
        }
    };

    const handleChange = (value) => {
        if (value) {
        setInputOption({...value, id: value.id, street: value.street, sub_part: value.sub_part});
        }
    }

    return (

        <Autocomplete
            className={classes.root}
            classes={{
                input: classes.resize,
                // listbox: classes.listbox
            }}
            options={[...otherOption, ...type]}
            maxSearchResults={4}
            getOptionLabel={(option) => option.street}
            groupBy={(option) => option.sub_part}
            onInputChange={(event, value) => handleInputChange(value)}
            onChange={(event, value) => handleChange(value)}
            noOptionsText="Ulica sa nenašla"
            // onClose={(event, value) => handleClose(value)}
            debug
            renderInput={(params) =>
                <TextField
                    {...params}
                    margin='dense'
                    label={inputText === '' && 'Začnite písať'}
                    variant='outlined'
                    InputLabelProps={{
                        shrink: false,
                        classes: { root: classes.inputStyle }
                    }}
                    className={classes.textField}
                />}
        />

    );
}

export default ComboBox;