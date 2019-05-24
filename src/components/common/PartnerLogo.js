import React from "react";
import PropTypes from "prop-types";

import {
  EditableImageUpload,
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations"

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
        onDelete={props.onDelete}
        uploadImage={uploadImage}
        classes="img-fluid"
      />
    </div>
  );
};

export default PartnerLogo;
