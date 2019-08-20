import React from "react";
import { EditableText, EditableBackgroundImage } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";
import bowl from "../../assets/images/tsc-bowl.svg";
import logo from "../../assets/images/tsc-logo.svg"


const PageHeader = ({ onSave, content, title, onUpdateTitle, onUpdateHeaderImage, headerImage }) => {
  const headerDeco = headerImage == "logo" ? logo : bowl;
  const headerDecoStyle = headerImage === "logo" ? { width: '300px' } : { width: "80px" };

  return (
      <div className="container pt-180">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb-text text-center mb-40">
              <h1 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={{ text: title }} onSave={ onUpdateTitle } />
              </h1>
              <span data-animation="fadeInUp" data-delay=".3s">
                <EditableText content={ content["header-subtitle"] } handleSave={ onSave("header-subtitle") } placeholder="Subtitle" />
              </span>
            </div>
            <div className="header-deco text-center">
              <div className="motif">
                <img src={headerDeco} style={headerDecoStyle} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};


PageHeader.defaultProps = {
  content: {
    "header-subtitle": {
      "text": ""
    }
  },
}

export default PageHeader
