import React, { Component } from 'react'

export default class TankConditionConflict extends Component {
    render() {
        if(this.props.conflictType.toUpperCase() === "SALINITY"){
            return (
                <div>
                    <span className="d-block bg-danger text-white rounded-lg mb-1 p-1">{"x" + this.props.quantity + " " + this.props.fishName + ": Needs to be placed in a " + this.props.requiredSalinity + " tank"}</span>
                </div>
            )
        } else if (this.props.conflictType.toUpperCase() === "TEMPERATURE") {
            return (
                <div>
                    <span className="d-block bg-danger text-white rounded-lg mb-1 p-1">{"x" + this.props.quantity + " " + this.props.fishName + ": Needs a water temperature of " + this.props.requiredTempBottom + "*C - " + this.props.requiredTempTop + "*C"}</span>
                </div>
            )
        } else if(this.props.conflictType.toUpperCase() === "PHLEVEL") {
            return (
                <div>
                    <span className="d-block bg-danger text-white rounded-lg mb-1 p-1">{"x" + this.props.quantity + " " + this.props.fishName + ": Needs a Ph Level of " + this.props.requiredPhBottom + " - " + this.props.requiredPhTop}</span>
                </div>
            );
        } else if(this.props.conflictType.toUpperCase() === "VOLUME") {
            return (
                <div>
                    <span className="d-block bg-danger text-white rounded-lg mb-1 p-1">{"A total tank volume of " + this.props.requiredVolume + "L is needed. That is a missing " + (this.props.requiredVolume - this.props.tankVolume) + "L"}</span>
                </div>
            );
        } else if(this.props.conflictType.toUpperCase() === "FISH-RED") {
            return (
                <div>
                    <span className="d-block bg-danger text-white rounded-lg mb-1 p-1">{"x" + this.props.quantity + " " + this.props.fishName + " can't be in a tank with " + this.props.enemyName}</span>
                </div>
            );
        } else if(this.props.conflictType.toUpperCase() === "FISH-YELLOW") {
            return (
                <div>
                    <span className="d-block bg-warning text-white rounded-lg mb-1 p-1">{"x" + this.props.quantity + " " + this.props.fishName + " possibly can't be in a tank with " + this.props.enemyName}</span>
                </div>
            );
        } else if(this.props.conflictType.toUpperCase() === "NONE") {
            return (
                <div>
                    <span className="d-block bg-success text-white rounded-lg mb-1 p-1">{"None"}</span>
                </div>
            );
        } else {
            return (
                <div>
                    <span>{"Unknown Conflict"}</span>
                </div>
            )
        }
    }
}

