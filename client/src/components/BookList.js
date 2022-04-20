import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';
import { useQuery } from '@apollo/react-hooks';
function list() {
    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         selected: null
    //     }
    // }
    // displayBooks(){
    //     console.log(this.props);
    //     var data = this.props.data;
        
    return data.books?.map(book => {
        return(
            <li key={ book.id } onClick={ (e) => this.setState({ selected: book.id }) }>{ book.name }</li>
        );
    })


const BookList = () => {
    
        
    // }
    // render(){
        console.log("list" + this.props.books);
        return(
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
                <BookDetails bookId={this.state.selected}></BookDetails>
            </div>
        );
}

export default graphql(getBooksQuery)(BookList);