import React from "react";

import uuid from "react-uuid";

import ArticleTeaser from "./ArticleTeaser";

type MyState = {
  data: [number];
  err: any;
  isLoading: boolean;
};

class ArticleTeasers extends React.Component {
  state: MyState = {
    data: [0],
    err: null,
    isLoading: false,
  };

  getData() {
    let api_url =
      "http://www.randomnumberapi.com/api/v1.0/random?min=0&max=20&count=1";

    fetch(api_url)
      .then((res) => {
        // Unfortunately, fetch doesn't send (404 error) into the cache itself
        // You have to send it, as I have done below
        if (res.status >= 400) {
          throw new Error("Server responds with error!");
        }
        return res.json();
      })
      .then(
        (data) => {
          this.setState({
            data,
            isLoading: false,
          });
        },
        (err) => {
          this.setState({
            err,
            isLoading: false,
          });
        }
      );
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getData();
  }

  render() {
    let { data, err, isLoading } = this.state;

    let numArr = [...Array(data[0]).keys()];

    if (err) {
      return <div> {err.message} </div>;
    }

    if (isLoading) {
      return <div> Loading... </div>;
    }

    return (
      <div className="ab-testing">
        <h1>article teasers</h1>
        <ul className="article-teasers-list">
          {numArr.map((number) => (
            <ArticleTeaser key={uuid()} />
          ))}
        </ul>
      </div>
    );
  }
}

export default ArticleTeasers;
