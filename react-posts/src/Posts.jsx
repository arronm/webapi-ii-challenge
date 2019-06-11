import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4444/api/posts')
      .then(({ data }) => {
        this.setState({
          ...this.state,
          posts: data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Posts">
        {
          this.state.posts.map(post => <Post {...post} />)
        }
      </div>
    );
  }
}
 
export default Posts;
