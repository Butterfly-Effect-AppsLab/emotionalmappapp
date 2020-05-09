import React, { useEffect } from 'react';
import NewsCards from '../Components/NewsCards';
import Loading from '../Components/Loading';

const NewsPage = () => {
    const [news, setNews] = React.useState([]);

    useEffect(() => {
        fetch('/api/news')
            .then(res => res.json())
            .then(data => {
                setNews(data.data);
                
            }).catch(resp => {
                console.error(resp);
            });
    }, [])

    if (news) {
        return (
            <div>
                <center><h1>Newsletter</h1></center>
                <NewsCards news={news} />
            </div>
        )
    }
    else
        return <Loading />
};

export default NewsPage;