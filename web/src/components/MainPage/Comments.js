import React from 'react';

const Comments = (props) => (
  <div>
    {
      props.comments.map((comment, index) => (
        <p>{comment}</p>
      ))
    }
  </div>
);

export default Comments;
