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
  EditableEmbeddedIframe
} from "react-easy-editables";

import { uploadImage } from "../firebase/operations";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import Container from "../components/common/Container";
import Carousel from "../components/common/Carousel";
import Testimonial from "../components/common/Testimonial";
import PartnerLogo from "../components/common/PartnerLogo";
import CafePhoto from "../components/common/CafePhoto";
import Affix from "../components/common/Affix";
import EmbeddedIframe from "../components/common/EmbeddedIframe";
import PageHeader from "../components/common/PageHeader";

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

class HomePage extends React.Component {

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
            headerImage={"logo"}
          />

          <Section className="wow fadeIn pt-80 pb-80 pos-relative">
            <Container>
              <div className="row">
                <div className="col-xl-5 col-lg-5 pos-relative">
                  <div className="wow fadeIn">
                    <EditableImageUpload
                      content={content["intro-image"]}
                      onSave={this.onSave("intro-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7">
                  <div className="mb-30">
                    <EditableParagraph content={content["intro-description"]} handleSave={this.onSave("intro-description")} />
                    <EditableLink classes={"btn btn-primary mt-20"} content={content["intro-more-btn"]} handleSave={this.onSave("intro-more-btn")} />
                  </div>
                </div>
              </div>
            </Container>
          </Section>


          <Section className="wow pt-80 pb-80 fadeIn bg-lighter">
            <Container>
              <div className="row">
                <div className="col-xl-7 col-lg-7">
                  <div className="section-title">
                    <h2 className="mb-20">
                      <EditableText content={content["how-we-work-title"]} handleSave={this.onSave("how-we-work-title")} />
                    </h2>
                  </div>
                  <div className="callout-text mb-20">
                    <EditableText content={content["how-we-work-callout"]} handleSave={this.onSave("how-we-work-callout")} />
                  </div>
                  <div className="mb-30">
                    <EditableParagraph content={content["how-we-work-description"]} handleSave={this.onSave("how-we-work-description")} />
                    <EditableLink classes={"btn btn-primary mt-20"} content={content["how-we-work-more-btn"]} handleSave={this.onSave("how-we-work-more-btn")} />
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 pos-relative">
                  <div className="wow fadeIn">
                    <EditableImageUpload
                      content={content["how-we-work-image"]}
                      onSave={this.onSave("how-we-work-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80">
            <Container>
              <div className="row">

                <div className="col-xl-5 col-lg-6">
                  <div className="mb-30 wow fadeIn">
                    <EditableImageUpload
                      content={content["cafe-image"]}
                      onSave={this.onSave("cafe-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>

                <div className="col-xl-7 col-lg-6">
                  <div className="mb-30">
                    <div className="section-title mb-65">
                      <h2 className="mb-20">
                        <EditableText content={content["team-title"]} handleSave={this.onSave("team-title")} />
                      </h2>
                      <EditableParagraph content={content["team-description"]} handleSave={this.onSave("team-description")} />
                      <EditableLink classes={"btn btn-primary mt-20"} content={content["team-more-btn"]} handleSave={this.onSave("team-more-btn")} />
                    </div>
                  </div>
                </div>

              </div>
            </Container>

          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-lighter pos-relative">
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: { eq: "home" }) {
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


