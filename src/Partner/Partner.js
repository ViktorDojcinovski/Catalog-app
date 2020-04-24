import React, { Component } from 'react';
import axios from 'axios';

import { Loader } from '../common/Loader';
import PartnerPresentation from './components/PartnerPresentation';

class Partner extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      catalogsFromPartner: null,
      partner: {
        name: '',
        bussinessType: '',
        avatar: '',
        customAvatar: null,
        description: '',
        prefferedName: '',
        twitter: '',
        fb: '',
        website: ''
      }
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { id } = this.props.match.params;

    await axios
      .all([
        axios.get(`${process.env.REACT_APP_API_URL}/partner/${id}`),
        axios.post(`${process.env.REACT_APP_API_URL}/catalogs/partner/${id}`, {
          id
        })
      ])
      .then(
        axios.spread((partnerResponse, catalogsResponse) => {
          const { partner } = { ...this.state };
          let currentPartner = Object.assign({}, partner);
          let catalogs = catalogsResponse.data;
          currentPartner = partnerResponse.data;

          this.setState({
            loading: false,
            partner: currentPartner,
            catalogsFromPartner: catalogs
          });
        })
      );
  }

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <PartnerPresentation
        partner={this.state.partner}
        catalogs={this.state.catalogsFromPartner}
      />
    );
  }
}

export default Partner;
