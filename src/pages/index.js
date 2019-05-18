import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import {
  updatePage,
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
import ImageCarousel from "../components/common/ImageCarousel";
import Affix from "../components/common/Affix";
import EmbeddedIframe from "../components/common/EmbeddedIframe";
import PageHeader from "../components/common/PageHeader";

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
    this.props.onUpdatePageData("home", id, content);
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
                  <div className="about-wrapper mb-30">
                    <div className="section-title">
                      <h1>
                        <EditableText content={content["intro-title"]} handleSave={this.onSave("intro-title")} />
                      </h1>
                    </div>
                    <div className="about-text mb-30">
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
              <div class="row">
                <div class="col-xl-5 col-lg-5">
                  <div class="team-content mb-30">
                    <div class="section-title mb-65">
                      <h2><EditableText content={content["team-title"]} handleSave={this.onSave("team-title")} /></h2>
                      <EditableParagraph content={content["team-description"]} handleSave={this.onSave("team-description")} />
                    </div>
                  </div>
                </div>
                <div class="col-xl-7 col-lg-7">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6">
                            <div class="team-wrapper mb-30">
                                <div class="team-img">
                                    <EditableImageUpload
                                      content={content["team-image-1"]}
                                      onSave={this.onSave("team-image-1")}
                                      uploadImage={uploadImage}
                                    />
                                    <div class="team-text">
                                        <h4>Morris V. Vasquez</h4>
                                        <span>Organic Farmers</span>
                                        <div class="team-social-icon">
                                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            <a href="#"><i class="fab fa-twitter"></i></a>
                                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                            <a href="#"><i class="fab fa-youtube"></i></a>
                                            <a href="#"><i class="fab fa-behance"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6">
                            <div class="team-wrapper mb-30">
                                <div class="team-img">
                                    <EditableImageUpload
                                      content={content["team-image-2"]}
                                      onSave={this.onSave("team-image-2")}
                                      uploadImage={uploadImage}
                                    />
                                    <div class="team-text">
                                        <h4>Morris V. Vasquez</h4>
                                        <span>Organic Farmers</span>
                                        <div class="team-social-icon">
                                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            <a href="#"><i class="fab fa-twitter"></i></a>
                                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                            <a href="#"><i class="fab fa-youtube"></i></a>
                                            <a href="#"><i class="fab fa-behance"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6">
                            <div class="team-wrapper mb-30">
                                <div class="team-img">
                                    <EditableImageUpload
                                      content={content["team-image-3"]}
                                      onSave={this.onSave("team-image-3")}
                                      uploadImage={uploadImage}
                                    />
                                    <div class="team-text">
                                        <h4>Morris V. Vasquez</h4>
                                        <span>Organic Farmers</span>
                                        <div class="team-social-icon">
                                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            <a href="#"><i class="fab fa-twitter"></i></a>
                                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                            <a href="#"><i class="fab fa-youtube"></i></a>
                                            <a href="#"><i class="fab fa-behance"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6">
                            <div class="team-wrapper mb-30">
                                <div class="team-img">
                                    <EditableImageUpload
                                      content={content["team-image-4"]}
                                      onSave={this.onSave("team-image-4")}
                                      uploadImage={uploadImage}
                                    />
                                    <div class="team-text">
                                        <h4>Morris V. Vasquez</h4>
                                        <span>Organic Farmers</span>
                                        <div class="team-social-icon">
                                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            <a href="#"><i class="fab fa-twitter"></i></a>
                                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                            <a href="#"><i class="fab fa-youtube"></i></a>
                                            <a href="#"><i class="fab fa-behance"></i></a>
                                        </div>
                                    </div>
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
                  <div className="about-wrapper mb-30">
                    <div className="section-title">
                      <h2>
                        <EditableText content={content["how-we-work-title"]} handleSave={this.onSave("how-we-work-title")} />
                      </h2>
                    </div>
                    <div className="about-text mb-30">
                      <EditableParagraph content={content["how-we-work-description"]} handleSave={this.onSave("how-we-work-description")} />
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
              <h2 className="text-center" data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["testimonials-title"]} handleSave={this.onSave("testimonials-title")} />
              </h2>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80 pos-relative">
            <Container>
              <h2 className="text-center" data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["partners-funders-title"]} handleSave={this.onSave("partners-funders-title")} />
              </h2>
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


