import React from "react";
import { EditableText, EditableBackgroundImage } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";
import headerDeco from "../../assets/images/tsc-bowl.svg";

const defaultHeader = "https://firebasestorage.googleapis.com/v0/b/tru-web.appspot.com/o/images%2Fbg-botanical.png?alt=media&token=cce3440c-c686-41e8-a957-59dbaed77e04";

const PageHeader = ({ onSave, content, title, onUpdateTitle, onUpdateHeaderImage }) => {
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
                <img src={headerDeco} style={{ width: "80px" }} />
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
