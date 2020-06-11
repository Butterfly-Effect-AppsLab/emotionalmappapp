import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { WHITE, RED, DARKGRAY } from '../utils/colours';
import Typography from '@material-ui/core/Typography'

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        marginLeft: '5vw',
        marginRight: '5vw',
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: WHITE,
    },
    bar: {
        borderRadius: 5,
        backgroundColor: RED,
    },
}))(LinearProgress);

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    label: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: DARKGRAY,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '1vh',
    },
});

const ProgressBar = (props) => {
    const {numPages, currPage} = props; 
    const classes = useStyles();

    console.log(currPage)
    var progressValue = currPage/numPages * 100;

    return (
        <div className={classes.root}>
            <br />
            <BorderLinearProgress variant="determinate" value={progressValue} />
            <Typography className={classes.label} variant="body2" component="p">
                Strana {currPage} z {numPages}
            </Typography>
        </div>
    );
};

export default ProgressBar;
