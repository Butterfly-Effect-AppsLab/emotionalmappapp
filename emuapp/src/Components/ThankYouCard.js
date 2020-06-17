import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DARKGRAY, RED, WHITE } from '../utils/colours';
import MultilineTextField from './MultilineTextField';
import ButtonTemplate from './ButtonTemplate';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    label: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: DARKGRAY,
    },
    text: {
        marginTop: 'auto',
        marginBottom: 'auto',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        borderRadius: 20,
    },
    title: {
        marginTop: 'auto',
        marginBottom: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
    line: {
        borderRadius: 20,
        backgroundColor: RED,
        color: RED,
        width: '10vw',
    }

});

const ThankYouCard = (props) => {
    const { sendDataToPage, onNoteButtonClick, isNoteButtonDisabled } = props;
    const classes = useStyles();

    const getNote = (value) => {
            sendDataToPage(value)
    };

    return (
        <>
            <Typography className={classes.title} variant="h5" component="h2">
                Ďakujeme
            </Typography>
            <Typography className={classes.text} variant="subtitle2" component="p">
                    Aj váš názor je dôležitý pre budovanie <br/> lepšej Bratislavy!
            </Typography>
            <hr className={classes.line} />
            <Card className={classes.root}
                variant="outlined"
                classes={{ root: classes.card }}
            >
                <CardContent>
                    <MultilineTextField sendNote={(value) => { getNote(value) }}/>
                    <ButtonTemplate variant="outlined" background={WHITE} textColor={RED} isDisabled={isNoteButtonDisabled} text={'Odoslať'} primary={true} onButtonClick={() => { onNoteButtonClick() }} />
                </CardContent>
                <CardActions className={classes.button}>
                </CardActions>
            </Card>
        </>

    );
}


export default ThankYouCard;
