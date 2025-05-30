import React, { Component } from "react";
import NewsComp from "./NewsComp";
import Spinner from "./spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    category: "general",
    pageSize: 6,
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  fetchnews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a010758ac1247749b2aed1c075c05d1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };
  async componentDidMount() {
    this.fetchnews();
  }
  nextHandler = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => {
        this.fetchnews();
      }
    );
  };
  prevHandler = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      () => {
        this.fetchnews();
      }
    );
  };
  render() {
    return (
      <div className="container mt-4">
        <h1 className="text-center">Top Headline</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsComp
                    title={
                      element.title
                        ? element.title.length > 75
                          ? element.title.slice(0, 75) + "..."
                          : element.title
                        : ""
                    }
                    description={
                      element.description
                        ? element.description.length > 150
                          ? element.description.slice(0, 150) + "..."
                          : element.description
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    url={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-around my-2">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.prevHandler}
          >
            &#8592; Previous
          </button>
          <div class="btn-group me-2" role="group" aria-label="First group">
            {(() => {
              const buttons = [];
              const totalPages = Math.ceil(
                this.state.totalResults / this.props.pageSize
              );
              const start = Math.max(1, this.state.page - 2);
              const end = Math.min(totalPages, this.state.page + 2);

              for (let index = start; index <= end; index++) {
                buttons.push(
                  <button
                    key={index}
                    className={`btn ${
                      this.state.page === index ? "btn-dark" : "btn-secondary"
                    }`}
                    onClick={() =>
                      this.setState({ page: index }, this.fetchnews)
                    }
                  >
                    {index}
                  </button>
                );
              }
              return buttons;
            })()}
          </div>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.nextHandler}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &#8594;
          </button>
        </div>
      </div>
    );
  }
}
