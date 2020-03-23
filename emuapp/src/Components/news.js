import React from 'react'

const News = ({ news }) => {
    return (
        <div>
            <center><h1>Newsletter</h1></center>
            {news.map((news,i) => (
                <div className="card" key={i}>
                    <h5 className="card-header">{news.title}</h5>
                    <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">{news.description}</h6>
                    <p>- {news.author ? news.author: "Unknown"}</p>
                    <a href="#" className="btn btn-warning" >Give feedback</a>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default News