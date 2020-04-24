import React, { Component } from "react";
import ReactImageMagnify from "react-image-magnify";
import PropTypes from "prop-types";
import $ from "jquery";

import "../../turn.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { CatalogAbstractList } from "../../common/CatalogAbstractList";
import { SocialButtons } from "./SocialButtons";

import "./CatalogPresentation.scss";

export class CatalogPresentation extends Component {
  constructor() {
    super();
    this.state = {
      currentView: 1,
      display: "",
    };

    this.id = null;

    this.options = {
      width: 800,
      height: 600,
      autoCenter: true,
      display: window.innerWidth > 992 ? "double" : "single",
      acceleration: true,
      elevation: 50,
      gradients: !$.isTouch,
      when: {
        turning: (e, page) => {
          console.log($(this).turn("view"));

          if (this.props.catalog.filesNames.length === page) {
            this.setState({ currentView: -1 });
          } else {
            this.setState({ currentView: page });
          }
        },
      },
    };

    document.addEventListener.bind(
      this,
      "keydown",
      this.onKeyDownHandler,
      false
    );

    document.addEventListener.bind(
      this,
      "swipeleft",
      (event) => {
        $("#flipbook").turn("next");
      },
      false
    );

    document.addEventListener.bind(
      this,
      "swiperight",
      (event) => {
        $("#flipbook").turn("previous");
      },
      false
    );

    this.flipNext = this.flipNext.bind(this);
    this.flipPrevious = this.flipPrevious.bind(this);
  }

  onKeyDownHandler(event) {
    if (event.keyCode === 37) {
      $(this.el).turn("previous");
    }
    if (event.keyCode === 39) {
      $(this.el).turn("next");
    }
  }

  flipNext(event) {
    event.preventDefault();
    $(this.el).turn("next");
  }

  flipPrevious(event) {
    event.preventDefault();
    $(this.el).turn("previous");
  }

  componentDidMount() {
    if (this.el) {
      $(this.el).turn(Object.assign({}, this.options));
    }
  }

  render() {
    let flipButtons = (
      <>
        <button id="flip-right" onClick={this.flipNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button id="flip-left" onClick={this.flipPrevious}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </>
    );

    return (
      <section className="main">
        <div>
          <div
            options={this.options}
            className={
              this.state.currentView === 1
                ? "initialView"
                : this.state.currentView === -1
                ? "eventualView"
                : ""
            }
          >
            {this.props.catalog ? (
              <div
                id="flipbook"
                ref={(el) => (this.el = el)}
                className="magazine"
              >
                {this.props.catalog.filesNames.map((page, index) => (
                  <div key={index} className="page">
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: "",
                          width: window.innerWidth > 992 ? 400 : 375,
                          height: 600,
                          src: `${process.env.REACT_APP_API_URL}/catalogs/${this.props.catalog["image_folder"]}/images/${page["image"]}`,
                        },
                        largeImage: {
                          width: 1200,
                          height: 1800,
                          src: `${process.env.REACT_APP_API_URL}/catalogs/${this.props.catalog["image_folder"]}/images/${page["image"]}`,
                        },
                        lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                        isHintEnabled: true,
                        shouldHideHintAfterFirstActivation: false,
                        enlargedImagePosition: "over",
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            {flipButtons}
          </div>
          <SocialButtons id={this.id} />
          <div className="similarCatalogs">
            <CatalogAbstractList
              title="Other catalogs from this category"
              catalogs={this.props.catalogs}
            />
          </div>
        </div>
      </section>
    );
  }

  componentWillUnmount() {
    if (this.el) {
      $(this.el).turn("destroy").remove();
    }
    document.removeEventListener("keydown", this.onKeyDownHandler, false);
  }
}

CatalogPresentation.propTypes = {
  catalog: PropTypes.object,
  catalogs: PropTypes.array,
};
