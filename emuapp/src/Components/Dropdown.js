import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { getYears } from '../redux/selectors';
import { getSexes } from '../redux/selectors';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
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
    const { type, years, sexes, streets } = props;
    console.log('blablabla', years)
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

    const fieldType = () => {
    switch (type) {
        case 'years':
            return years;
        case 'sexes':
            return sexes;
        case 'streets':
            return streets;
    }};

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
                    // classes={{ root: classes.inputSize }}
                >

                    {
                        fieldType() ? fieldType().map((data, index) => createMenuItem(data, index)) : "Loading..."
                    }

                </Select>
            </FormControl>
        </div>
    );
};

const mapStateToProps = (state) => {
    const years = getYears(state);
    const sexes = getSexes(state);
    return { years, sexes };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
