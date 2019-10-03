import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

export default class Header extends React.Component {
    logout = async () => {
        try {
            await axios.post("/user/logout", {},{headers: {Authorization: localStorage.getItem("token")}});
            this.props.logoutUser();
        } catch (e) {
            console.log(e);
        }
    }

    renderLoginStatus() {
        if(this.props.loggedInUser) {
            return <button className="btn btn-primary my-auto h-70" type="button" onClick={this.logout}>Logout</button>
        } else {
            return <Link to="/login"><button className="btn btn-primary" type="button">Login</button></Link>
        }
    }

    render() {
        return (
            <React.Fragment>
                <header className="fixed-top" style={headerStyle}>
                    <div className="d-flex flex-row justify-content-between p-2 h-100">
                        <h6 className="my-auto">MERN: Aquarium</h6>
                        <ul className="my-auto" style={ulStyle}>
                            <li style={liStyle}><Link style={linkStyle} to="/"> Home</Link>|</li>
                            <li style={liStyle}><Link style={linkStyle} to="/fish"> Fish Database</Link>|</li>
                            <li style={liStyle}><Link style={linkStyle} to="/aquarium"> Aquarium Manager</Link></li>
                        </ul>
                        {this.renderLoginStatus()}
                    </div>
                    
                </header>
                <div style={{height: "9vh", backgroundColor: "#DB6C0F"}}/>
            </React.Fragment>
        )
    }
}



const headerStyle = {
    backgroundColor: "#0D1F30",
    color: "#fff",
    textAlign: "center",
    // height: "fit-content",
    width: "100vw",
    height: "8vh"
};

const liStyle = {
    textDecoration: "none",
    float: "left",
};

const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    weight: "bold",
    padding: "0px 10px",
};

const ulStyle = {
    listStyleType: "none",
    height: "fit-content",
    width: "fit-content",
    overflow: "hidden",
    fontSize: "1em"
};