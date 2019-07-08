import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const classValidation = `field ${
      meta.error && meta.touched ? "error" : ""
    }`;
    return (
      <div className={classValidation}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" label="Enter Title" component={this.renderInput} />
        <Field
          name="description"
          label="Enter Description"
          component={this.renderInput}
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Title is a required field.";
  } else if (formValues.title.length <= 3) {
    errors.title = "Title should be more than 3 characters.";
  }

  if (!formValues.description) {
    errors.description = "Description is a required field.";
  }

  return errors;
};

export default reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);
