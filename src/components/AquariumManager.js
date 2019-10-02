import React, { Component } from 'react';
import AquariumFieldEditor from "./AquariumFieldEditor";
import AquariumConflictViewer from './AquariumConflictViewer';

export default class AquariumManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            salinity: "",
            temp: 0,
            phLevel: 0,
            volume: 0,
            fishes: [],
            fishNameInput: "",
            viewingConflicts: false
        };

        this.onChangeSalinity = this.onChangeSalinity.bind(this);
        this.onChangeTemp = this.onChangeTemp.bind(this);
        this.onChangePhLevel = this.onChangePhLevel.bind(this);
        this.onChangeVolume = this.onChangeVolume.bind(this);
        this.onChangeFishName = this.onChangeFishName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.addFish = this.addFish.bind(this);
        this.delFish = this.delFish.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }
    // onChange handlers
    onChangeSalinity(e) {
        this.setState({
            salinity: e.target.value
        });
    }
    onChangeTemp(e) {
        this.setState({
            temp: e.target.value
        });
    }
    onChangePhLevel(e) {
        this.setState({
            phLevel: e.target.value
        });
    }
    onChangeVolume(e) {
        this.setState({
            volume: e.target.value
        });
    }
    onChangeFishName(e) {
        this.setState({
            fishNameInput: e.target.value
        });
    }
    onChangeQuantity(fishName, e) {
        this.setState({
            fishes: this.state.fishes.map((currFish) => {
                if(currFish.name === fishName) {
                    currFish.quantity = e.target.value;
                }    
                return currFish;
            })
        });
    }
    // onSubmit handler
    onSubmit(e) {
        e.preventDefault();

        this.setState({
            viewingConflicts: !this.state.viewingConflicts
        });
    }
    // Other methods
    clearForm() {
        this.setState({
            salinity: "",
            temp: 0,
            phLevel: 0,
            volume: 0,
            fishes: [],
            fishNameInput: "",
            viewingConflicts: false
        });
    }

    addFish() {
        this.setState({
            fishes: [...this.state.fishes, {name: this.state.fishNameInput, quantity: 1}],
            fishNameInput: ""
        });
    }

    delFish(fishName) {
        this.setState({
            fishes: this.state.fishes.filter((fish) => fish.name !== fishName)
        });
    }
    // Component render
    render() {
        if(!this.state.viewingConflicts) {
            return (
                <AquariumFieldEditor 
                allFishNames={this.props.allFishNames}
                salinity={this.state.salinity}
                temp={this.state.temp}
                phLevel={this.state.phLevel}
                volume={this.state.volume}
                fishes={this.state.fishes} 
                fishNameInput={this.state.fishNameInput}
                
                delFish={this.delFish} 
                addFish={this.addFish}
                clearForm={this.clearForm}

                onChangeSalinity={this.onChangeSalinity}
                onChangeTemp={this.onChangeTemp}
                onChangePhLevel={this.onChangePhLevel}
                onChangeVolume={this.onChangeVolume}
                onChangeQuantity={this.onChangeQuantity}
                onChangeFishName={this.onChangeFishName}
                onSubmit={this.onSubmit}
                />
            )
        } else {
            return (
            <AquariumConflictViewer 
            salinity={this.state.salinity}
            temp={this.state.temp}
            phLevel={this.state.phLevel}
            volume={this.state.volume}
            fishes={this.state.fishes} 

            calcSalinityConflicts={this.props.calcSalinityConflicts}
            calcTempConflicts={this.props.calcTempConflicts}
            calcPhLevelConflicts={this.props.calcPhLevelConflicts}
            calcVolumeConflicts={this.props.calcVolumeConflicts}
            calcFishOnFishConflicts={this.props.calcFishOnFishConflicts}
            />
            )
        }
    }
}
