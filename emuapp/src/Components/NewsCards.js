import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as SourceIcon } from '../icons/source.svg';
import ButtonBase from '@material-ui/core/ButtonBase';
import { LIGHTGRAY, DARKGRAY } from '../utils/colours';
import moment from 'moment';
import Link from '@material-ui/core/Link';
import history from '../utils/history'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 10,
        borderRadius: 20,
    },
    title: {
        marginBottom: 5,
        textAlign: 'left',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        marginLeft: 5,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    iconDiv: {
        width: '10vw',
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: '1vw'
    },
    date: {
        color: DARKGRAY,
        textAlign: 'left',
        marginBottom: 10,
    }
});

const NewsCards = (props) => {
    const { news } = props
    const classes = useStyles();


    const renderCard = (news, i) => {
        return (
            <div key={i}>
                <Card className={classes.root} variant="outlined">
                    {/* <ButtonBase> */}
                    <CardContent>
                        <Typography className={classes.date} variant="body2" component="p">
                            {moment(news.pub_date).format('DD.MM.YYYY')}
                        </Typography>
                        <Typography className={classes.title} style={{ fontWeight: 'bold' }} variant="h5" component="h2">
                            <Link href={news.link} color='inherit'>
                                {news.title}
                            </Link>
                        </Typography>
                        <div className={classes.row}>
                            <div className={classes.iconDiv}>
                                <SourceIcon />
                            </div>
                            <div className={classes.column}>
                                <Typography className={classes.text} variant="body2" component="p">
                                    {news.rss_feed.name ? news.rss_feed.name : "Unknown"}
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                    {/* </ButtonBase> */}
                </Card>
            </div >
        );
    };

    return (
        <>
            {news.map((news, i) => renderCard(news, i))}
        </>

    );
}

export default NewsCards;
