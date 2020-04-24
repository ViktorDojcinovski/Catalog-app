import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Auth } from "../Auth/Auth";
import { AuthContext } from "../Auth/AuthContext";
import ProfilePresentation from "./components/ProfilePresentation";
import {
  onChangedHandler,
  checkValidity,
} from "../components/Helpers/formHelpers";
import withDashboard from "../../hoc/withDashboard";

class Profile extends Component {
  static contextType = AuthContext;
  // FormData object for collecting whole data
  formData = new FormData();

  state = {
    auth: new Auth(),
    profile: null,
    customAvatar: {
      name: "",
      file: null,
    },
    hasPartnerSignedInBefore: false,
    err: "",
    loading: false,
    message: { success: "false", body: "" },
    partnerForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Name",
          placeholder: "your preffered nickname...",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      type: {
        elementType: "select",
        elementConfig: {
          type: "select",
          label: "Type",
          placeholder: "",
          options: [
            { value: "grocery", displayValue: "Grocery" },
            { value: "toolkits", displayValue: "Toolkits" },
          ],
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "input",
          label: "Description",
          placeholder: "description of your bussiness...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      fb: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Facebook Funpage",
          placeholder: "your facebook funpage url...",
        },
        value: "",
        validation: {
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      twitter: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Twitter Account",
          placeholder: "your twitter account url...",
        },
        value: "",
        validation: {
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      website: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Your Website",
          placeholder: "your website url...",
        },
        value: "",
        validation: {
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
    },
  };

  constructor() {
    super();

    this.onChangedHandler = onChangedHandler.bind(this);
    this.checkValidity = checkValidity.bind(this);
    this.submitPartnerInfo = this.submitPartnerInfo.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
  }

  componentDidMount() {
    this.loadUserProfile(() => {
      fetch(
        `${process.env.REACT_APP_API_URL}/admin/getPartner/${this.state.profile.email}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.state.auth.getAccessToken()}`,
          },
          body: this.setColectedData(this.formData),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.clearColectedData();

          if (data.email) {
            // assume that in edit mode the values in the form fields are valid,
            // so in  the for loop set values to all fields too true
            const updatedPartnerForm = {
              ...this.state.partnerForm,
            };

            for (let inputIdentifier in updatedPartnerForm) {
              const updatedFormElement = {
                ...updatedPartnerForm[inputIdentifier],
              };
              updatedFormElement.valid = true;
              updatedPartnerForm[inputIdentifier] = updatedFormElement;
            }

            updatedPartnerForm.name.value = data.prefferedName;
            updatedPartnerForm.type.value = data.bussinessType;
            updatedPartnerForm.description.value = data.description;
            updatedPartnerForm.fb.value = data.fb;
            updatedPartnerForm.twitter.value = data.twitter;
            updatedPartnerForm.website.value = data.website;

            const updatedAvatar = { ...this.state.customAvatar };

            updatedAvatar.name = data.customAvatar;

            this.setState({
              customAvatar: updatedAvatar,
              partnerForm: updatedPartnerForm,
              formIsValid: true,
              hasPartnerSignedInBefore: true,
            });
          } else {
            this.setState({ hasPartnerSignedInBefore: false });
          }
        });
    });
  }

  loadUserProfile(callback) {
    this.context.getProfile((profile, error) => {
      this.setState({ profile, error }, callback);
    });
  }

  onChangeAvatar(event) {
    const updatedAvatar = Object.assign({}, this.state.customAvatar);

    updatedAvatar.name = event.target.files[0].name;
    updatedAvatar.file = event.target.files[0];

    this.setState({ customAvatar: updatedAvatar });
  }

  submitPartnerInfo() {
    this.setState({
      message: { success: "false", body: "" },
    });
    fetch(`${process.env.REACT_APP_API_URL}/admin/updatePartner`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.context.getAccessToken()}`,
      },
      body: this.setColectedData(this.formData),
    })
      .then((res) => res.json())
      .then((data) => {
        this.clearColectedData();
        this.setState({
          message: {
            success: "success",
            body: data["message"],
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setColectedData(formData) {
    formData.append("name", this.state.profile.name);
    formData.append("avatar", this.state.profile.picture);
    formData.append("prefferedName", this.state.partnerForm.name.value);
    formData.append("bussinessType", this.state.partnerForm.type.value);
    formData.append("customAvatar", this.state.customAvatar.file);
    formData.append("fb", this.state.partnerForm.fb.value);
    formData.append("twitter", this.state.partnerForm.twitter.value);
    formData.append("website", this.state.partnerForm.website.value);
    formData.append("email", this.state.profile.email);
    formData.append("description", this.state.partnerForm.description.value);

    return formData;
  }

  clearColectedData() {
    this.formData = new FormData();
  }

  render() {
    return this.props.auth.isEnabled() ? (
      <>
        {this.state.profile ? (
          <ProfilePresentation
            partnerForm={this.state.partnerForm}
            profile={this.state.profile}
            message={this.state.message}
            loading={this.state.loading}
            customAvatar={this.state.customAvatar}
            formIsValid={this.state.formIsValid}
            submitPartnerInfo={this.submitPartnerInfo}
            onChangeAvatar={this.onChangeAvatar}
            checkValidity={this.checkValidity}
            onChangeHandler={(event, id, value) =>
              this.onChangedHandler(event, id, value, this.checkValidity)
            }
            loadUserProfile={this.loadUserProfile}
            auth={this.state.auth}
          />
        ) : null}
      </>
    ) : (
      <Redirect to={"/admin"} />
    );
  }
}

export default withDashboard(Profile);
