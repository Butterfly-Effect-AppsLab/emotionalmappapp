import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Popper from '@material-ui/core/Popper';
import { WHITE } from '../utils/colours';
import { TEXTGRAY } from '../utils/colours';

const useStyles = makeStyles({
    root: {
        minWidth: 120,
        marginTop: 10,
        marginBottom: 30,
    },
    boxSize: {

    },
    inputStyle: {
        fontSize: 14,
        color: TEXTGRAY,
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: 6,
        },
        backgroundColor: WHITE,
        borderRadius: 6,
        color: TEXTGRAY
    }
});

const ComboBox = (props) => {
    const { type } = props;
    const classes = useStyles();
    const [inputText, setInputText] = React.useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const PopperMy = function (props) {
        return (<Popper {...props} style={{ maxHeight: 150 }} placement='bottom-start' />)
    };



    return (

        <Autocomplete
            className={classes.root}
            options={type ? type : 'Loading...'}
            maxSearchResults = {4}
            getOptionLabel={(option) => option.street}
            style={{ width: 300 }}
            onInputChange={handleInputChange}
            // PopperComponent={PopperMy}
            // menuStyle={{maxHeight: 150}}
            renderInput={(params) =>
                <TextField
                    {...params}
                    margin='dense'
                    onClick={console.log(inputText)}
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