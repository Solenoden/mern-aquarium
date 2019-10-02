import React, { Component } from 'react'

export default class AquariumFieldEditor extends Component {
    renderFishNameOptions() {
        return this.props.allFishNames.map((fishName) => {
            return (<option key={this.props.allFishNames.indexOf(fishName)} value={fishName} />)
        });
    }

    renderFishes() {
        return this.props.fishes.map((fish) => {
            return (
                <div key={this.props.fishes.indexOf(fish)} style={{width: "100%", display: "flex", flexDirection:"row", marginBottom: "5px"}}>
                    <span style={{float: "left", margin: "auto 2px"}}>{fish.name}</span>
                    <input className="form-control" style={{width:"15%", height:"25px", margin: "auto 0", position:"absolute", right: "70px"}} type="number" value={this.props.fishes[this.props.fishes.indexOf(fish)].quantity} onChange={this.props.onChangeQuantity.bind(this, fish.name)}/>
                    <button className="btn btn-danger btn-round" style={{width: "25px", height: "25px", padding: "0", position:"absolute", right: "2.05rem"}} type="button" onClick={this.props.delFish.bind(this, fish.name)}>X</button>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="aquariumFieldEditor" style={{margin: "8px auto 16px auto"}}>
                    <div className="card bg-light">
                        <div className="card-header">
                            <h4 style={{textAlign: "center"}}>Tank Conditions</h4>
                        </div>

                        <div className="card-body">
                            <div className="form-group">
                                <label>Salinity</label>
                                <input className="form-control" type="text" value={this.props.salinity} onChange={this.props.onChangeSalinity} placeholder="Salinity" list="salinityOptions"/>
                                <datalist id="salinityOptions">
                                    <option value="Freshwater" />
                                    <option value="Saltwater" />
                                </datalist>
                            </div>
                            <div className="form-group">
                                <label>Temperature(*C)</label>
                                <input className="form-control" style={{width: "25%"}} type="number" value={this.props.temp} onChange={this.props.onChangeTemp} /> 
                            </div>
                            <div className="form-group">
                                <label>PH Level</label>
                                <input className="form-control" style={{width: "25%"}} type="number" value={this.props.phLevel} onChange={this.props.onChangePhLevel} /> 
                            </div>
                            <div className="form-group">
                                <label>Volume(L)</label>
                                <input className="form-control" style={{width: "25%"}} type="number" value={this.props.volume} onChange={this.props.onChangeVolume}/>
                            </div>

                            <div className="card bg-light" style={{marginBottom: "8px"}}>
                                <div className="card-header">
                                    <div style={{display: "flex", flexDirection: "row", marginBottom: "8px"}}>
                                        <input className="form-control" style={{width:"50%", marginRight: "4px"}} type="text" value={this.props.fishNameInput} onChange={this.props.onChangeFishName} placeholder="Fish Name" list="fishNameOptions"/>
                                        <datalist id="fishNameOptions">
                                            {this.renderFishNameOptions()}
                                        </datalist>
                                        <button className="btn btn-success" onClick={this.props.addFish}>Add</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {this.renderFishes()}
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                                <button className="btn btn-primary" style={{marginRight: "4px"}} type="submit" name="submit" onClick={this.props.onSubmit}>Submit</button>
                                <button className="btn btn-danger" onClick={this.props.clearForm}>Clear</button>
                        </div>
                    </div>
            </div>
        )
    }
}
