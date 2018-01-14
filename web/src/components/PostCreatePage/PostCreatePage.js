import React from 'react';
import PostCreateHeader from './PostCreateHeader';
import ImageUpload from './ImageUpload';

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

    onCreatePost() {
        console.log("PostCreatePage:onCreatePost");

        const textData = this.textareaEle.value.trim();

        if (this.state.image) {
            let reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result;
                const data = {
                    text: textData,
                    images: [imageData],
                };
                console.log("PostCreatePage:onCreatePost: ", data);
                // TODO, create post, jump back to main page
            };
            reader.readAsBinaryString(this.state.image);
        } else {
            const data = {
                text: textData,
                images: [],
            };
            console.log("PostCreatePage:onCreatePost: ", data);
            // TODO, create post, jump back to main page
        }


        //const post = e.target.elements.content.value.trim();
        // this.setState((prevState) => ({
        //     comments: prevState.comments.concat(comment)
        //   }));
        //e.target.elements.content.value = '';
    };

    onImageUploadChange(image) {
        console.log("PostCreatePage:onImageUploadChange - name: ", image.name);

        let reader = new FileReader();
        reader.onload = () => {
            this.setState({
                image: image,
                imagePreviewUrl: reader.result,
            });
        }
        reader.readAsDataURL(image);
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
