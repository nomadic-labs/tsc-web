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

class BoardMemberEditor extends React.Component {
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
      <div className="mb-30 col-12 col-sm-6 col-md-3">
        <div className="team-wrapper">
          <ImageUploadEditor
            content={content["board-member-image"]}
            handleEditorChange={this.handleEditorChange("board-member-image")}
            uploadImage={uploadImage}
          />
          <h4>
            <PlainTextEditor
              content={content["board-member-name"]}
              handleEditorChange={this.handleEditorChange("board-member-name")}
            />
          </h4>
          <span>
            <PlainTextEditor
              content={content["board-member-title"]}
              handleEditorChange={this.handleEditorChange("board-member-title")}
            />
          </span>
        </div>
      </div>
    )
  }
}

const BoardMember = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <Editable
      Editor={BoardMemberEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className="team-wrapper mb-30 col-12 col-sm-6 col-md-3">
        <div className="team-img">
          <img src={content["board-member-image"]["imageSrc"]} alt={content["board-member-image"]["caption"]} />
          <div className="team-text">
            <h4>{content["board-member-name"]["text"]}</h4>
            <span>{content["board-member-title"]["text"]}</span>
          </div>
        </div>
      </div>
    </Editable>
  );
};

export default BoardMember;
