import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { WHITE, DARKGRAY } from '../utils/colours';

const useStyles = makeStyles({
    formControl: {
        width: '80vw',
        // backgroundColor: WHITE,
        marginTop: 10,
        marginBottom: 30,
    },
    menuList: {
        maxHeight: 150,
        borderRadius: 6,
    },
    labelStyle: {
        paddingBottom: "9px",
        fontSize: 14,
        color: DARKGRAY,
    },
    inputStyle: {
        fontSize: 14,
        borderRadius: 6,
    },
    outlined: {
        backgroundColor: WHITE,
        borderRadius: 6,
    },
    centerLabel:{
        paddingBottom: 9
    }
});


const Dropdown = (props) => {
    const { type, idComponent, sendData } = props;
    const classes = useStyles();
    const [inputOption, setInputOption] = React.useState('');

    useEffect(() => {
        if(inputOption){
           sendData(inputOption.props.children, idComponent)
        }
    }, [inputOption])


    const handleChange = (child) => {
        setInputOption(child);
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
                    classes={{ formControl: classes.labelStyle, marginDense: classes.centerLabel }}
                >
                    {inputOption === '' && 'Vybrať'}
                </InputLabel>
                <Select
                    className={classes.inputStyle}
                    classes={{ root: classes.inputStyle, outlined: classes.outlined }}
                    labelId="demo-simple-select-outlined-label"
                    id={idComponent}
                    onChange={(event, child) => handleChange(child)}
                    MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        classes: { paper: classes.menuList }
                    }}
                >
                    {
                        type ? type.map((data, index) => createMenuItem(data, index)) : [] //alebo null
                    }

                </Select>
            </FormControl>
        </div >
    );
};




export default (Dropdown);
