import React, { Fragment } from "react";
import { connect } from "react-redux";
import { EditableText, EditableParagraph, EditableImageUpload } from "react-easy-editables";
import {
  updatePage,
  savePageContent,
  addSection,
  duplicateSection,
  deleteSection,
  addContentItem,
  updateContentItem,
  deleteContentItem,
} from "../../redux/actions";

import Header from "../common/Header";
import Paragraph from "../common/Paragraph";
import Image from "../common/Image";
import EmbeddedIframe from "../common/EmbeddedIframe";
import SectionEditingActions from "./SectionEditingActions"

const componentMap = {
  header: Header,
  paragraph: Paragraph,
  image: Image,
  embeddedIframe: EmbeddedIframe,
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    addSection: (sectionIndex, sectionType) => {
      dispatch(addSection(sectionIndex, sectionType));
    },
    deleteSection: (sectionIndex) => {
      dispatch(deleteSection(sectionIndex));
    },
    duplicateSection: (sectionIndex) => {
      dispatch(duplicateSection(sectionIndex));
    },
    addContentItem: (sectionIndex, contentType) => {
      dispatch(addContentItem(sectionIndex, contentType))
    },
    updateContentItem: (sectionIndex, contentIndex, content) => {
      dispatch(updateContentItem(sectionIndex, contentIndex, content))
    },
    deleteContentItem: (sectionIndex, contentIndex) => {
      dispatch(deleteContentItem(sectionIndex, contentIndex))
    },
    savePageContent: (innerFunction) => {
      dispatch(savePageContent(innerFunction));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};


const DynamicSection = ({ content, type, sectionIndex, pageData, isEditingPage, onUpdatePageData, savePageContent, addSection, deleteSection, duplicateSection, addContentItem, updateContentItem, deleteContentItem }) => {

  const onAddSection = () => {
    savePageContent(() => addSection(sectionIndex))
  }

  const onAddContrastSection = () => {
    savePageContent(() => addSection(sectionIndex, "contrast"))
  }

  const onDeleteSection = () => {
    savePageContent(() => deleteSection(sectionIndex))
  }

  const onDuplicateSection = () => {
    savePageContent(() => duplicateSection(sectionIndex))
  }

  const onAddContentItem = (contentType) => {
    savePageContent(() => addContentItem(sectionIndex, contentType))
  }

  const onUpdateContentItem = (sectionIndex, contentIndex) => content => {
    savePageContent(() => updateContentItem(sectionIndex, contentIndex, content))
  }

  const onDeleteContentItem = (sectionIndex, contentIndex) => () => {
    savePageContent(() => deleteContentItem(sectionIndex, contentIndex))
  }

  const classes = type === "contrast" ? "bg-primary" : "";

  return(
    <section className={`dynamic-section pos-relative pt-60 pb-60 ${classes}`}>
      {
        content.map((component, index ) => {
          const Component = componentMap[component.type];
          return (
            <Component
              content={component.content}
              onSave={onUpdateContentItem(sectionIndex, index)}
              onDelete={onDeleteContentItem(sectionIndex, index)}
              key={index}
            />
          )
        })
      }
      {
        isEditingPage &&
        <SectionEditingActions
          onDuplicateSection={onDuplicateSection}
          onDeleteSection={onDeleteSection}
          onAddSection={onAddSection}
          onAddContrastSection={onAddContrastSection}
          onAddContentItem={onAddContentItem}
        />
      }
    </section>
  )
};


export default connect(mapStateToProps, mapDispatchToProps)(DynamicSection);
