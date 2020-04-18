import React from "react";
import PropTypes from "prop-types";

import {
  PlainTextEditor,
  TextAreaEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

const TestimonialEditor = ({ content, onContentChange }) => {

  const handleEditorChange = field => item => {
    onContentChange({
      ...content,
      [field]: {
        ...item
      }
    });
  }

  return(
    <div className="testimonial-wrapper text-center card p-5 wow fadeIn">
      <div className="testimonial-icon">
        <i className="fas fa-quote-right"></i>
      </div>
      <div className="testimonial-text">
        <p>
          <TextAreaEditor
            content={content["testimonial-quote"]}
            onContentChange={handleEditorChange("testimonial-quote")}
          />
        </p>
        <h3>
          <PlainTextEditor
            content={content["testimonial-name"]}
            onContentChange={handleEditorChange("testimonial-name")}
          />
        </h3>
        <span>
          <PlainTextEditor
            content={content["testimonial-title"]}
            onContentChange={handleEditorChange("testimonial-title")}
          />
        </span>
      </div>
    </div>
  )
}

class Testimonial extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: this.props.content || {}
    }
  }

  handleSave = newContent => {
    this.setState({ content: newContent })
    this.props.onSave(newContent)
  }

  handleContentChange = content => {
    this.setState({ content })
  }

  render() {
    const { content } = this.state;

    return (
      <Editable
        Editor={TestimonialEditor}
        handleSave={this.handleSave}
        handleContentChange={this.handleContentChange}
        content={content}
        {...this.props}
      >
        <div className="testimonial-wrapper text-center card p-5">
          <div className="testimonial-icon">
            <i className="fas fa-quote-right"></i>
          </div>
          <div className="testimonial-text">
            <p>{content["testimonial-quote"]["text"]}</p>
            <h3>{content["testimonial-name"]["text"]}</h3>
            <span>{content["testimonial-title"]["text"]}</span>
          </div>
        </div>
      </Editable>
    );
  }
};

export default Testimonial;
