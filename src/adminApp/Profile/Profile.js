import React, { Component } from 'react';
import styled from 'styled-components';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import {
  onChangedHandler,
  checkValidity
} from '../components/Helpers/formHelpers';
import { Auth } from '../Auth/Auth';

import { AuthContext } from '../Auth/AuthContext';

const StyledWrapper = styled.section`
  width: 100%;
  overflow: auto;
  > div.editing {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: calc(33.33% - 10px);
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    float: left;
    &.last-child {
      width: 33%;
      margin-right: 0;
    }
    .customAvatarWrapper {
      img {
        width: 40px;
        height: 40px;
        margin-bottom: 20px;
      }
    }
    textarea {
      width: 100%;
      max-width: 400px;
    }
    select {
      width: 100%;
      max-width: 400px;
    }
    input {
      width: 100%;
      max-width: 400px;
    }
  }
  > div.action {
    float: right;
    width: 30%;
    text-align: right;
  }
  div.success {
    color: green;
  }
  div.false {
    color: red;
  }
`;

export class Profile extends Component {
  static contextType = AuthContext;

  // FormData object for collecting whole data
  formData = new FormData();

  state = {
    auth: new Auth(),
    profile: null,
    customAvatar: {
      name: '',
      file: null
    },
    hasPartnerSignedInBefore: false,
    err: '',
    formIsValid: false,
    loading: false,
    message: { success: 'false', body: '' },
    partnerForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Name',
          placeholder: 'your preffered nickname...'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false
      },
      type: {
        elementType: 'select',
        elementConfig: {
          type: 'select',
          label: 'Type',
          placeholder: '',
          options: [
            { value: 'grocery', displayValue: 'Grocery' },
            { value: 'toolkits', displayValue: 'Toolkits' }
          ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          type: 'input',
          label: 'Description',
          placeholder: 'description of your bussiness...'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      fb: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Facebook Funpage',
          placeholder: 'your facebook funpage url...'
        },
        value: '',
        validation: {
          minLength: 5
        },
        valid: false,
        touched: false
      },
      twitter: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Twitter Account',
          placeholder: 'your twitter account url...'
        },
        value: '',
        validation: {
          minLength: 5
        },
        valid: false,
        touched: false
      },
      website: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Your Website',
          placeholder: 'your website url...'
        },
        value: '',
        validation: {
          minLength: 5
        },
        valid: false,
        touched: false
      }
    }
  };

  async componentDidMount() {
    await this.loadUserProfile(() => {
      fetch(
        `${process.env.REACT_APP_API_URL}/admin/getPartner/${this.state.profile.email}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.state.auth.getAccessToken()}`
          },
          body: this.setColectedData(this.formData)
        }
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.clearColectedData();

          if (data.email) {
            // assume that in edit mode the values in the form fields are valid,
            // so in  the for loop set values to all fields too true
            const updatedPartnerForm = {
              ...this.state.partnerForm
            };

            for (let inputIdentifier in updatedPartnerForm) {
              const updatedFormElement = {
                ...updatedPartnerForm[inputIdentifier]
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
              hasPartnerSignedInBefore: true
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
      message: {
        success: 'false',
        body: ''
      }
    });
    fetch(`${process.env.REACT_APP_API_URL}/admin/updatePartner`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.context.getAccessToken()}`
      },
      body: this.setColectedData(this.formData)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.clearColectedData();
        this.setState({
          message: {
            success: 'success',
            body: data['message']
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  setColectedData(formData) {
    formData.append('name', this.state.profile.name);
    formData.append('avatar', this.state.profile.picture);
    formData.append('prefferedName', this.state.partnerForm.name.value);
    formData.append('bussinessType', this.state.partnerForm.type.value);
    formData.append('customAvatar', this.state.customAvatar.file);
    formData.append('fb', this.state.partnerForm.fb.value);
    formData.append('twitter', this.state.partnerForm.twitter.value);
    formData.append('website', this.state.partnerForm.website.value);
    formData.append('email', this.state.profile.email);
    formData.append('description', this.state.partnerForm.description.value);

    return formData;
  }

  clearColectedData() {
    this.formData = new FormData();
  }

  render() {
    const { profile } = this.state;
    const formElementsArray = [];

    const message = this.state.message.body ? (
      <div className={this.state.message.success}>
        {' '}
        {this.state.message.body}{' '}
      </div>
    ) : (
      ''
    );

    for (let key in this.state.partnerForm) {
      formElementsArray.push({
        id: key,
        config: this.state.partnerForm[key]
      });
    }

    // destructure the formElementsArray
    const [name, type, description, fb, twitter, website] = formElementsArray;

    const customAvatarFormControl = (
      <div className='customAvatarWrapper'>
        <h4> Custom avatar </h4>{' '}
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${this.state.customAvatar.name}`}
          alt=''
        />
        <input
          type='file'
          name='customAvatar'
          onChange={this.onChangeAvatar.bind(this)}
          accept='image/png, image/jpeg'
        />
      </div>
    );

    if (!profile) return null;
    return (
      <StyledWrapper>
        <h1 className='admin-area-top-header'> Your Profile </h1>{' '}
        <div className='admin-area-content-section'>
          <p> Welcome, {profile.name} </p>{' '}
          <p>
            now you are ready to configure your profile and add some catalogs
            connected to it.{' '}
          </p>{' '}
        </div>{' '}
        <div className='editing admin-area-content-section'>
          {' '}
          {customAvatarFormControl}{' '}
        </div>{' '}
        <div className='editing admin-area-content-section'>
          <h4> Your basic info </h4>{' '}
          {[name, type, description].map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event =>
                onChangedHandler.bind(
                  this,
                  event,
                  formElement.id,
                  'partnerForm',
                  checkValidity
                )()
              }
            />
          ))}{' '}
        </div>{' '}
        <div className='editing admin-area-content-section last-child'>
          <h4> Your social media </h4>{' '}
          {[fb, twitter, website].map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event =>
                onChangedHandler.bind(
                  this,
                  event,
                  formElement.id,
                  'partnerForm',
                  checkValidity
                )()
              }
            />
          ))}{' '}
        </div>{' '}
        <div className='action'>
          <Button
            btnType='success'
            clicked={() => this.submitPartnerInfo()}
            disabled={!this.state.formIsValid || this.state.loading}
          >
            Save{' '}
          </Button>{' '}
          {message}{' '}
        </div>{' '}
      </StyledWrapper>
    );
  }
}
