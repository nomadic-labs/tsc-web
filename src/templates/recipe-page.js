import React from "react";
import { graphql } from "gatsby";

import Helmet from "react-helmet";

import { connect } from "react-redux";

import {
  EditableText,
  EditableParagraph,
  EditableBackgroundImage,
  EditableImageUpload,
  EditableLink,
} from "react-easy-editables";

import {
  updatePage,
  loadPageData,
  updateTitle,
  updateHeaderImage,
} from "../redux/actions";

import Layout from "../layouts/default.js";
import RecipePageHeader from "../components/common/RecipePageHeader";
import DynamicSection from "../components/editing/DynamicSection";
import Container from "../components/common/Container";
import Section from "../components/common/Section";


const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
    onUpdateTitle: title => {
      dispatch(updateTitle(title));
    },
    onUpdateHeaderImage: image => {
      dispatch(updateHeaderImage(image));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data
  };
};


class SingleColumnPage extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };
    this.props.onLoadPageData(initialPageData);
  };

  onSave = id => content => {
    this.props.onUpdatePageData(this.props.data.pages.id, id, content);
  };

  onUpdateTitle = content => {
    this.props.onUpdateTitle(content.text)
  }

  onUpdateHeaderImage = content => {
    this.props.onUpdateHeaderImage(content)
  }

  render() {

    const pageData = this.props.pageData ? this.props.pageData : this.props.data.pages;
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);
    const sections = content.sections && content.sections.length > 0 ? content.sections : [{ content: [] }];

    return (
      <div>
        <Layout location={this.props.location}>
          <Helmet>
            <title>{pageData.title}</title>
          </Helmet>
          <RecipePageHeader
            title={pageData.title}
            onSave={this.onSave}
            content={ content }
            headerImage={pageData.header_image}
            onUpdateHeaderImage={this.onUpdateHeaderImage}
            onUpdateTitle={this.onUpdateTitle}
          />

          <Section className="wow fadeIn pt-80 pb-80 pos-relative">
            <Container>
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <span className="mb-20 label">
                      <EditableText content={content["prep-time-headline"]} handleSave={this.onSave("prep-time-headline")} placeholder="Total prep and cooking time: 30 minutes" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-8 wow fadeIn instructions">
                  <div className="section-title">
                    <h2 className="mb-20">Instructions</h2>
                  </div>
                  <div className="mb-30">
                    <EditableParagraph
                      content={content["instructions-description"]}
                      handleSave={this.onSave("instructions-description")}
                    />
                  </div>
                </div>

                <div className="col-12 col-lg-4 mb-40 wow fadeIn ingredients">
                  <div className="bg-lighter p-5">
                    <h4 className="mb-20">Ingredients</h4>
                    <EditableParagraph
                      content={content["ingredients-content"]}
                      handleSave={this.onSave("ingredients-content")}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </Section>

        </Layout>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleColumnPage);

export const query = graphql`
  query BasicPageQuery($slug: String!) {
    pages(slug: { eq: $slug }) {
      id
      content
      title
      slug
      header_image {
        imageSrc
      }
    }
  }
`;
