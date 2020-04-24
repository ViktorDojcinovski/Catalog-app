import React, { Component } from "react";

// import { Input } from "../../common/Input";
// import { Button } from "../../common/Button";
import { AuthContext } from "../Auth/AuthContext";
import {
  isPartnerEnabled,
  isSuperadmin,
} from "../components/Helpers/authHelpers";

export class Callback extends Component {
  static contextType = AuthContext;

  // FormData object for collecting whole data
  formData = new FormData();

  componentDidMount() {
    //Handle authentiaction if expected values are in the URL
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      return this.context.handleAuthentication(() => {
        return new Promise((resolve, reject) => {
          let isEnabled, isPartnerSuperadmin;
          this.context.getProfile(async (profile, err) => {
            this.partnerEmail = profile.email;
            isEnabled = await isPartnerEnabled(this.partnerEmail, this.context);
            isPartnerSuperadmin = await isSuperadmin(
              this.partnerEmail,
              this.context
            );

            if (isPartnerSuperadmin) {
              this.context.setSuperadmin(true);
            }
            if (isEnabled) {
              this.context.setEnabled(true);
            }

            resolve({
              isSuperadmin: this.context.isSuperadmin(),
              isEnabled: this.context.isEnabled(),
            });
          });
        });
      });
    } else {
      throw new Error("Invalid callback URL.");
    }
  }

  // onChangeHandler(event) {
  //   this.setState({ securityCode: event.target.value });
  // }

  // submitSecurityCode() {
  //   if (this.state.profile && this.state.securityCode) {
  //     this.formData.append("securityCode", this.state.securityCode);
  //     this.formData.append("partner", this.state.profile.email);
  //     fetch(`${process.env.REACT_APP_API_URL}/admin/checkSecurityCode`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${this.context.getAccessToken()}`,
  //       },
  //       body: this.formData,
  //     })
  //       .then(
  //         (response) => {
  //           if (response.ok) {
  //             this.context.handleAuthentication();
  //           } else {
  //             console.log("Failed to authenticate!");
  //           }
  //         },
  //         (err) => {
  //           throw new Error(
  //             "Error in the authentication communication with the server!"
  //           );
  //         }
  //       )
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }

  render() {
    return <h1>Loading...</h1>;
  }

  // render() {
  //   return (
  //     <>
  //       <Input
  //         elementConfig={{
  //           label: 'Insert your security code',
  //           type: 'password'
  //         }}
  //         changed={this.onChangeHandler.bind(this)}
  //       />
  //       <Button btnType='success' clicked={this.submitSecurityCode.bind(this)}>
  //         Check
  //       </Button>
  //     </>
  //   );
  // }
}
