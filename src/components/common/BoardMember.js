import React from "react";
import PropTypes from "prop-types";

import {
  PlainTextEditor,
  TextAreaEditor,
  Editable
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

const BoardMemberEditor = ({ content, onContentChange}) => {
  const handleEditorChange = field => item => {
    console.log({field})
    console.log({item})
    onContentChange({
      ...content,
      [field]: {
        ...item
      }
    });
  }

  return(
    <div className="board-member">
      <h4>
        <PlainTextEditor
          content={content["board-member-name"]}
          onContentChange={handleEditorChange("board-member-name")}
        />
      </h4>
      <div className="label">
        <PlainTextEditor
          content={content["board-member-title"]}
          onContentChange={handleEditorChange("board-member-title")}
        />
      </div>
      <div className="bio">
        <TextAreaEditor
          content={content["board-member-bio"]}
          onContentChange={handleEditorChange("board-member-bio")}
        />
      </div>
    </div>
  )
}

const BoardMember = props => {

  const content = props.content || {};

  return (
    <div className="mb-30 col-12 col-sm-6 col-md-4">
      <Editable
        Editor={BoardMemberEditor}
        handleSave={props.onSave}
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
