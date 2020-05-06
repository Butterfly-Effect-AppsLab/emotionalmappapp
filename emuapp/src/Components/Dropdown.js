// import React from 'react';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import InputBase from '@material-ui/core/InputBase';
// import { TEXTGRAY, WHITE } from '../utils/colours';

// const BootstrapInput = withStyles((theme) => ({
//     input: {
//         borderRadius: 6,
//         position: 'relative',
//         backgroundColor: WHITE,
//         border: '1px solid #ced4da',
//         fontSize: 14,
//         padding: '10px 26px 10px 12px',
//         transition: theme.transitions.create(['border-color', 'box-shadow']),
//         '&:focus': {
//             borderRadius: 6,
//             borderColor: '#80bdff',
//             boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//         },
//     },
// }))(InputBase);

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         minWidth: 120,
//         marginTop: 10,
//         marginBottom: 30,
//     },
//     menuList: {
//         maxHeight: 150,
//         borderRadius: 6,
//     },
//     labelStyle: {
//         fontSize: 14,
//         color: TEXTGRAY,
//     },
// }));

// const Dropdown = (props) => {
//     const { type, idComponent, valueChange } = props;
//     const classes = useStyles();
//     const [fieldData, setFieldData] = React.useState('');

//     const createMenuItem = (data, index) => {
//         return (
//             <MenuItem value={index}>{data}</MenuItem>
//         )
//     };

//     const handleChange = (event) => {
//         setFieldData(event.target.value);
//     };

//     return (
//         <div>
//             <FormControl className={classes.formControl} margin='dense'>
//                 <InputLabel
//                     id="demo-customized-select-label"
//                     shrink={false}
//                     classes={{ formControl: classes.labelStyle }}
//                 >
//                     {fieldData === '' && 'Vybrať'}
//                 </InputLabel>
//                 <Select
//                     labelId="demo-customized-select-label"
//                     id="demo-customized-select"
//                     value={fieldData}
//                     onChange={handleChange}
//                     input={<BootstrapInput />}
//                     MenuProps={{
//                         getContentAnchorEl: null,
//                         anchorOrigin: {
//                             vertical: "bottom",
//                             horizontal: "left",
//                         },
//                         classes: { paper: classes.menuList }
//                     }}
//                 >
//                     {
//                         type ? type.map((data, index) => createMenuItem(data, index)) : [] //alebo null
//                     }
//                 </Select>
//             </FormControl>
//         </div>
//     );
// };

// export default (Dropdown);






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
        marginTop: 10,
        marginBottom: 30,
    },
    menuList: {
        maxHeight: 150,
        borderRadius: 6,
    },
    labelStyle: {
        fontSize: 14,
        color: TEXTGRAY,
    },
    inputStyle: {
        fontSize: 14,
        borderRadius: 6,
    },
    outlined: {
        backgroundColor: WHITE,
        borderRadius: 6,
    }
});


const Dropdown = (props) => {
    const { type, idComponent, valueChange } = props;
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
                    classes={{ outlined: classes.outlined }}
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
