import React from "react";
import PropTypes from "prop-types";

import {
  PlainTextEditor,
  RichTextEditor,
  ImageUploadEditor,
  LinkEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

class TestimonialEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content };
  }

  handleEditorChange = field => item => {
    this.setState({
      content: {
        ...this.state.content,
        [field]: {
          ...item
        }
      }
    });
  }

  render() {
    const { content } = this.state;

    return(
      <div className="row justify-content-center">
        <div className="testimonial-wrapper text-center col-12 col-md-8 card p-5">
          <div className="testimonial-icon">
            <i className="fas fa-quote-right"></i>
          </div>
          <div className="testimonial-text">
            <p>
              <PlainTextEditor
                content={content["testimonial-quote"]}
                handleEditorChange={this.handleEditorChange("testimonial-quote")}
              />
            </p>
            <h3>
              <PlainTextEditor
                content={content["testimonial-name"]}
                handleEditorChange={this.handleEditorChange("testimonial-name")}
              />
            </h3>
            <span>
              <PlainTextEditor
                content={content["testimonial-title"]}
                handleEditorChange={this.handleEditorChange("testimonial-title")}
              />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const Testimonial = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <Editable
      Editor={TestimonialEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className="row justify-content-center">
        <div className="testimonial-wrapper text-center col-12 col-md-8 card p-5">
          <div className="testimonial-icon">
            <i className="fas fa-quote-right"></i>
          </div>
          <div className="testimonial-text">
            <p>{content["testimonial-quote"]["text"]}</p>
            <h3>{content["testimonial-name"]["text"]}</h3>
            <span>{content["testimonial-title"]["text"]}</span>
          </div>
        </div>
      </div>
    </Editable>
  );
};

export default Testimonial;
