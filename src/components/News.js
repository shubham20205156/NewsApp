import React, { Component } from 'react'
import NewsBox from './NewsBox'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // constructor render ke pahle run hota hai
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0

    }
    document.title = `Aaj Tak - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async updateNews() {
    
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    this.props.setProgress(100);
  }



  // componentDidMound will always run after render function 
  async componentDidMount() {

    this.updateNews();
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcb49f9084794ff0942a4b1cc19aa751&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
  }


  // these are prev and next button only  this is only for learning purpose not for useable you can use also 
  // handlePrevBtn = async () => {

  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcb49f9084794ff0942a4b1cc19aa751&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false

  //   })

  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  // handleNextBtn = async () => {

  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)))

  //     this.setState({ page: this.state.page + 1 });
  //   this.updateNews();

  // }

  fetchMoreData = async() => {

    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false });
  };

  render() {


    return (
      <div className='container'>

        <h2 style={{marginTop:'90px'}} className="text-center ">AajTak - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
        {/* the below line means that if loading is true then show spinner otherwise don't show */}
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsBox title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 94) : ""} imageUrl={element.urlToImage} url={element.url} author={!element.author ? "Unknown" : element.author} date={element.publishedAt} />
                </div>
              })}
            </div>


            {/* this is button to doing next and previous in page */}
            {/* <div className="container d-flex justify-content-between">
              <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mb-3 mt-3" onClick={this.handlePrevBtn}>&larr; previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark mb-3 mt-3" onClick={this.handleNextBtn}>Next &rarr;</button>
            </div> */}
          </div>
        </InfiniteScroll>
      </div>

    )
  }
}

export default News
