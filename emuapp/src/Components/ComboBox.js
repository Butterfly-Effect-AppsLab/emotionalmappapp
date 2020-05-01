import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        marginLeft: 0,
        minWidth: 120,
    },
}));

const ComboBox = (props) => {
    const { type } = props;
    const classes = useStyles();

    return (
        <Autocomplete
            className={classes.root}
            // id="combo-box-demo"
            options={type ? type : 'Loading...'}
            getOptionLabel={(option) => option.street}
            style={{ width: 300 }}
            shrink={false}
            renderInput={(params) => <TextField {...params} label="Začnite písať" variant="outlined" />}
        />
    );
}

export default ComboBox;