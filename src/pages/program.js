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
            headerImage={pageData.header_image}
            onUpdateHeaderImage={this.onUpdateHeaderImage}
            onUpdateTitle={this.onUpdateTitle}
          />

          <Section className="wow fadeIn pt-80 pb-80 pos-relative">
            <Container>
              <div className="row">
                <div className="col-xl-5 col-lg-6">
                  <div className="bounce-animate mb-30">
                    <EditableImageUpload
                      content={content["intro-image"]}
                      onSave={this.onSave("intro-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="mb-30">
                    <div className="section-title">
                      <h2 className="mb-20">
                        <EditableText content={content["intro-title"]} handleSave={this.onSave("intro-title")} />
                      </h2>
                    </div>
                    <div className="mb-30">
                      <EditableParagraph content={content["intro-description"]} handleSave={this.onSave("intro-description")} />
                      <EditableLink classes={"btn btn-primary mt-20"} content={content["intro-more-btn"]} handleSave={this.onSave("intro-more-btn")} />
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-lighter">
            <Container>
              <div className="row">
                <div className="col-xl-5 col-lg-5">
                  <div className="team-content mb-30">
                    <div className="section-title mb-65">
                      <h2 className="mb-20">
                        <EditableText content={content["team-title"]} handleSave={this.onSave("team-title")} />
                      </h2>
                      <EditableParagraph content={content["team-description"]} handleSave={this.onSave("team-description")} />
                      <EditableLink classes={"btn btn-primary mt-20"} content={content["team-more-btn"]} handleSave={this.onSave("team-more-btn")} />
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="team-wrapper mb-30">
                                <div className="team-img">
                                    <EditableImageUpload
                                      content={content["team-image-1"]}
                                      onSave={this.onSave("team-image-1")}
                                      uploadImage={uploadImage}
                                      showCaption={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="team-wrapper mb-30">
                                <div className="team-img">
                                    <EditableImageUpload
                                      content={content["team-image-2"]}
                                      onSave={this.onSave("team-image-2")}
                                      uploadImage={uploadImage}
                                      showCaption={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="team-wrapper mb-30">
                                <div className="team-img">
                                    <EditableImageUpload
                                      content={content["team-image-3"]}
                                      onSave={this.onSave("team-image-3")}
                                      uploadImage={uploadImage}
                                      showCaption={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="team-wrapper mb-30">
                                <div className="team-img">
                                    <EditableImageUpload
                                      content={content["team-image-4"]}
                                      onSave={this.onSave("team-image-4")}
                                      uploadImage={uploadImage}
                                      showCaption={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </Container>

          </Section>

          <Section className="wow pt-80 pb-80 fadeIn pos-relative">
            <Container>
              <div className="row">
                <div className="col-xl-5 col-lg-5">
                  <div className="mb-30">
                    <div className="section-title">
                      <h2 className="mb-20">
                        <EditableText content={content["how-we-work-title"]} handleSave={this.onSave("how-we-work-title")} />
                      </h2>
                    </div>
                    <div className="mb-30">
                      <EditableParagraph content={content["how-we-work-description"]} handleSave={this.onSave("how-we-work-description")} />
                      <EditableLink classes={"btn btn-primary mt-20"} content={content["how-we-work-more-btn"]} handleSave={this.onSave("how-we-work-more-btn")} />
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 pos-relative">
                  <div className="mb-30 callout-bg">
                    <EditableImageUpload
                      content={content["how-we-work-image"]}
                      onSave={this.onSave("how-we-work-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                  <div className="callout p-4 bg-secondary text-white">
                    <EditableText content={content["how-we-work-callout"]} handleSave={this.onSave("how-we-work-callout")} />
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

          <Section className="wow fadeIn pt-80 pb-80 pos-relative">
            <Container>
              <h2 className="text-center mb-20" data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["partners-funders-title"]} handleSave={this.onSave("partners-funders-title")} />
              </h2>

              <Carousel
                collection={content["partner-logos"]}
                SlideComponent={PartnerLogo}
                onSave={this.onSave('partner-logos')}
                onAddItem={this.onAddItem('partner-logos')}
                onDeleteItem={this.onDeleteItem('partner-logos')}
                options={{ slidesToShow: 4 }}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['partner-logos']}
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


