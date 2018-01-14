import React from 'react';

export default function ImageUpload(props) {
  return (
    <div className="row imageUpload">
      <input type="file" onChange={(e) => props.onChange(e.target.files[0])} />

      {props.previewUrl
        ? <div> <img src={props.previewUrl} alt="preview img" /> </div>
        : <div > <i className="fa fa-cloud-upload" aria-hidden="true"></i> Please select an Image for Preview </div>
      }
    </div>
  );
}
