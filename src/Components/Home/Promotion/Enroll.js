import React, { Component } from 'react';
import Fade from "react-reveal/Fade";
import FormField from "../../UI/FormFields";

class Enroll extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formSuccess: "",
      formdata: {
        email: {
          element:"input-text",
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
  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div className="enroll_title">
              Enter your email
            </div>
            <div className="enroll_input">
              FormField
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
//section 3 lecture 39 10:31