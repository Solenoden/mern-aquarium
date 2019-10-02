import React from 'react';
// Components
import Header from "../layout/Header";
// import Footer from "../layout/Footer";

export default function LandingPage() {
    return (
        <div>
            <Header />
            
            <div style={imgStyle}>
            </div>

            {/* <Footer /> */}
        </div>
    )
}

const imgStyle = {
    backgroundImage: "url('https://wallpaperplay.com/walls/full/a/0/8/221246.jpg')",
    width: "100vw",
    height: "100vh"
};


