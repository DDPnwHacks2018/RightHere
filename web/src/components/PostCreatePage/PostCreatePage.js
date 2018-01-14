import React from 'react';
import axios from 'axios';

import PostCreateHeader from './PostCreateHeader';
import ImageUpload from './ImageUpload';

import pGetGeolocation from '../../utils/pGetGeolocation';

const pFileDataReader = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsBinaryString(file);
    });
};

const pFileUrlReader = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(file);
    });
};


export default class PostCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            imagePreviewUrl: null,
        };
        this.textareaEle = null;

        this.onCreatePost = this.onCreatePost.bind(this);
        this.onImageUploadChange = this.onImageUploadChange.bind(this);
    }

    pLoadImageData() {
        return Promise.resolve()
            .then(() => {
                if (this.state.image) {
                    return pFileDataReader(this.state.image);
                } else {
                    return null;
                }
            });
    }

    onCreatePost() {
        console.log("PostCreatePage:onCreatePost");

        const textData = this.textareaEle.value.trim();

        axios.all([this.pLoadImageData(), pGetGeolocation()])
            .then(axios.spread((imageData, geolocation) => {
                const data = {
                    text: textData,
                    images: imageData ? [imageData] : [],
                    loc: [geolocation.lat, geolocation.lng],
                };
                console.log("PostCreatePage:onCreatePost: ", data);
                // TODO, create post, jump back to main page
            }));
    };

    onImageUploadChange(image) {
        console.log("PostCreatePage:onImageUploadChange - name: ", image.name);

        pFileUrlReader(image)
            .then((imagePreviewUrl) => {
                this.setState({
                    image: image,
                    imagePreviewUrl: imagePreviewUrl,
                });
            });
    }

    render() {
        return (
            <div className="container">
                <PostCreateHeader onCreatePost={this.onCreatePost} />
                <textarea rows="4" cols="60" ref={input => this.textareaEle = input}></textarea>
                <ImageUpload
                    previewUrl={this.state.imagePreviewUrl}
                    onChange={this.onImageUploadChange} />
            </div>
        );
    }
}
