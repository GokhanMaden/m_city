import React, { Component } from 'react';
import Fade from "react-reveal/Fade";
import FormField from "../../UI/FormFields";
import { validate } from "../../UI/Misc";

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
      formdata: newFormdata
    });

  }

  submitForm() {

  }

  render() {
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
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
//section 3 lecture 39 10:31