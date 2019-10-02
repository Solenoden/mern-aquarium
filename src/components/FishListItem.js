import React, { Component } from 'react';
import PropTypes from "prop-types";
// import {Link} from "react-router-dom"; 

export default class FishListItem extends Component {

    render() {
        return (
            <div className="fishListItem">
                <button style={{backgroundColor: "#4d8794", color: "white"}} className="btn btn-basic btn-block rounded-0" onClick={this.props.displayFishInfo.bind(this, this.props.fish._id)}>{this.props.fish.name}</button>
            </div>
        )
    }
}

// PropTypes
FishListItem.propTypes = {
    fish: PropTypes.object.isRequired
};

