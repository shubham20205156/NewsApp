import React, { Component } from 'react'

export class NewsBox extends Component {

    render() {
        let {title,description,imageUrl,url,author,date} = this.props;
        return (
            <div>

                <div className="card my-4 mx-3">
                    {/* below line meaning is --> if image is null show the given image here  */}
                    <img style={{height:"232px"}}src={!imageUrl?"https://c.ndtvimg.com/2022-01/b369q1jg_office-generic-istock_625x300_11_January_22.jpg":imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}.......</p>
                            <p className="card-text text-danger"><small>By {author} on {new 
                            Date(date).toGMTString()}</small></p>
                            <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">read more</a>
                            {/* using target = "_black " lead to news in new tab */}
                            
                        </div>
                </div>
                

            </div>
        )
    }
}

export default NewsBox

