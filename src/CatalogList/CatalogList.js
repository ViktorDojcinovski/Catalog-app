import React, { Component } from "react";
import axios from "axios";

import CatalogListPresentation from "./components/CatalogListPresentation";
import { Loader } from "../common/Loader";

import "./CatalogList.scss";

export default class CatalogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilterItemValue: null,
      searchfield: "",
      partners: [],
      catalogs: [],
      loading: false,
    };

    this.getAllCatalogs = this.getAllCatalogs.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });

    await axios
      .all([
        axios.get(`${process.env.REACT_APP_API_URL}/catalogs`),
        axios.get(`${process.env.REACT_APP_API_URL}/partners`),
      ])
      .then(
        axios.spread((catalogsResponse, partnersResponse) => {
          console.log(partnersResponse);
          this.setState({
            catalogs: catalogsResponse.data,
            partners: partnersResponse.data.filter((p) => !p.isSuperadmin),
            loading: false,
          });
        }),
        (err) => {
          throw new Error("Fetching partners error! " + err);
        }
      )
      .catch((err) => {
        console.error(err);
      });
  }

  onSearchCallback(event) {
    this.setState({ searchfield: event.target.value });
  }

  getAllCatalogs() {
    this.setState({ loading: true });

    axios
      .get(`${process.env.REACT_APP_API_URL}/catalogs`)
      .then(
        (catalogs) => {
          this.setState({
            catalogs: catalogs.data,
            activeFilterItemValue: null,
            loading: false,
          });
        },
        (err) => {
          throw new Error("Fetching catalogs error! " + err);
        }
      )
      .catch((err) => console.error(err));
  }

  onClickHandler(event, filterBy, value) {
    const requestURL =
      filterBy === "email"
        ? `${process.env.REACT_APP_API_URL}/catalogs/${value}`
        : `${process.env.REACT_APP_API_URL}/catalogs/category/${value}`;

    this.setState({
      loading: true,
      activeFilterItemValue: event.target.innerHTML,
    });

    axios
      .post(requestURL, {
        [filterBy]: value,
      })
      .then((catalogs) => {
        this.setState({ loading: false, catalogs: catalogs.data });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <CatalogListPresentation
        catalogs={this.state.catalogs}
        partners={this.state.partners}
        searchfield={this.state.searchfield}
        activeFilterItemValue={this.state.activeFilterItemValue}
        getAllCatalogs={this.getAllCatalogs}
        onSearchCallback={this.onSearchCallback}
        onClickHandler={(event, filterBy, value) =>
          this.onClickHandler(event, filterBy, value)
        }
      />
    );
  }
}
