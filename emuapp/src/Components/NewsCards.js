import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 10,
    },
    text: {
        marginBottom: 10,
    },

});

const NewsCards = (props) => {
    const { news } = props
    const classes = useStyles();

    const renderCard = (news, i) => {
        return (
            <div key={i}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.text} style={{fontWeight: 'bold'}} variant="h5" component="h2">
                            {news.title}
                        </Typography>
                        <Typography className={classes.text} variant="body2" component="p">
                            {news.description}
                        </Typography>
                        <Typography className={classes.text} variant="body2" component="p">
                            - {news.author ? news.author : "Unknown"}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {news.feedback ? <Button variant='contained' color='primary'>Give Feedback</Button> : null}
                    </CardActions>
                </Card>
            </div>
        );
    };

    return (
        <>
            {news.map((news, i) => renderCard(news, i))}
        </>

    );
}

export default NewsCards;
