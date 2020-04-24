import React from 'react';

import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';

import './ProfilePresentation.scss';

const ProfilePresentation = props => {
  const {
    profile,
    customAvatar,
    message,
    partnerForm,
    onChangeAvatar,
    onChangeHandler,
    submitPartnerInfo
  } = props;
  const formElementsArray = [];

  const status_message = message.body ? (
    <div className={message.success}>{message.body}</div>
  ) : (
    ''
  );

  for (let key in partnerForm) {
    formElementsArray.push({
      id: key,
      config: partnerForm[key]
    });
  }

  const [name, type, description, fb, twitter, website] = formElementsArray;

  return (
    <section className='main'>
      <h1 className='admin-area-top-header'> Your Profile </h1>
      <div className='admin-area-content-section'>
        <p> Welcome, {profile.name} </p>
        <p>
          now you are ready to configure your profile and add some catalogs
          connected to it.
        </p>
      </div>
      <div className='editing admin-area-content-section'>
        <div className='customAvatarWrapper'>
          <h4> Custom avatar </h4>
          <img
            src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${customAvatar.name}`}
            alt=''
          />
          <input
            type='file'
            name='customAvatar'
            onChange={onChangeAvatar}
            accept='image/png, image/jpeg'
          />
        </div>
      </div>
      <div className='editing admin-area-content-section'>
        <h4> Your basic info </h4>
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
              onChangeHandler(event, formElement.id, 'partnerForm')
            }
          />
        ))}
      </div>
      <div className='editing admin-area-content-section last-child'>
        <h4> Your social media </h4>
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
              onChangeHandler(event, formElement.id, 'partnerForm')
            }
          />
        ))}
      </div>
      <div className='action'>
        <Button
          btnType='success'
          clicked={submitPartnerInfo}
          disabled={!props.formIsValid || props.loading}
        >
          Save
        </Button>
        {status_message}
      </div>
    </section>
  );
};

export default ProfilePresentation;
