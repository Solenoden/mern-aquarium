import React, {Component} from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from "axios";
// Components
import LandingPage from "./components/pages/LandingPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer"
import FishList from './components/FishList';
import FishInfo from "./components/FishInfo";
import FishFieldEditor from "./components/FishFieldEditor"
import AquariumManager from './components/AquariumManager';
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = {
    user: null,
    token: "",
    currFishId: "",
    fishes: [
      {
        "name": "",
        "description": "",
        "fishType": "",
        "tempBottom": "0",
        "tempTop": "0",
        "phBottom": "0",
        "phTop": "0",
        "diet": "",
        "size": "0",
        "temperament": "",
        "tankMates": [],
        "enemies": [],
        "imgURL": ""
      }
    ]
  };
  // Lifecycle Methods
  componentDidMount() {
    this.loginUser();
    this.getFishes();
  };
  //
  loginUser = async () => {
    const res =  await axios.get("http://localhost:5000/user/me", {headers: {Authorization: localStorage.getItem("token")}});
    const user = {
      email: res.data.email,
      userType: res.data.userType
    };
    this.setState({
      user,
      token: localStorage.getItem("token")
    });
  }

  logoutUser = () => {
    this.setState({
      user: null,
      token: ""
    });
  }

  getFishes = () => {
    axios.get("/fish/")
    .then((res) => {
      this.setState({fishes: res.data});
      this.setState({currFishId: this.state.fishes[0]._id});
    })
    .catch((err) => {console.log("ERROR FROM App.js: " + err)});
  }

  displayFishInfo = (fishId) => {
    this.setState({ currFishId: fishId});
  };

  getFish(fishId) {
    // console.log(this);
    let fish = this.state.fishes[0];
    this.state.fishes.forEach(currFish => {
      // console.log("currFish id: " + currFish.id);
      if(currFish._id === fishId) {
        fish = currFish;
      }
    });
    return fish;
  }

  getFishWithName(fishName) {
    let fish = this.state.fishes[0];
    this.state.fishes.forEach(currFish => {
      // console.log("currFish id: " + currFish.id);
      if(currFish.name === fishName) {
        fish = currFish;
      }
    });
    return fish;
  }

  getAllFishNames() {
    let fishNames = [];
    this.state.fishes.forEach(currFish => {
      fishNames.push(currFish.name);
    });
    return fishNames;
  }

  deleteFish = (id) => {
    axios.delete("http://localhost:5000/fish/" + id, {headers: {Authorization: this.state.token}})
    .then((res) => {
      this.removeFish(id);
    })
    .catch((err) => {console.log(err)});
  }

  removeFish = (id) => {
    this.setState({
      fishes: this.state.fishes.filter((fish) => fish._id !== id)
    });
  }
  //Calculate Tank Conflicts for Aquarium Manager
  calcSalinityConflicts = (amFishes, amSalinity) => {
   return amFishes.map((amFish) => {
    // Get the current fishes data from the app state
    let currFish = this.getFishWithName(amFish.name);
    // Check the salinity field of the fish with the salinity of the tank
    if(currFish.fishType !== amSalinity) {
      //Return a conflict object
      return (
        {
          conflictType: "salinity",
          fishName: amFish.name,
          quantity: amFish.quantity,
          requiredSalinity: currFish.fishType
        }
      );
    } else {
      return null
    }
   });
  }
  calcTempConflicts = (amFishes, amTemp) => {
    return amFishes.map((amFish) => {
      let currFish = this.getFishWithName(amFish.name);
      if(amTemp > currFish.tempTop || amTemp < currFish.tempBottom) {
        return (
          {
            conflictType: "temperature",
            fishName: amFish.name,
            quantity: amFish.quantity,
            requiredTempTop: currFish.tempTop,
            requiredTempBottom: currFish.tempBottom
          }
        );
      } else {
        return null;
      }
    });
  }
  calcPhLevelConflicts = (amFishes, amPhLevel) => {
    return amFishes.map((amFish) => {
      let currFish = this.getFishWithName(amFish.name);
      if(amPhLevel > currFish.phTop || amPhLevel < currFish.phBottom) {
        return (
          {
            conflictType: "phLevel",
            fishName: amFish.name,
            quantity: amFish.quantity,
            requiredPhTop: currFish.phTop,
            requiredPhBottom: currFish.phBottom
          }
        );
      } else {
        return null;
      }
    });
  }
  calcVolumeConflicts = (amFishes, amVolume) => {
    // Calculate the required volume of the tank
    let requiredVolume = 0;
    amFishes.forEach((amFish) => {
      let currFish = this.getFishWithName(amFish.name);
      // Each 5.08cm of fish needs 3.78541 litres of water
      requiredVolume += (currFish.size/5.08) * 3.78541 * amFish.quantity;
    });
    // If the required volume is greater than the tank size then render a conflict
    if (amVolume < requiredVolume) {
      return (
        {
          conflictType: "volume",
          requiredVolume: requiredVolume,
          tankVolume: amVolume
        }
      );
    } else {
      return null;
    }
  }
  calcFishOnFishConflicts = (amFishes) => {
    let conflicts = [];
    amFishes.forEach((amFish) => {
      let currFish = this.getFishWithName(amFish.name);

      amFishes.forEach((fish) => {
        // console.log(fish.name + " in "+ currFish.name + ".enemies: " + currFish.enemies.toString());
        // Check if the current fish has any explicitly defined enemies which are in the tank
        if(currFish.enemies.indexOf(fish.name) !== -1) {
          conflicts.push(
            {
              conflictType: "fish-red",
              fishName: amFish.name,
              quantity: amFish.quantity,
              enemyName: fish.name
            }
          );
        } else {
          // Compare the current fish's size to the size of the other fish with an aggressive temperment
          // Get all the information of the current other fish in the tank
          let otherTankFish = this.getFishWithName(fish.name);

          if (otherTankFish.temperament.toUpperCase() === "AGGRESSIVE" && otherTankFish.size > currFish.size) {
            conflicts.push(
              {
                conflictType: "fish-yellow",
                fishName: amFish.name,
                quantity: amFish.quantity,
                enemyName: fish.name
              }
            );
          }
        }
      });
    });
    return conflicts;
  } 
  //Render App
  render() {
    return (
    <Router>
      <div className="App">

        <Route exact path="/" component={LandingPage}/>

        <Route exact path="/fish" component={props => (
          <React.Fragment>
            <Header loggedInUser={this.state.user} logoutUser={this.logoutUser}/>
            <div className="sidebar" style={{float: "left", backgroundColor: "#3B6670", overflowY: "scroll", height: "86vh"}}>
                <div style={{height: "80vh"}}><FishList fishes={this.state.fishes} displayFishInfo={this.displayFishInfo} /></div>
                <Link to="/fish/add" style={{textDecoration: "none"}}><button id="addFishBtn" className="btn btn-success btn-block rounded-0" style={{height: "6vh"}}>New Fish</button></Link>
            </div>
            <div className="">
              <div className="content">
                <FishInfo fish={this.getFish(this.state.currFishId)} deleteFish={this.deleteFish}/>
              </div>
            </div>
            <Footer />
          </React.Fragment>
        )}/>
        
        <Route exact path="/fish/add" component={props => (
          <React.Fragment>
            <Header loggedInUser={this.state.user} logoutUser={this.logoutUser} />
            <div className="content" style={{margin: "15px auto"}}>
              <FishFieldEditor type="add" allFishNames={this.getAllFishNames()} getFishes={this.getFishes}/>
            </div>
            <Footer />
          </React.Fragment>
        )}/>

        <Route exact path="/fish/edit/:id" component={props => (
          <React.Fragment>
            <Header loggedInUser={this.state.user} logoutUser={this.logoutUser} />
            <div className="content" style={{margin: "15px auto"}}>
              <FishFieldEditor type="edit" fish={this.getFish(this.state.currFishId)} allFishNames={this.getAllFishNames()}/>
            </div>
            <Footer />
          </React.Fragment>
        )}/>

        <Route exact path="/aquarium" component={props => (
          <React.Fragment>
            <Header loggedInUser={this.state.user} logoutUser={this.logoutUser} />
            <div className="content">
              <h3 style={{textAlign: "center", margin: "25px auto"}}>Aquarium Manager</h3>
              <AquariumManager 
              allFishNames={this.getAllFishNames()}

              calcSalinityConflicts={this.calcSalinityConflicts}
              calcTempConflicts={this.calcTempConflicts}
              calcPhLevelConflicts={this.calcPhLevelConflicts}
              calcVolumeConflicts={this.calcVolumeConflicts}
              calcFishOnFishConflicts={this.calcFishOnFishConflicts}
              />
            </div>
            <Footer />
          </React.Fragment>
        )}/>

        <Route exact path="/login" component={props => (
          <React.Fragment>
            <Header loggedInUser={this.state.user} logoutUser={this.logoutUser} />
            <LoginForm loginUser={this.loginUser}/>
            <Footer />
          </React.Fragment>
        )}/>

      </div>
    </Router>
    );
  }
}

export default App;
