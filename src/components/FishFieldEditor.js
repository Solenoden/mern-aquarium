import React, { Component } from 'react'
import axios from "axios";

export default class FishFieldEditor extends Component {
    constructor(props) {
        super(props);

        // this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeFishType = this.onChangeFishType.bind(this);
        this.onChangeTempTop = this.onChangeTempTop.bind(this);
        this.onChangeTempBottom = this.onChangeTempBottom.bind(this);
        this.onChangePhBottom = this.onChangePhBottom.bind(this);
        this.onChangePhTop = this.onChangePhTop.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeTemperament = this.onChangeTemperament.bind(this);
        this.onChangeDiet = this.onChangeDiet.bind(this);
        this.onChangeImgURL = this.onChangeImgURL.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.onChangeTankMateNameInput = this.onChangeTankMateNameInput.bind(this);
        this.onChangeEnemyNameInput = this.onChangeEnemyNameInput.bind(this);

        this.addTankMate = this.addTankMate.bind(this);
        this.delTankMate = this.delTankMate.bind(this);
        this.addEnemy = this.addEnemy.bind(this);
        this.delEnemy = this.delEnemy.bind(this);
        this.addFish = this.addFish.bind(this);
        this.editFish = this.editFish.bind(this);

        if(this.props.type==="edit") {
            this.state = {
                _id: this.props.fish._id,
                name: this.props.fish.name,
                fishType: this.props.fish.fishType,
                tempBottom: this.props.fish.tempBottom,
                tempTop: this.props.fish.tempTop,
                phBottom: this.props.fish.phBottom,
                phTop: this.props.fish.phTop,
                size: this.props.fish.size,
                temperament: this.props.fish.temperament,
                diet: this.props.fish.diet,
                tankMates: this.props.fish.tankMates,
                enemies: this.props.fish.enemies,
                imgURL: this.props.fish.imgURL,
                description: this.props.fish.description,
                tankMateNameInput: "",
                enemyNameInput: ""
            };
        } else {
            this.state = {
                _id: "",
                name: "",
                fishType: "",
                tempBottom: 20,
                tempTop: 25,
                phBottom: 4,
                phTop: 6,
                size: "",
                temperament: "",
                diet: "",
                tankMates: [],
                enemies: [],
                imgURL: "",
                description: "",
                tankMateNameInput: "",
                enemyNameInput: ""
            };
        }
    }
    
    //OnSubmits
    addFish(e) {
        e.preventDefault();

        // Create object to post with the forms current state
        const fish = {
            name: this.state.name,
            fishType: this.state.fishType,
            tempBottom: this.state.tempBottom,
            tempTop: this.state.tempTop,
            phBottom: this.state.phBottom,
            phTop: this.state.phTop,
            size: this.state.size,
            temperament: this.state.temperament,
            diet: this.state.diet,
            imgURL: this.state.imgURL,
            description: this.state.description,
            tankMates: this.state.tankMates,
            enemies: this.state.enemies
        };
        // Post the object
        axios.post("http://localhost:5000/fish/add", fish, {headers: {Authorization: localStorage.token}})
        .then((res) => {
            console.log(res.data);
        });

        window.location = "/fish/";
        // Clear state to reset the form
        // this.setState({
        //     name: "",
        //     fishType: "",
        //     tempBottom: 20,
        //     tempTop: 25,
        //     phBottom: 4,
        //     phTop: 6,
        //     size: "",
        //     temperament: "",
        //     diet: "",
        //     imgURL: "",
        //     description: "",
        //     tankMates: [],
        //     enemies: []
        // });
    }

    editFish(e) {
        e.preventDefault();

        const fish = {
            name: this.state.name,
            fishType: this.state.fishType,
            tempBottom: this.state.tempBottom,
            tempTop: this.state.tempTop,
            phBottom: this.state.phBottom,
            phTop: this.state.phTop,
            size: this.state.size,
            temperament: this.state.temperament,
            diet: this.state.diet,
            imgURL: this.state.imgURL,
            description: this.state.description,
            tankMates: this.state.tankMates,
            enemies: this.state.enemies
        };

        axios.post("http://localhost:5000/fish/update/" + this.state._id, fish, {headers: {Authorization: localStorage.token}})
        .then((res) => {console.log(res.data)});

        window.location = "/fish/";
    }
    // On Changes
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    };
    onChangeFishType(e) {
        this.setState({
            fishType: e.target.value
        });
    };
    onChangeTempBottom(e) {
        this.setState({
            tempBottom: e.target.value
        });
    };
    onChangeTempTop(e) {
        this.setState({
            tempTop: e.target.value
        });
    };
    onChangePhBottom(e) {
        this.setState({
            phBottom: e.target.value
        });
    };
    onChangePhTop(e) {
        this.setState({
            phTop: e.target.value
        });
    };
    onChangeSize(e) {
        this.setState({
            size: e.target.value
        });
    };
    onChangeTemperament(e) {
        this.setState({
            temperament: e.target.value
        });
    };
    onChangeDiet(e) {
        this.setState({
            diet: e.target.value
        });
    };
    onChangeImgURL(e) {
        this.setState({
            imgURL: e.target.value
        });
    };
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    };
    onChangeTankMateNameInput(e) {
        this.setState({
            tankMateNameInput: e.target.value
        });
    }
    onChangeEnemyNameInput(e) {
        this.setState({
            enemyNameInput: e.target.value
        });
    }
    // Other Methods
    addTankMate() {
        this.setState({
            tankMates: [...this.state.tankMates, this.state.tankMateNameInput],
            tankMateNameInput: ""
        });
    }
    delTankMate(tankMate) {
        this.setState({
            tankMates: this.state.tankMates.filter(((currTankMate) => currTankMate !== tankMate))
        });
    }
    addEnemy() {
        this.setState({
            enemies: [...this.state.enemies, this.state.enemyNameInput],
            enemyNameInput: ""
        });
    }
    delEnemy(enemy) {
        console.log("Deleting enemy: " + enemy);
        this.setState({
            enemies: this.state.enemies.filter(((currEnemy) => currEnemy !== enemy))
        });
    }
    
    //Other render methods
    renderTankMates() {
        if(this.state.tankMates.length !== 0) {
            return this.state.tankMates.map((currTankMate) => {
                return (
                    <div style={{display: "flex", flexDirection: "row", width: "100%", marginBottom: "5px"}}>
                        <span>{currTankMate}</span>
                        <button className="btn btn-danger btn-round" style={{width: "25px", height: "25px", padding: "0", position:"absolute", right: "2.05rem"}} type="button" onClick={this.delTankMate.bind(this, currTankMate)}>X</button>
                    </div>
                    )
            });
        } else {
            return <span>None</span>
        }
    }
    renderEnemies() {
        if(this.state.enemies.length !== 0) {
            return this.state.enemies.map((currEnemy) => {
                return (
                <div style={{display: "flex", flexDirection: "row", width: "100%", marginBottom: "5px"}}>
                    <span>{currEnemy}</span>
                    <button className="btn btn-danger btn-round" style={{width: "25px", height: "25px", padding: "0", position:"absolute", right: "2.05rem"}} type="button" onClick={this.delEnemy.bind(this, currEnemy)}>X</button>
                </div>
                )
            });
        } else {
            return <span>None</span>
        }
    }
    renderFishNameOptions() {
        return this.props.allFishNames.map((fishName) => {
            return <option key={this.props.allFishNames.indexOf(fishName)} value={fishName}/>
        });
    }
    //Component render
    render() {
        return (
            <div className="fishFieldEditor card bg-light" style={{margin: "0 auto 20px auto"}}>
                <div className="card-header">
                    <h3 className="text-center">{(this.props.type === "add") ? "Add a New Species": "Edit Species"}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={(this.props.type === "add") ? this.addFish: this.editFish}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input 
                            className="form-control" 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={this.state.name}
                            onChange={this.onChangeName} 
                            required/>
                        </div>
                        <div className="form-group">
                            <label>Fish Type: </label>
                            <input 
                            className="form-control" 
                            type="text"
                            name="fishType" 
                            placeholder="Type" 
                            value={this.state.fishType}
                            onChange={this.onChangeFishType}
                            list="typeOptions"
                            required/>
                            <datalist id="typeOptions">
                                <option value="Freshwater"/>
                                <option value="Saltwater"/>
                            </datalist>
                        </div>
                        <div className="form-group">
                            <label>Temperature: </label>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <input className="form-control" style={{width: "25%", marginRight: "10%"}} type="number" name="tempBottom" value={this.state.tempBottom} onChange={this.onChangeTempBottom}/>
                                <input className="form-control" style={{width: "25%"}} type="number" name="tempTop" value={this.state.tempTop} onChange={this.onChangeTempTop}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>PH Level:</label>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <input className="form-control" style={{width: "25%", marginRight: "10%"}} type="number" name="phBottom" value={this.state.phBottom} onChange={this.onChangePhBottom}/> 
                                <input className="form-control" style={{width: "25%"}} type="number" name="phTop" value={this.state.phTop} onChange={this.onChangePhTop}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Size:</label>
                            <input className="form-control" type="number" name="size" placeholder="Size" value={this.state.size} onChange={this.onChangeSize} required/>
                        </div>
                        <div className="form-group">
                            <label>Temperament:</label>
                            <input className="form-control" type="text" name="temperament" placeholder="Temperament" value={this.state.temperament} onChange={this.onChangeTemperament} list="temperamentOptions" required/>
                            <datalist id="temperamentOptions">
                                <option value="Passive"/>
                                <option value="Aggressive"/>
                            </datalist>
                        </div>
                        <div className="form-group">
                            <label>Diet:</label>
                            <input className="form-control" type="text" name="diet" placeholder="Diet" value={this.state.diet} onChange={this.onChangeDiet} list="dietOptions" required/>
                            <datalist id="dietOptions">
                                <option value="Herbivorous"/>
                                <option value="Omnivorous"/>
                                <option value="Carnivorous"/>
                            </datalist>
                        </div>
                        <div className="form-group">
                            <label>Tank Mates:</label>
                            <div className="card bg-light">
                                <div className="card-header">
                                    <div style={{display: "flex", flexDirection:"row"}}>
                                        <input className="form-control" style={{width: "50%", marginRight: "5px"}} type="text" name="tankMateName" placeholder="Tank Mate Name" value={this.state.tankMateNameInput} onChange={this.onChangeTankMateNameInput} list="fishNameOptions"/> 
                                        <button className="btn btn-success" type="button" onClick={this.addTankMate}>Add Tank Mate</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {this.renderTankMates()}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Fishy Enemies:</label>
                            <div className="card bg-light">
                                <div className="card-header">
                                    <div style={{display: "flex", flexDirection:"row"}}>
                                        <input className="form-control" style={{width: "50%", marginRight: "5px"}} type="text" name="enemyName" placeholder="Enemy Name" value={this.state.enemyNameInput} onChange={this.onChangeEnemyNameInput} list="fishNameOptions"/> 
                                        <button className="btn btn-danger" type="button" onClick={this.addEnemy}>Add Enemy</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {this.renderEnemies()}
                                </div>
                            </div>
                        </div>
                        <datalist id="fishNameOptions">
                            {this.renderFishNameOptions()}
                        </datalist>
                        <div className="form-group">
                            <label>Image URL:</label>
                            <input className="form-control" type="text" name="imgURL" placeholder="Image URL" value={this.state.imgURL} onChange={this.onChangeImgURL} required/>
                        </div>    
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea className="form-control" style={{minHeight: "20vh"}} type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.onChangeDescription} required/>
                        </div>
                        <button className="btn btn-primary btn-block" type="submit" name="submit" >Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
