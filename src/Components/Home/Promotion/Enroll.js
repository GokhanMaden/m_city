import React, { Component } from 'react';
import Fade from "react-reveal/Fade";
import FormField from "../../UI/FormFields";
import { validate } from "../../UI/Misc";
import {firebasePromotion} from "../../../Firebase";

class Enroll extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formSuccess: "",
      formdata: {
        email: {
          element:"input",
          value:"",
          config:{
            name:"email_input",
            type: "email",
            placeholder: "Enter your Email"
          },
          validation: {
            required: true,
            email: true
          },
          valid: false,
          validationMessage: ""
        }
      }
    }
  }

  updateForm(element) {
    const newFormdata = {...this.state.formdata};
    const newElement = { ...newFormdata[element.id]};

    newElement.value = element.event.target.value;

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormdata[element.id] = newElement;
    
    this.setState({
      formdata: newFormdata,
      formError: false
    });
  }

  resetFormSuccess = (type) => {
    const newFormdata = {...this.state.formdata};

    for(let key in newFormdata) {
      newFormdata[key].value = "";
      newFormdata[key].formSuccess = false;
      newFormdata[key].validationMessage = "";
    }

    this.setState({
      formError: false,
      formdata: newFormdata,
      formSuccess: type ? "Congratulations!" : "Already on the database"
    })

    this.successMessage();
  }

  successMessage = () => {
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      })
    }, 2000);
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if(formIsValid) {
      
      firebasePromotion.orderByChild("email")
        .equalTo(dataToSubmit.email)
        .once("value")
        .then((snapshot) => {
          if(snapshot.val() === null) {
            firebasePromotion.push(dataToSubmit);
          } else {
            this.resetFormSuccess(snapshot.val() === null);
          }
        });
    } else {
      this.setState({
        formError: !formIsValid
      })
    }
  }

  render() {
    const formError = this.state.formError ? <div className="error_label">Something is wrong, try again!</div>: null;
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div className="enroll_title">
              Enter your email
            </div>
            <div className="enroll_input">
              <FormField 
                id="email"
                formdata={this.state.formdata.email}
                change={(element) => this.updateForm(element)}
              />
              {formError}
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={(event) => this.submitForm(event)}>Enroll</button>
              <div className="enroll_discl">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;

