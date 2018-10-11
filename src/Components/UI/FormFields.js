import React from "react";

const FormField = ({formdata, id, change}) => {

  const showError = () => {
    let message = formdata.validation && !formdata.valid ? formdata.validationMessage : null;
    let errorMessage = <div className="error_label">
      {message}
    </div>

    return errorMessage;
  }

  const renderTemplate = () => {
    let formTemplate = null;

    switch(formdata.element) {
      case("input"):
        formTemplate = (
          <div>
            <input 
              {...formdata.config}
              value={formdata.value}
              onChange={(event) => change({event, id})}
            />
            {showError()}
          </div>
        )
      break;
      default:
        formTemplate= null;
    }

    return formTemplate;
  }

  return(
    <div>
      {renderTemplate()}
    </div>
  )
}

export default FormField;