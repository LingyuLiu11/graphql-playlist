import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
    displayBooks(){
        console.log(this.props);
        var data = this.props.data;
        
            return data.books?.map(book => {
                return(
                    <li key={ book.id }>{ book.name }</li>
                );
            })
        
        
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);