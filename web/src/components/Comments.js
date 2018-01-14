import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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