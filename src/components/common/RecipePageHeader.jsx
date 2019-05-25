import React from "react";
import { EditableText, EditableBackgroundImage } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";

const defaultHeader = "https://firebasestorage.googleapis.com/v0/b/tru-web.appspot.com/o/images%2Fbg-botanical.png?alt=media&token=cce3440c-c686-41e8-a957-59dbaed77e04";

const RecipePageHeader = ({ onSave, content, title, headerImage, onUpdateTitle, onUpdateHeaderImage }) => {
  return (
    <div className="recipe-page-header">
      <EditableBackgroundImage
        classes="d-flex align-items-end pt-60"
        onSave={ onUpdateHeaderImage }
        uploadImage={ uploadImage }
        content={ headerImage || { imageSrc: defaultHeader} }
      >
        <div className="container title">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-text text-center">
                <h1 className="mt-50 mb-40" data-animation="fadeInUp" data-delay=".5s">
                  <EditableText content={{ text: title }} onSave={ onUpdateTitle } />
                </h1>
                <div data-animation="fadeInUp" data-delay=".3s">
                  <span className="subtitle"><EditableText content={ content["header-subtitle"] } handleSave={ onSave("header-subtitle") } placeholder="Subtitle" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditableBackgroundImage>
    </div>
  );
};


RecipePageHeader.defaultProps = {
  content: {
    "header-subtitle": {
      "text": ""
    }
  },
  headerImage: {
    "imageSrc": defaultHeader
  }
}

export default RecipePageHeader
