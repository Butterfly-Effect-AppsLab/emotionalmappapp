import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DARKGRAY, RED, WHITE } from '../utils/colours';
import MultilineTextField from './MultilineTextField';
import ButtonTemplate from './ButtonTemplate';
import history from '../utils/history'


const useStyles = makeStyles({
    root: {
        marginTop: '10vh',
    },
    rootCard: {
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
        marginBottom: '5vh',
    },
    overrideCard: {
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
        marginBottom: '5vh'
    },
    card: {
        marginTop: '3vh',
        marginBottom: '3vh',
        justifyContent: 'center',
        textAlign: 'center',
    },
    button: {
        marginTop: '3vh'
    },
    textField: {
        marginBottom: '1vh'
    },
    returnButton: {
        marginTop: '10vh',
        paddingBottom: '10vh',
        justifyContent: 'center',
        textAlign: 'center',
    }
});

const ThankYouCard = (props) => {
    const { sendDataToPage, onNoteButtonClick, isNoteButtonDisabled, isNoteSent } = props;
    const classes = useStyles();
    const [buttonStyle, setButtonStyle] = React.useState({
        textColor: '',
        background: '',
    });

    const getNote = (value) => {
        sendDataToPage(value)
    };

    useEffect(() => {
        if (isNoteButtonDisabled === true) {
            setButtonStyle({ ...buttonStyle, textColor: DARKGRAY, background: WHITE })
        }
        else {
            setButtonStyle({ ...buttonStyle, textColor: RED, background: WHITE })
        }
    }, [isNoteButtonDisabled]);

    const onButtonClick = () => {
        history.push('/surveys')
    };

    const renderNoteContent = () => {
        if (isNoteSent === false) {
            return (
                <>
                    <div className={classes.card} >
                        <Typography className={classes.textField} variant="subtitle2" component="p">
                            Chcete nám k tomuto prieskumu ešte niečo odkázať?
                        </Typography>
                        <MultilineTextField sendNote={(value) => { getNote(value) }} />
                        <div className={classes.button}>
                            <ButtonTemplate variant="outlined" background={buttonStyle.background} textColor={buttonStyle.textColor} isDisabled={isNoteButtonDisabled} text={'Odoslať'} primary={true} onButtonClick={() => { onNoteButtonClick() }} />
                        </div>
                    </div>

                </>
            );
        }
        else {
            return (
                <>
                    <div className={classes.card} >
                        <Typography variant="subtitle2" component="p">
                            Vaša správa bola odoslaná
                        </Typography>
                    </div>
                </>
            )
        }

    };


    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h5" component="h2">
                Ďakujeme
            </Typography>
            <Typography className={classes.text} variant="subtitle2" component="p">
                Aj váš názor je dôležitý pre budovanie <br /> lepšej Bratislavy!
            </Typography>
            <hr className={classes.line} />
            <Card className={classes.rootCard}
                variant="outlined"
                classes={{ root: classes.overrideCard }}
            >
                {renderNoteContent()}
            </Card>
            <div className={classes.returnButton}>
                <ButtonTemplate variant="outlined" background={RED} textColor={WHITE} text={'Návrat k prieskumom'} primary={true} onButtonClick={() => { onButtonClick() }} />
            </div>
        </div>

    );
}


export default ThankYouCard;
