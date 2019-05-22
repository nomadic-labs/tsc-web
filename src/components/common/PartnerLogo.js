import React from "react";
import PropTypes from "prop-types";

import {
  PlainTextEditor,
  RichTextEditor,
  ImageUploadEditor,
  LinkEditor,
  EditableImageUpload,
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

class PartnerLogoEditor extends React.Component {
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
      <div className="partner-logo">
        <ImageUploadEditor
          classes="img-fluid"
          content={content["partner-image"]}
          handleEditorChange={this.handleEditorChange("partner-image")}
          uploadImage={uploadImage}
        />
      </div>
    )
  }
}

const PartnerLogo = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave({ "partner-image": newContent })
  }

  return (
    <div className="partner-logo m-5">
      <EditableImageUpload
        content={content["partner-image"]}
        onSave={handleSave}
        uploadImage={uploadImage}
        classes="img-fluid"
      />
    </div>
  );
};

export default PartnerLogo;
