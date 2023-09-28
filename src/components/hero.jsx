import React from "react";
import finance from "../assets/finance.jpeg";


function Hero() { 
    return (
    <div className="container text-center hero">
        <img src={finance} className="img-fluid rounded" />
    </div>
    );
}

export default Hero;