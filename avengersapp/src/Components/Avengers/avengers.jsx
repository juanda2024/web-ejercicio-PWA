import React, { Component } from "react";
import AvengersAPI from "../../Hooks/AvengersAPI";

class Avengers extends Component {
  render() {
    return <div>
      <h1>API DE MARVEL</h1>
      <AvengersAPI/>
    </div>;
  }
}

export default Avengers;