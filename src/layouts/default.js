import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import withRoot from '../utils/withRoot';

import Notification from "../components/notifications/Notification";
import AccountButton from "../components/navigation/AccountButton";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/common/Footer";
import CreatePageModal from "../components/editing/CreatePageModal";

import {
  EditablesContext,
  theme
} from 'react-easy-editables';

import "../assets/css/animate.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/fontawesome-all.min.css";
import "../assets/css/default.css";
import "../assets/css/meanmenu.css";
import "../assets/css/slick.css";
import "../assets/sass/style.scss";
import "../assets/sass/less-cms/base.scss";
import "../assets/css/responsive.css";

import favicon from '../assets/images/icon.png'

import { closeMenu } from "../redux/actions";

const customEditorTheme = {
  ...theme,
  editContainer: {
    ...theme.editContainer,
    padding: "18px 4px 4px 4px",
  }
}


const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: '1'
  }
}

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
    pageData: state.page.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMenu: () => {
      dispatch(closeMenu());
    }
  };
};


class DefaultLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.closeMenu();
  }

  render() {
    return(
      <div style={styles.container}>
        <Helmet>
          <title>
            Trinity Square Cafe
          </title>
          <meta
            charSet="utf-8"
            description="Trinity Square Cafe"
            keywords="Trinity Square, cafe, mental illness, mental health, recovery, volunteer"
            viewport="width=device-width,initial-scale=1.0,maximum-scale=1"
          />
          <link rel="icon" href={favicon} type="image/x-icon" />
        </Helmet>
        <Notification />
        <AccountButton />
        <EditablesContext.Provider value={ { theme: customEditorTheme, showEditingControls: this.props.isEditingPage } }>
          <div className="page-container">

            <div className="page-wrapper">
              <Navigation currentPage={this.props.pageData} />
                {this.props.children}
              <Footer />
            </div>
          </div>
        </EditablesContext.Provider>
        <CreatePageModal />
      </div>
    )
  }
};

export default withRoot(connect(mapStateToProps, mapDispatchToProps)(DefaultLayout));


