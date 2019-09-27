import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import Reorder, { reorder } from 'react-reorder';
import { Redirect } from 'react-router-dom';

import AuxComp from '../../../hoc/AuxComp';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import CatalogueDatePicker from '../../../components/DatePicker';
import Auth from '../../Auth/Auth';

const DatePickersAreaWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

const BasicInfoAreaWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

const StyledReorder = styled(Reorder)`
  width: 100%;
  margin: 40px auto;
  min-height: 100px;
  border: dashed 2px #d5dee4;
  border-radius: 4px;
  padding: 10px;
  .list-item {
    position: relative;
    list-style: none;
    border: 2px solid #eee;
    border-radius: 4px;
    margin-left: 4px;
    float: none;
    width: 100px;
    height: 100px;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    &.dragged {
      border: 2px solid #5497b1;
      cursor: move;
    }
    &.placeholder {
      width: 100px;
      height: 100px;
      background: #eee;
      display: inline-block;
      z-index: -1;
    }
    span {
      position: absolute;
      top: 5px;
      right: 5px;
      background: rgba(200, 0, 0, 0.4);
      color: white;
      padding: 0 3px;
      border: 1px solid #eee;
      font-size: 12px;
      &:hover {
        background: rgba(200, 0, 0, 1);
        cursor: pointer;
      }
    }
  }
`;

const dropzone = {
  textAlign: 'center',
  width: '100%',
  padding: '20px',
  border: '2px dashed lightblue',
  margin: '20px 0'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
  margin: '0 auto'
};

class NewCatalogue extends Component {
  // FormData object for collecting whole data
  formData = new FormData();

  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(),
      message: '',
      error: '',
      editMode: false,
      loading: false,
      redirect: false,
      files: [],
      startDate: new Date(),
      endDate: new Date(),
      catalogueForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            label: 'Name',
            placeholder: 'name of the catalogue...'
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
              { value: 'grossery', displayValue: 'Grossery' },
              { value: 'toolkits', displayValue: 'Toolkits' }
            ]
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        }
      }
    };
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);

    for (let p of query.entries()) {
      if (p[0] && p[0] === 'catalogueId') {
        this.setState({ editMode: true });
        this.catalogueId = p[1];

        // assume that in edit mode the values in the form fields are valid
        const updatedCatalogueForm = {
          ...this.state.catalogueForm
        };
        for (let inputIdentifier in updatedCatalogueForm) {
          const updatedFormElement = {
            ...updatedCatalogueForm[inputIdentifier]
          };

          updatedFormElement.valid = true;

          updatedCatalogueForm[inputIdentifier] = updatedFormElement;
        }

        this.setState({
          catalogueForm: updatedCatalogueForm
        });
      }
    }
  }

  componentDidMount() {
    if (this.state.editMode) {
      fetch(`${process.env.REACT_APP_API_URL}/catalogue/${this.catalogueId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.auth.getAccessToken()}`
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          let catalogueForm = Object.assign({}, this.state.catalogueForm);
          let name = Object.assign({}, this.state.catalogueForm.name);
          let type = Object.assign({}, this.state.catalogueForm.type);
          const files = [];

          name.value = data.name;
          type.value = data.type;

          catalogueForm.name = name;
          catalogueForm.type = type;

          this.setState({
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            catalogueForm
          });

          for (let file of data.filesNames) {
            this.srcToFile(
              `${process.env.REACT_APP_API_URL}/catalogues/${data.image_folder}/images/${file.image}`,
              file.image,
              'image/png',
              files
            ).then(array => {
              const expandedFiles = this.expandWithPreviews(array);
              this.setState({ files: expandedFiles });
            });
          }
        });
    }
  }

  submitCatalogue() {
    this.setState({ loading: true });
    if (!this.state.editMode) {
      fetch(`${process.env.REACT_APP_API_URL}/admin/saveCatalogue`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.state.auth.getAccessToken()}`
        },
        body: this.setColectedData(this.formData)
      })
        .then(response => {
          console.log(response);
          this.setRedirect();
          this.renderRedirect();
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/admin/updateCatalogue`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.state.auth.getAccessToken()}`
        },
        body: this.setColectedData(this.formData)
      })
        .then(response => {
          console.log(response);
          this.setRedirect();
          this.renderRedirect();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/admin/catalog-list' />;
    }
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  }

  onDrop = files => {
    const expandedFiles = this.expandWithPreviews(files);
    this.setState({ files: this.state.files.concat(expandedFiles) });
  };

  onChangedHandler = (event, inputIdentifier) => {
    const updatedCatalogueForm = {
      ...this.state.catalogueForm
    };
    const updatedFormElement = {
      ...updatedCatalogueForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedCatalogueForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedCatalogueForm) {
      formIsValid = updatedCatalogueForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      catalogueForm: updatedCatalogueForm,
      formIsValid: formIsValid
    });
  };

  onReorder(event, previousIndex, nextIndex, fromId, toId) {
    this.setState({
      files: reorder(this.state.files, previousIndex, nextIndex)
    });
  }

  expandWithPreviews(acceptedFiles) {
    return acceptedFiles.map(file => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
    });
  }

  srcToFile(src, fileName, mimeType, arr) {
    return fetch(src)
      .then(res => {
        return res.arrayBuffer();
      })
      .then(buf => {
        arr.push(new File([buf], fileName, { type: mimeType }));

        return arr;
      });
  }

  onClickRemove(name) {
    let files = Object.assign({}, this.state.files);
    let filteredFiles = [];

    for (let file of Object.values(files)) {
      if (file.name !== name) {
        filteredFiles.push(file);
      }
    }

    return this.setState({ files: filteredFiles });
  }

  setColectedData(formData) {
    formData.append('name', this.state.catalogueForm.name.value);
    formData.append('type', this.state.catalogueForm.type.value);
    formData.append('startDate', this.state.startDate);
    formData.append('endDate', this.state.endDate);

    for (let i = 0; i < this.state.files.length; i++) {
      formData.append('files', this.state.files[i]);
    }

    // for the update endpoint append also catalogueId
    formData.append('catalogueId', this.catalogueId);

    return formData;
  }

  setStartDate(startDate) {
    this.setState({ startDate });
  }

  setEndDate(endDate) {
    this.setState({ endDate });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.catalogueForm) {
      formElementsArray.push({
        id: key,
        config: this.state.catalogueForm[key]
      });
    }

    return (
      <AuxComp>
        {this.renderRedirect()}
        <BasicInfoAreaWrapper>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.onChangedHandler(event, formElement.id)}
            />
          ))}
        </BasicInfoAreaWrapper>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} style={dropzone}>
                <input {...getInputProps()} />
                <p> Drag 'n drop some files here, or click to select files </p>
              </div>
            </section>
          )}
        </Dropzone>
        <StyledReorder
          reorderId='my-list' // Unique ID that is used internally to track this list (required)
          reorderGroup='reorder-group' // A group ID that allows items to be dragged between lists of the same group (optional)
          component='ul' // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
          placeholderClassName='placeholder' // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
          draggedClassName='dragged' // Class name to be applied to dragged elements (optional), defaults to 'dragged'
          //lock='vertical' // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
          holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
          touchHoldTime={500} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
          mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
          onReorder={this.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state)
          autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
          disabled={false} // Disable reordering (optional), defaults to false
          disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
          placeholder={
            <div className='list-item placeholder' /> // Custom placeholder element (optional), defaults to clone of dragged element
          }
        >
          {this.state.files.map((image, index) => (
            <li className='list-item' key={index}>
              <img src={image.preview} style={img} alt='' />
              <span onClick={() => this.onClickRemove(image.name)}>
                &times;
              </span>
            </li>
          ))}
        </StyledReorder>
        <DatePickersAreaWrapper>
          <CatalogueDatePicker
            label='Valid From'
            date={this.state.startDate}
            onDateChange={val => this.setStartDate(val)}
          />
          <CatalogueDatePicker
            label='Valid To'
            date={this.state.endDate}
            onDateChange={val => this.setEndDate(val)}
          />
        </DatePickersAreaWrapper>
        <Button
          btnType='success'
          clicked={() => this.submitCatalogue()}
          disabled={
            !this.state.formIsValid ||
            this.state.files.length === 0 ||
            this.state.loading
          }
        >
          Save
        </Button>
      </AuxComp>
    );
  }
}

export default NewCatalogue;
