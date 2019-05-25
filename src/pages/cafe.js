import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import {
  updatePageContent,
  pushContentItem,
  removeContentItem,
  loadPageData,
  updateTitle,
  updateHeaderImage,
} from "../redux/actions";
import {
  EditableText,
  EditableParagraph,
  EditableBackgroundImage,
  EditableImageUpload,
  EditableLink,
  EditableEmbeddedIframe,
} from "react-easy-editables";

import { uploadImage } from "../firebase/operations";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import Container from "../components/common/Container";
import Carousel from "../components/common/Carousel";
import Testimonial from "../components/common/Testimonial";
import PartnerLogo from "../components/common/PartnerLogo";
import Affix from "../components/common/Affix";
import EmbeddedIframe from "../components/common/EmbeddedIframe";
import PageHeader from "../components/common/PageHeader";
import InstagramFeed from "../components/common/InstagramFeed";
import RecipeSummary from "../components/common/RecipeSummary";

import { DEFAULT_COMPONENT_CONTENT } from "../utils/constants"

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageContent: (location, data) => {
      dispatch(updatePageContent(location, data));
    },
    onPushContentItem: (location, data) => {
      dispatch(pushContentItem(location, data))
    },
    onRemoveContentItem: (location, itemId) => {
      dispatch(removeContentItem(location, itemId))
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
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};

class CafePage extends React.Component {

  constructor(props) {
    super(props);
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };
    this.props.onLoadPageData(initialPageData);
  };

  onSave = id => content => {
    this.props.onUpdatePageContent(id, content);
  };

  onAddItem = id => content => {
    this.props.onPushContentItem(id, content);
  }

  onDeleteItem = id => itemId => {
    this.props.onRemoveContentItem(id, itemId)
  }

  onUpdateTitle = content => {
    this.props.onUpdateTitle(content.text)
  }

  onUpdateHeaderImage = content => {
    this.props.onUpdateHeaderImage(content)
  }

  render() {
    const recipePages = this.props.data.allPages ? this.props.data.allPages.edges : [];
    const pageData = this.props.pageData ? this.props.pageData : this.props.data.pages;
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);

    return (
      <Layout location={this.props.location}>
        <main>
          <PageHeader
            title={pageData.title}
            onSave={this.onSave}
            content={ content }
            onUpdateHeaderImage={this.onUpdateHeaderImage}
            onUpdateTitle={this.onUpdateTitle}
          />

          <Section className="wow fadeIn pt-80 pb-80 pos-relative">
            <Container>
              <div className="mb-40">
                <div className="section-title text-center">
                  <h2 className="mb-20">
                    <EditableText content={content["sample-menu-title"]} handleSave={this.onSave("sample-menu-title")} />
                  </h2>
                  <EditableParagraph content={content["sample-menu-description"]} handleSave={this.onSave("sample-menu-description")} />
                </div>
              </div>

              <div className="row">
                <div className="sample-menu-item-wrapper wow fadeIn mb-30 col-12 col-md-6">
                  <div className="row">
                    <div className="col-12 col-sm-6 mb-20">
                      <EditableImageUpload
                        content={content["menu-item1-image"]}
                        onSave={this.onSave("menu-item1-image")}
                        uploadImage={uploadImage}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <h4>
                        <EditableText content={content["menu-item1-title"]} handleSave={this.onSave("menu-item1-title")} />
                      </h4>
                      <div className="mt-20 mb-20">
                        <div className="label"><EditableText content={content["menu-item1-price"]} handleSave={this.onSave("menu-item1-price")} /></div>
                        <div className="label"><EditableText content={content["menu-item1-price2"]} handleSave={this.onSave("menu-item1-price2")} /></div>
                      </div>
                      <EditableParagraph content={content["menu-item1-description"]} handleSave={this.onSave("menu-item1-description")} />
                    </div>
                  </div>
                </div>

                <div className="sample-menu-item-wrapper wow fadeIn mb-30 col-12 col-md-6">
                  <div className="row">
                    <div className="col-12 col-sm-6 mb-20">
                      <EditableImageUpload
                        content={content["menu-item2-image"]}
                        onSave={this.onSave("menu-item2-image")}
                        uploadImage={uploadImage}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <h4>
                        <EditableText content={content["menu-item2-title"]} handleSave={this.onSave("menu-item2-title")} />
                      </h4>
                      <div className="mt-20 mb-20">
                        <div className="label"><EditableText content={content["menu-item2-price"]} handleSave={this.onSave("menu-item2-price")} /></div>
                        <div className="label"><EditableText content={content["menu-item2-price2"]} handleSave={this.onSave("menu-item2-price2")} /></div>
                      </div>
                      <EditableParagraph content={content["menu-item2-description"]} handleSave={this.onSave("menu-item2-description")} />
                    </div>
                  </div>
                </div>

                <div className="sample-menu-item-wrapper wow fadeIn mb-30 col-12 col-md-6">
                  <div className="row">
                    <div className="col-12 col-sm-6 mb-20">
                      <EditableImageUpload
                        content={content["menu-item3-image"]}
                        onSave={this.onSave("menu-item3-image")}
                        uploadImage={uploadImage}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <h4>
                        <EditableText content={content["menu-item3-title"]} handleSave={this.onSave("menu-item3-title")} />
                      </h4>
                      <div className="mt-20 mb-20">
                        <div className="label"><EditableText content={content["menu-item3-price"]} handleSave={this.onSave("menu-item3-price")} /></div>
                        <div className="label"><EditableText content={content["menu-item3-price2"]} handleSave={this.onSave("menu-item3-price2")} /></div>
                      </div>
                      <EditableParagraph content={content["menu-item3-description"]} handleSave={this.onSave("menu-item3-description")} />
                    </div>
                  </div>
                </div>

                <div className="sample-menu-item-wrapper wow fadeIn mb-30 col-12 col-md-6">
                  <div className="row">
                    <div className="col-12 col-sm-6 mb-20">
                      <EditableImageUpload
                        content={content["menu-item4-image"]}
                        onSave={this.onSave("menu-item4-image")}
                        uploadImage={uploadImage}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <h4>
                        <EditableText content={content["menu-item4-title"]} handleSave={this.onSave("menu-item4-title")} />
                      </h4>
                      <div className="mt-20 mb-20">
                        <div className="label"><EditableText content={content["menu-item4-price"]} handleSave={this.onSave("menu-item4-price")} /></div>
                        <div className="label"><EditableText content={content["menu-item4-price2"]} handleSave={this.onSave("menu-item4-price2")} /></div>
                      </div>
                      <EditableParagraph content={content["menu-item4-description"]} handleSave={this.onSave("menu-item4-description")} />
                    </div>
                  </div>
                </div>

              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-lighter">
            <Container>

              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="section-title">
                    <h2 className="mb-20">
                      <EditableText content={content["recipes-title"]} handleSave={this.onSave("recipes-title")} />
                    </h2>
                  </div>
                  { recipePages.slice(0,3).map(recipe => <RecipeSummary key={recipe.node.id} recipe={recipe.node} />)}
                </div>

                <div className="col-12 col-md-4">
                  <div className="section-title">
                    <h2 className="mb-20">
                      <EditableText content={content["instagram-title"]} handleSave={this.onSave("instagram-title")} />
                    </h2>
                  </div>
                  <InstagramFeed />
                </div>
              </div>
            </Container>
          </Section>


          <Section className="wow fadeIn pt-80 pb-80 pos-relative">
            <Container>
              <h2 className="text-center mb-20" data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["testimonials-title"]} handleSave={this.onSave("testimonials-title")} />
              </h2>
              <Carousel
                collection={content["testimonials"]}
                SlideComponent={Testimonial}
                onSave={this.onSave('testimonials')}
                onAddItem={this.onAddItem('testimonials')}
                onDeleteItem={this.onDeleteItem('testimonials')}
                options={{ slidesToShow: 1 }}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['testimonials']}
              />
            </Container>
          </Section>

        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CafePage);

export const query = graphql`
  query {
    pages(id: { eq: "cafe" }) {
      id
      content
      title
      slug
      header_image {
        imageSrc
      }
    }
    allPages(
      filter: {
        template: {
          in: ["recipe-page.js"]
        }
      }
      sort: {
        fields: [id]
        order: DESC
      }) {
      edges {
        node {
          id
          title
          slug
          content
          order
          header_image {
            imageSrc
          }
        }
      }
    }
  }
`;


