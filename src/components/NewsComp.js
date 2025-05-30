import React, { Component } from "react";

export default class NewsComp extends Component {
  render() {
    let { title, description, imageUrl, url } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ height: "25rem" }}>
          <img
            src={imageUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "10rem" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <div className="text-center">
              <a href={url} className="btn btn-sm btn-dark center">
                Read More!
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
