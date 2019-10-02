import React, { Component } from 'react';
// import axios from "axios";
// Components
import FishListItem from "./FishListItem";

export default class FishList extends Component {
    render() {
        return this.props.fishes.map((fish => (
            <FishListItem key={fish._id} fish={fish} displayFishInfo={this.props.displayFishInfo} />
        )));
    }
}
