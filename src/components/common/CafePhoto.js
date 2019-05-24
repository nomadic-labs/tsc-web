import React from "react";
import PropTypes from "prop-types";

import {
  EditableImageUpload,
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

const CafePhoto = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave({ "cafe-image": newContent })
  }

  return (
    <div className="cafe-image">
      <EditableImageUpload
        content={content["cafe-image"]}
        onSave={handleSave}
        onDelete={props.onDelete}
        uploadImage={uploadImage}
        classes="img-fluid"
        styles={{ container: { height: "100%" }, image: { height: "100%", objectFit: "cover" }}}
      />
    </div>
  );
};

export default CafePhoto;
