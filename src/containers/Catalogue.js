import React, { Component } from "react";
import axios from "axios";

class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogue: {
        name: "",
        type: "",
        images: []
      }
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;

    let response = await axios.get(`http://localhost:8001/catalogue/${id}`);

    const { catalogue } = { ...this.state };

    const currentCatalogue = catalogue;

    currentCatalogue["name"] = response.data.name;
    currentCatalogue["type"] = response.data.type;
    currentCatalogue["images"] = response.data.images;

    this.setState({
      catalogue: currentCatalogue
    });
  }
  render() {
    return <div>{this.state.catalogue.name}</div>;
  }
}

export default Catalogue;
