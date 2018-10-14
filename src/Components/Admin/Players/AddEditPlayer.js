import React, { Component } from 'react';
import AdminLayout from "../../../Hoc/AdminLayout";
import FormField from "../../UI/FormFields";
import { validate } from "../../UI/Misc";
import { firebasePlayers, firebaseDB, firebase } from "../../../Firebase"
import { FileUploader } from "../../UI/FileUploader";

class AddPlayer extends Component {

  constructor(props) {
    super(props);

    //takımları db'den çekeceğiz.
    //maç ID'lerini db'den çekeceğiz.

    this.state = {
      playerId: "",
      formType: "",
      formError: false,
      formSuccess: "",
      defaultImg: "",
      players: [],
      formdata: {
        name: {
          element:"input",
          value:"",
          config:{
            label: "Player name",
            name:"name_input",
            type: "text"
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: "",
          showLabel: true
        },
        lastname: {
          element:"input",
          value:"",
          config:{
            label: "Player lastname",
            name:"lastname_input",
            type: "text"
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: "",
          showLabel: true
        },
        number: {
          element:"input",
          value:"",
          config:{
            label: "Player number",
            name:"number_input",
            type: "text"
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: "",
          showLabel: true
        },
        position: {
          element:"select",
          value:"",
          config:{
            label: "Select position",
            name:"select_position",
            type: "select",
            options: [
              {
                key: "Goalkeeper",
                value: "Goalkeeper"
              },
              {
                key: "Defence",
                value: "Defence"
              },
              {
                key: "Midfielder",
                value: "Midfielder"
              },
              {
                key: "Striker",
                value: "Striker"
              },
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: "",
          showLabel: true
        }
      }
    }
  }

  componentDidMount() {

    const playerId = this.props.match.params.id;

    if(!playerId) {
      this.setState({
        formType: "Add player"
      })
    } else {

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

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if(formIsValid) {
      //submit form
    } else {
      this.setState({
        formError: true
      })
    }
  }
  
  render() {

    const issueMessage = this.state.formError ? <div>Something is wrong</div>: ""

    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>
            {this.state.formType}
          </h2>
          <div>
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField 
                id="name"
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />

              <FormField 
                id="lastname"
                formdata={this.state.formdata.lastname}
                change={(element) => this.updateForm(element)}
              />

              <FormField 
                id="number"
                formdata={this.state.formdata.number}
                change={(element) => this.updateForm(element)}
              />

              <FormField 
                id="position"
                formdata={this.state.formdata.position}
                change={(element) => this.updateForm(element)}
              />
              <div className="success_label">{this.state.formSuccess}</div>

                { issueMessage }

              <div className="admin_submit">
                <button onClick={(event) => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    )
  }
}

export default AddPlayer;
// section 4 lecture 56 1st min