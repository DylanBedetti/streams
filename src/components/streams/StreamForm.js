import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
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
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input autoComplete="off" {...input}></input>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <h3>{this.props.title}</h3>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)} // this is a callback, how do we know its a callback?
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

// why outside class?
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "IDIOT enter a title";
  }

  if (!formValues.description) {
    errors.description = "IDIOT you need a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
