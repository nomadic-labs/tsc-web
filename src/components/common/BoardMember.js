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
        <div className="board-member">
          <h4>
            <PlainTextEditor
              content={content["board-member-name"]}
              onContentChange={this.handleEditorChange("board-member-name")}
            />
          </h4>
          <div className="label">
            <PlainTextEditor
              content={content["board-member-title"]}
              onContentChange={this.handleEditorChange("board-member-title")}
            />
          </div>
          <div className="bio">
            <PlainTextEditor
              content={content["board-member-bio"]}
              onContentChange={this.handleEditorChange("board-member-bio")}
            />
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
    <div className="mb-30 col-12 col-sm-6 col-md-4">
      <Editable
        Editor={BoardMemberEditor}
        handleSave={handleSave}
        content={content}
        {...props}
      >
        <div className="board-member">
          <h4>{content["board-member-name"]["text"]}</h4>
          <div className="label">{content["board-member-title"]["text"]}</div>
          <div className="bio">{content["board-member-bio"] ? content["board-member-bio"]["text"] : "Short bio"}</div>
        </div>
      </Editable>
    </div>
  );
};

export default BoardMember;
