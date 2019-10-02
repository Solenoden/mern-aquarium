import React, {Component} from 'react'
import TankConditionConflict from './TankConditionConflict';

export default class AquariumConflictViewer extends Component {
    constructor(props) {
        super(props);

        this.renderSalinityConflicts = this.renderSalinityConflicts.bind(this);
        this.renderTempConflicts = this.renderTempConflicts.bind(this);
        this.renderPhLevelConflicts = this.renderPhLevelConflicts.bind(this);
        this.renderVolumeConflicts = this.renderVolumeConflicts.bind(this);

        this.state = {
            salinityConflicts: this.props.calcSalinityConflicts(this.props.fishes, this.props.salinity).filter((currConflict) => currConflict != null),
            tempConflicts: this.props.calcTempConflicts(this.props.fishes, this.props.temp).filter((currConflict) => currConflict != null),
            phLevelConflicts: this.props.calcPhLevelConflicts(this.props.fishes, this.props.phLevel).filter((currConflict) => currConflict != null),
            volumeConflicts: [this.props.calcVolumeConflicts(this.props.fishes, this.props.volume)].filter((currConflict) => currConflict != null),
            fishOnFishConflicts: this.props.calcFishOnFishConflicts(this.props.fishes).filter((currConflict) => currConflict != null)
        };
    }
    // Other render methods
    renderSalinityConflicts() {
        if (this.state.salinityConflicts.length !== 0) {
            return this.state.salinityConflicts.map((currConflict) => {
                if(currConflict.conflictType.toUpperCase() === "SALINITY") {
                    return (
                        <TankConditionConflict 
                            conflictType="salinity" 
                            fishName={currConflict.fishName} 
                            quantity={currConflict.quantity} 
                            requiredSalinity={currConflict.requiredSalinity} 
                    />);
                } else {
                    return null;
                }
            });
        } else {
            return (<TankConditionConflict conflictType= "none"/>);
        }
    }
    renderTempConflicts() {
        if (this.state.tempConflicts.length !== 0) {
            return this.state.tempConflicts.map((currConflict) => {
                if(currConflict.conflictType.toUpperCase() === "TEMPERATURE") {
                    return (
                        <TankConditionConflict 
                            conflictType="temperature" 
                            fishName={currConflict.fishName} 
                            quantity={currConflict.quantity} 
                            requiredTempTop={currConflict.requiredTempTop} 
                            requiredTempBottom={currConflict.requiredTempBottom} 
                    />);
                    } else {
                        return null;
                    }
            });
        } else {
            return (<TankConditionConflict conflictType= "none"/>);
        }
    }
    renderPhLevelConflicts() {
        if (this.state.phLevelConflicts.length !== 0) {
            return this.state.phLevelConflicts.map((currConflict) => {
                if(currConflict.conflictType.toUpperCase() === "PHLEVEL") {
                    return (
                        <TankConditionConflict 
                        conflictType="phLevel" 
                        fishName={currConflict.fishName} 
                        quantity={currConflict.quantity} 
                        requiredPhTop={currConflict.requiredPhTop} 
                        requiredPhBottom={currConflict.requiredPhBottom} 
                    />);
                } else {
                    return null;
                }
            });
        } else {
            return (<TankConditionConflict conflictType= "none"/>);
        }
        
    }
    renderVolumeConflicts() {
        if (this.state.volumeConflicts.length !== 0) {
            return this.state.volumeConflicts.map((currConflict) => {
                if(currConflict.conflictType.toUpperCase() === "VOLUME") {
                    return (
                        <TankConditionConflict 
                        conflictType="volume"
                        requiredVolume={Math.round(currConflict.requiredVolume)}
                        tankVolume={Math.round(currConflict.tankVolume)}
                    />);
                } else {
                    return null;
                }
            });
        } else {
            return (<TankConditionConflict conflictType= "none"/>);
        }
        
    }
    renderFishOnFishConflicts() {
        if (this.state.fishOnFishConflicts.length !== 0) {
            return this.state.fishOnFishConflicts.map((currConflict) => {
                if(currConflict.conflictType.toUpperCase() === "FISH-RED") {
                    return (
                        <TankConditionConflict 
                            conflictType= "fish-red"
                            fishName= {currConflict.fishName}
                            quantity= {currConflict.quantity}
                            enemyName= {currConflict.enemyName}
                    />);
                } else if(currConflict.conflictType.toUpperCase() === "FISH-YELLOW") {
                    return (
                        <TankConditionConflict 
                            conflictType= "fish-yellow"
                            fishName= {currConflict.fishName}
                            quantity= {currConflict.quantity}
                            enemyName= {currConflict.enemyName}
                    />);
                } else {
                    return null;
                }
            });
        } else {
            return (<TankConditionConflict conflictType= "none"/>);
        }
    }
    // Component render method
    render() {
        return (
            <div className="aquariumConflictViewer" style={{margin: "auto auto 16px auto"}}>
                <div className="card bg-light">
                    <div className="card-header">
                        <h4 style={{float: "left"}}>Conflicts</h4>
                        <h4 style={{float: "right"}}>{"x" + (this.state.salinityConflicts.length + this.state.tempConflicts.length + this.state.phLevelConflicts.length + this.state.volumeConflicts.length + this.state.fishOnFishConflicts.length)}</h4>
                    </div>

                    <div className="card-body">
                        <div className="card mb-2" style={{minHeight: "30px"}}>
                            <div className="card-header"><h6 style={{float: "left"}}>Salinity</h6><h6 style={{float: "right"}}>{"x" + this.state.salinityConflicts.length}</h6></div>
                            <div className="card-body">{this.renderSalinityConflicts()}</div>
                        </div>

                        <div className="card mb-2" style={{minHeight: "30px"}}>
                            <div className="card-header"><h6 style={{float: "left"}}>Temperature</h6><h6 style={{float: "right"}}>{"x" + this.state.tempConflicts.length}</h6></div>
                            <div className="card-body">
                                {this.renderTempConflicts()}
                            </div>
                        </div>

                        <div className="card mb-2" style={{minHeight: "30px"}}>
                        <div className="card-header"><h6 style={{float: "left"}}>PH Level</h6><h6 style={{float: "right"}}>{"x" + this.state.phLevelConflicts.length}</h6></div>
                            <div className="card-body">
                                {this.renderPhLevelConflicts()}
                            </div>
                        </div>

                        <div className="card mb-2" style={{minHeight: "30px"}}>
                            <div className="card-header"><h6 style={{float: "left"}}>Volume</h6><h6 style={{float: "right"}}>{"x" + this.state.volumeConflicts.length}</h6></div>
                            <div className="card-body">
                                {this.renderVolumeConflicts()}
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header d-flex fex-row">
                                <h6>Fish-On-Fish</h6>
                                {/* <a className="ml-1" href="#" data-toggle="tooltip" title="Help content goes here"><button className="btn btn-info btn-small rounded-circle">i</button></a> */}
                                <h6 className="ml-auto">{"x" + this.state.fishOnFishConflicts.length}</h6>
                            </div>
                            <div className="card-body">
                                {this.renderFishOnFishConflicts()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
