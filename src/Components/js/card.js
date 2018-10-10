import React, { Component } from 'react';
import Parser from 'html-react-parser';
import ReactDom, { render } from 'react-dom';
import '../css/card.css';

class Card extends Component {

    constructor() {
        super();
        this.state = {
            characterProperties: [],
            URL_PATH: 'https://kitsu.io/api/edge/characters',
            nextURL: '',
            prevURL: '',
            prevButton: true,
            nextButton: false, 
            actualPage: 1,
            // showMoreOrLess: 'Show more...',
            // inlineStyle: {}
        };
        this.fetchFromApi(this.state.URL_PATH);
    }

    // seeMoreContent(index) {
    //     const updateState = this.state.showMoreOrLess === 'Show more...' ? 'Show less...' : 'Show more...';
    //     const updateStyle = this.state.showMoreOrLess === 'Show more...' ? {height: '100%', overflow: 'visible'} : {height: '200px', overflow: 'hidden'};
    //     this.setState({
    //         showMoreOrLess: updateState,
    //         inlineStyle: updateStyle  
    //     });
    //     console.log('see more here key:' + index);
    // }

    previewContent() {
        const actualPage = this.state.actualPage - 1;
        const prevURL = this.state.prevURL;
        this.setState({actualPage: actualPage});
        this.fetchFromApi(prevURL);
        ReactDom.findDOMNode(this).scrollIntoView();
    }
    
    nextContent() {
        let actualPage = this.state.actualPage +1;
        const nextURL = this.state.nextURL;
        this.setState({actualPage: actualPage});
        this.fetchFromApi(nextURL);
        ReactDom.findDOMNode(this).scrollIntoView();
    }

    processData (data) {
        const characterProperties = data[0].map((data) => data.attributes);
        const prevURL = data[2].prev;
        const nextURL = data[2].next;
        const prevButton = !!!prevURL;
        const nextButton = !!!nextURL;

        this.setState({
            characterProperties: characterProperties,
            prevURL: prevURL,
            nextURL: nextURL,
            prevButton: prevButton,
            nextButton: nextButton
        })
    }

    fetchFromApi(URLtoFetch) {
        fetch(URLtoFetch)
            .then((response) => {
                response.json()
                    .then((responseData) => {
                        const characterArray = Object.values(responseData);
                        this.processData(characterArray);
                    })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const characterProperties = this.state.characterProperties
        return (
            <div>
                {characterProperties.map((attributes, index) => {
                return <div key={index} keyprop={index} className="card-block">
                                <img key={index+10} keyprop={index+10} className="card-image" src={attributes.image.original} alt={attributes.canonicalName} ></img>
                                <p key={index+20} keyprop={index+20} className="card-text__name"> {attributes.canonicalName} </p>
                                <p key={index+30} keyprop={index+30} className="card-text__other-names"> {attributes.otherNames.map(otherNames => Parser(otherNames + '<br>') )} </p>
                                <p key={index+40} keyprop={index+40} className="card-text__description" /*style={this.state.inlineStyle}*/> {Parser(attributes.description)} </p>
                                {/* <span key={index+50} keyprop={index+50} className="card-text__more-section" onClick={this.seeMoreContent.bind(this, index+50)}> {this.state.showMoreOrLess}</span> */}
                        </div>
                })}

                <button className="button button__preview" onClick={this.previewContent.bind(this)} disabled={this.state.prevButton}>Prev.</button>
                <p className="page-counter">[Page {this.state.actualPage}]</p>
                <button className="button button__next" onClick={this.nextContent.bind(this)} disabled={this.state.nextButton}>Next</button>
            </div>
        );
    }
}

export default Card;