import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class FishInfo extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="fishInfo-nameAndActions">
                    <h2 style={{ textAlign: "center", marginTop: "25px", fontSize: "2em"}}>{this.props.fish.name}</h2>
                    <h6 className="text-center" style={{margin: "5px 0 25px 0", fontSize: "1em"}}>{this.props.fish.fishType + " Fish"}</h6>

                    <div className="fishInfo-actionList">
                        <Link to={"/fish/edit/" + this.props.fish._id}><button className="btn btn-info" style={{margin: "0px 15px 10px 0px", width: "80%", backgroundColor: "#DB6C0F", borderWidth: "0"}}>Edit</button></Link>
                        <button className="btn btn-danger" style={{margin: "0px 15px 0px 0px", width: "80%", backgroundColor: "#DB6C0F", borderWidth: "0"}} onClick={this.props.deleteFish.bind(this, this.props.fish._id)}>Delete</button>
                    </div>  
                </div>

                <div className="container fishInfo-body">
                    <div className="fishInfo-flex">
                        <img className="fishPortrait rounded-circle" src={this.props.fish.imgURL} alt={"Image of: " + this.props.fish.name}></img>
                        <p style={{fontSize: "1em", lineHeight: "1.75em", marginBottom: "25px"}}>{this.props.fish.description}</p>
                    </div>
                    <div>
                        <div className="card mb-3 text-dark">
                            <div className="card-header">
                                <h3 style={{fontSize: "1.5em"}}>Living Conditions</h3>
                            </div>
                            <div className="card-body">
                                <h5 style={{fontSize: "1em"}}>Temperature: <span style={{fontWeight: "normal"}}>{this.props.fish.tempBottom + "C - " + this.props.fish.tempTop + "C"}</span></h5>
                                <h5 style={{fontSize: "1em"}}>Salinity: <span style={{fontWeight: "normal"}}>{this.props.fish.fishType}</span></h5>
                                <h5 style={{fontSize: "1em"}}>PH Levels: <span style={{fontWeight: "normal"}}>{this.props.fish.phBottom + " - " + this.props.fish.phTop}</span></h5>
                                <h5 style={{fontSize: "1em"}}>Diet: <span style={{fontWeight: "normal"}}>{this.props.fish.diet}</span></h5>
                                <h5 style={{fontSize: "1em"}}>Size: <span style={{fontWeight: "normal"}}>{this.props.fish.size + "cm"}</span></h5>
                                <h5 style={{fontSize: "1em"}}>Temperament: <span style={{fontWeight: "normal"}}>{this.props.fish.temperament}</span></h5>
                                <h5 style={{fontSize: "1.25em"}}>Tank Mates:</h5>
                                {this.getTankMates()}
                                <h5 style={{fontSize: "1.25em", marginTop: "8px"}}>Fishy Enemies:</h5>
                                {this.getFishEnemies()}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    getTankMates = () => {
        if (this.props.fish.tankMates.length !== 0) {
            return this.props.fish.tankMates.map((tankMate) => {
                return (
                <div className="mb-1" key={this.props.fish.tankMates.indexOf(tankMate)} >{tankMate}</div>
                );
            });
        } else {
            return (
                <div>None</div>
            );
        }
    };

    getFishEnemies = () => {
        if (this.props.fish.enemies.length !== 0) {
            return this.props.fish.enemies.map((enemy) => {
                return (
                <div className="mb-1" key={this.props.fish.enemies.indexOf(enemy)}>{enemy}</div>
                );
            });
        } else {
            return (
                <div>None</div>
            );
        } 
    };
}

