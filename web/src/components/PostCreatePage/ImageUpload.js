import React from 'react';

export default function ImageUpload(props) {
  return (
    <div>
      <input type="file" onChange={(e) => props.onChange(e.target.files[0])} />

      {props.previewUrl
        ? <div> <img src={props.previewUrl} alt="preview img" /> </div>
        : <div> Please select an Image for Preview </div>
      }
    </div>
  );
}
