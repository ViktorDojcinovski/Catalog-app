import React, { Component } from 'react';
import axios from 'axios';

import { Loader } from '../common/Loader';
import MagazineListPresentation from './components/MagazineListPresentation';

class MagazineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      partners: []
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    await axios
      .get(`${process.env.REACT_APP_API_URL}/partners`)
      .then(partners => {
        this.setState({
          partners: partners.data,
          loading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <MagazineListPresentation partners={this.state.partners} />
    );
  }
}

export default MagazineList;
