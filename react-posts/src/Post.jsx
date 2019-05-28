import React from 'react';

const Post = (props) => {
  console.log(props);
  return (
    <div className="Post">
      <h3>{props.title}</h3>
      <p>{props.contents}</p>
    </div>
  );
}
 
export default Post;