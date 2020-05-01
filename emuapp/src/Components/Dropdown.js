import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { WHITE } from '../utils/colours'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft: 0,
        minWidth: 120,
        // backgroundColor: WHITE,
    },
    menuList: {
        maxHeight: 150,
    },
    // inputSize: {
    //     maxHeight: 5,
    // },
    // inputPosition: {
    //     top: '-15%',
    // }

}));


const Dropdown = (props) => {
    const { type } = props;
    const classes = useStyles();
    const [fieldData, setFieldData] = React.useState('');

    const handleChange = (event) => {
        setFieldData(event.target.value);
    };

    const createMenuItem = (data, index) => {
        return (
            <MenuItem value={index}>{data}</MenuItem>
        )
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    shrink={false}
                    id="demo-simple-select-outlined-label"
                    // classes={{ formControl: classes.inputPosition }}
                >
                    {fieldData === '' && 'Vybrať'}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={fieldData}
                    onChange={handleChange}
                    MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        classes: { paper: classes.menuList }
                    }}
                    classes={{ root: classes.inputSize }}
                >

                    {
                        type ? type.map((data, index) => createMenuItem(data, index)) : "Loading..."
                    }

                </Select>
            </FormControl>
        </div>
    );
};




export default (Dropdown);
