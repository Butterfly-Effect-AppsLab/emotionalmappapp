import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { WHITE } from '../utils/colours';
import { TEXTGRAY } from '../utils/colours';


const useStyles = makeStyles({
    formControl: {
        minWidth: 120,
        // backgroundColor: WHITE,
        // borderRadius: 30,
        marginTop: 10,
        marginBottom: 30,
    },
    menuList: {
        maxHeight: 150,
    },
    labelStyle: {
        fontSize: 14,
        color: TEXTGRAY,
    },
    inputStyle: {
        fontSize: 14,
    },
    outlined: {
        backgroundColor: WHITE,
        borderRadius: 30,
    }
});


const Dropdown = (props) => {
    const { type, idComponent } = props;
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
            <FormControl variant="outlined" margin='dense' className={classes.formControl}>
                <InputLabel
                    shrink={false}
                    id="demo-simple-select-outlined-label"
                    classes={{ formControl: classes.labelStyle }}
                >
                    {fieldData === '' && 'Vybrať'}
                </InputLabel>
                <Select
                    className={classes.inputStyle}
                    labelId="demo-simple-select-outlined-label"
                    id={idComponent}
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
                    classes={{ select: classes.outlined}}
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
