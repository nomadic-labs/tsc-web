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
import Collection from "../components/common/Collection";
import Testimonial from "../components/common/Testimonial";
import PartnerLogo from "../components/common/PartnerLogo";
import Affix from "../components/common/Affix";
import EmbeddedIframe from "../components/common/EmbeddedIframe";
import PageHeader from "../components/common/PageHeader";
import BoardMember from "../components/common/BoardMember";

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

class AboutPage extends React.Component {

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

          <Section className="wow fadeIn pt-80 pb-80 pos-relative">
            <div className="background-circle d-none d-lg-block" />
            <Container>

              <div className="row align-items-center justify-content-center">
                <div className="col-lg-5 col-xl-4">
                  <div className="mb-30">
                    <EditableImageUpload
                      classes="rounded-circle"
                      content={content["mission-image"]}
                      onSave={this.onSave("mission-image")}
                      uploadImage={uploadImage}
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

              <div className="row align-items-center justify-content-center reverse-order-mobile">
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
                <div className="col-lg-5 col-xl-4 order-2">
                  <div className="mb-30">
                    <EditableImageUpload
                      classes="rounded-circle"
                      content={content["vision-image"]}
                      onSave={this.onSave("vision-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
              </div>

              <div className="row align-items-center justify-content-center">
                <div className="col-lg-5 col-xl-4">
                  <div className="mb-30">
                    <EditableImageUpload
                      classes="rounded-circle"
                      content={content["mandate-image"]}
                      onSave={this.onSave("mandate-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-xl-7">
                  <div className="mb-30">
                    <div className="section-title">
                      <span className="mb-20 label">
                        <EditableText content={content["mandate-headline"]} handleSave={this.onSave("mandate-headline")} />
                      </span>
                    </div>
                    <div className="mb-30 lead-text">
                      <EditableParagraph content={content["mandate-description"]} handleSave={this.onSave("mandate-description")} />
                    </div>
                  </div>
                </div>
              </div>

            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80">
            <Container>
              <div className="section-title mb-30 text-center">
                <h2 className="mb-20">
                  <EditableText content={content["history-title"]} handleSave={this.onSave("history-title")} />
                </h2>
                <EditableParagraph content={content["history-description"]} handleSave={this.onSave("history-description")} />
                <div className="mt-40">
                  <EditableEmbeddedIframe content={content["history-timeline"]} handleSave={this.onSave("history-timeline")} />
                </div>
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-lighter">
            <Container>
                <div className="mt-40">
                  <div className="board-member row">
                    <div className="col-lg-5 col-xl-4">
                      <EditableImageUpload
                        classes="image"
                        content={content["director-image"]}
                        onSave={this.onSave("director-image")}
                        uploadImage={uploadImage}
                        styles={{ image: { width: "auto", height: "100%" }}}
                      />
                    </div>
                    <div className="col-lg-6 col-xl-7 mt-20">
                      <h2>
                        <EditableText
                          content={content["director-name"]}
                          handleSave={this.onSave("director-name")}
                        />
                      </h2>
                      <div className="label">
                        <EditableText
                          content={content["director-title"]}
                          handleSave={this.onSave("director-title")}
                        />
                      </div>
                      <div className="bio">
                        <EditableText
                          content={content["director-bio"]}
                          handleSave={this.onSave("director-bio")}
                        />
                      </div>

                      <div className="contact">
                        <EditableText
                          content={content["director-contact"]}
                          handleSave={this.onSave("director-contact")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </Container>
          </Section>


          <Section className="wow fadeIn pt-80 pb-80 ">
            <Container>
              <div className="section-title mb-40 text-center">
                <h2 className="mb-20">
                  <EditableText content={content["board-of-directors-title"]} handleSave={this.onSave("board-of-directors-title")} />
                </h2>
                <EditableParagraph content={content["board-of-directors-description"]} handleSave={this.onSave("board-of-directors-description")} />
                <EditableLink classes={"btn btn-primary mt-20"} content={content["board-of-directors-more-btn"]} handleSave={this.onSave("board-of-directors-more-btn")} />
              </div>
              <Collection
                items={content["board-members"]}
                Component={BoardMember}
                onSave={this.onSave('board-members')}
                onAddItem={this.onAddItem('board-members')}
                onDeleteItem={this.onDeleteItem('board-members')}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['board-members']}
                classes="row"
              />
            </Container>
          </Section>

        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);

export const query = graphql`
  query {
    pages(id: { eq: "about" }) {
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


