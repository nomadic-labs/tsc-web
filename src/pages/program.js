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

class ProgramPage extends React.Component {

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
          />

          <Section className="wow fadeIn pt-80">
            <Container>
              <div className="row justify-content-center">
                <div className="col-lg-7 col-xl-7">
                  <EditableParagraph content={content["program-intro-description"]} handleSave={this.onSave("program-intro-description")} />
                </div>
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-40 pb-80 pos-relative">
            <div className="background-circle d-none d-lg-block" />
            <Container>

              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-5">
                  <div className="mb-30">
                    <EditableImageUpload
                      classes="rounded-circle"
                      content={content["mission-image"]}
                      onSave={this.onSave("mission-image")}
                      uploadImage={uploadImage}
                      styles={{ image: { height: "100%" }}}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-xl-7">
                  <div className="mb-30">
                    <div className="section-title">
                      <span className="mb-20 label">
                        <EditableText content={content["mission-headline"]} handleSave={this.onSave("mission-headline")} />
                      </span>
                    </div>
                    <div className="mb-30 lead-text">
                      <EditableParagraph content={content["mission-description"]} handleSave={this.onSave("mission-description")} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row align-items-center reverse-order-mobile">
                <div className="col-lg-6 col-xl-7 order-1">
                  <div className="mb-30">
                    <div className="section-title">
                      <span className="mb-20 label">
                        <EditableText content={content["vision-headline"]} handleSave={this.onSave("vision-headline")} />
                      </span>
                    </div>
                    <div className="mb-30 lead-text">
                      <EditableParagraph content={content["vision-description"]} handleSave={this.onSave("vision-description")} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-5 order-2">
                  <div className="mb-30">
                    <EditableImageUpload
                      classes="rounded-circle"
                      content={content["vision-image"]}
                      onSave={this.onSave("vision-image")}
                      uploadImage={uploadImage}
                      styles={{ image: { height: "100%" }}}
                    />
                  </div>
                </div>
              </div>

            </Container>
          </Section>


          <Section className="wow fadeIn pt-80 pb-80 bg-lighter">
            <Container>
              <div className="row">
                <div className="col-12">
                  <div className="mb-40">
                    <div className="section-title">
                      <h2 className="mb-20 text-center">
                        <EditableText content={content["referrals-title"]} handleSave={this.onSave("referrals-title")} />
                      </h2>
                    </div>
                    <div className="mb-30 text-center">
                      <EditableParagraph content={content["referrals-description"]} handleSave={this.onSave("referrals-description")} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-4">

                  <div className="pricing-wrapper mb-50">
                    <div className="our-services-text">
                      <h4 className="mb-20">
                        <span className="icon-bg"><i className="fas fa-check"></i></span>
                        <EditableText content={content["referral-step1-header"]} handleSave={this.onSave("referral-step1-header")} />
                      </h4>
                      <EditableParagraph content={content["referral-step1-description"]} handleSave={this.onSave("referral-step1-description")} />
                    </div>
                  </div>

                </div>

                <div className="col-12 col-lg-4">

                  <div className="pricing-wrapper mb-50">
                    <div className="our-services-text">
                      <h4 className="mb-20">
                        <span className="icon-bg"><i className="fas fa-check"></i></span>
                        <EditableText content={content["referral-step2-header"]} handleSave={this.onSave("referral-step2-header")} />
                      </h4>
                      <EditableParagraph content={content["referral-step2-description"]} handleSave={this.onSave("referral-step2-description")} />
                    </div>
                  </div>

                </div>

                <div className="col-12 col-lg-4">

                  <div className="pricing-wrapper mb-50">
                    <div className="our-services-text">
                      <h4 className="mb-20">
                        <span className="icon-bg"><i className="fas fa-check"></i></span>
                        <EditableText content={content["referral-step3-header"]} handleSave={this.onSave("referral-step3-header")} />
                      </h4>
                      <EditableParagraph content={content["referral-3-description"]} handleSave={this.onSave("referral-3-description")} />
                    </div>
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
                    <Carousel
                      classes="cafe-photos"
                      collection={content["cafe-photos"]}
                      SlideComponent={CafePhoto}
                      onSave={this.onSave('cafe-photos')}
                      onAddItem={this.onAddItem('cafe-photos')}
                      onDeleteItem={this.onDeleteItem('cafe-photos')}
                      options={{ slidesToShow: 1, dots: true, infinite: true, adaptiveHeight: true }}
                      isEditingPage={this.props.isEditingPage}
                      defaultContent={DEFAULT_COMPONENT_CONTENT['cafe-photos']}
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

        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramPage);

export const query = graphql`
  query {
    pages(id: { eq: "program" }) {
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


