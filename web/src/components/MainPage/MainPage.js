import React from 'react';
import MainHeader from './MainHeader';
import Post from './Post';


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            time:['2h ago','3h ago'],
            text:['cold evening','running outside'],
            comments:['Good pics','bad pics'],
            location:['Vancouver','New York']
        }
        this.handleTest=this.handleTest.bind(this);
    }



    handleTest=(e)=>{

        this.setState((prevState) => ({
            time: prevState.time.concat('4h ago')
          }));
          this.setState((prevState) => ({
            text: prevState.text.concat('4h ago')
          }));
          this.setState((prevState) => ({
            comments: prevState.comments.concat('4h ago')
          }));
          this.setState((prevState) => ({
            location: prevState.location.concat('4h ago')
          }));
    }
    render() {
        return (
            <div className="container">
                <MainHeader />
                
                <div className="row">
                    <div className="col">
                        {
                            this.state.time.map((option,index)=>(
                                <Post key={index} time={this.state.time[index]} text={this.state.text[index]} comments={this.state.comments[index]} location={this.state.location[index]}/>
                            )) 
                        }
                    </div>
                </div>
                <button onClick={this.handleTest}>Test</button> 
            </div>
        );
    }
}
