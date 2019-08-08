import React from "react";
import slugify from "slugify";
import { StaticQuery, graphql } from "gatsby";
import { filter, orderBy } from 'lodash';

import { connect } from "react-redux";
import { toggleNewPageModal, createPage } from "../../redux/actions";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { PAGE_TYPES } from "../../utils/constants";

import defaultContentJSON from "../../fixtures/pageContent.json";

const mapStateToProps = state => {
  return {
    showNewPageModal: state.adminTools.showNewPageModal,
    newPage: state.adminTools.newPage,
    page: state.page.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleNewPageModal: () => {
      dispatch(toggleNewPageModal());
    },
    createPage: (pageData, pageId) => {
      dispatch(createPage(pageData, pageId));
    }
  };
};

const emptyPage = {
    title: "",
    order: "",
    category: "recipes",
    type: PAGE_TYPES[0].value,
  }

class CreatePageModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        ...this.props.page,
        order: this.props.order || 0,
      }
    };
    this.updatePage = (field, value) => {
      this._updatePage(field, value);
    };
    this.onSubmit = () => {
      this._onSubmit();
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newPage != this.props.newPage) {
      this.setState({ page: this.props.newPage ? emptyPage : {
        ...this.props.page,
        order: this.props.order || "",
      } })
    }
  }

  _updatePage(field, value) {
    this.setState({
      page: {
        ...this.state.page,
        [field]: value
      }
    });
  }

  _onSubmit() {
    const slugifiedTitle = slugify(this.state.page.title, {
      lower: true,
      remove: /[$*_+~.,()'"!\-:@%^&?=]/g
    })
    let pageData = {
      title: this.state.page.title,
      order: this.state.page.order,
    };

    if (this.props.newPage) {
      pageData.content = defaultContentJSON;
      pageData.slug = `${this.state.page.category}/${slugifiedTitle}`;
      pageData.template = this.state.page.type.template;
    }

    const pageId = this.props.newPage ? slugifiedTitle : this.props.page.id;

    this.props.createPage(pageData, pageId);
  }

  render() {
    const open = Boolean(this.props.showNewPageModal);

    return (
      <Dialog open={open} aria-labelledby="create-page-dialogue">
        <DialogTitle id="create-page-dialogue">
          { this.props.newPage ? "Create new page" : "Page Configuration" }
        </DialogTitle>


        <DialogContent>
          {
            this.props.newPage &&
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="page-type">Select page type</InputLabel>
              <Select
                value={this.state.page.type}
                onChange={selected =>
                  this.updatePage("type", selected.target.value)
                }
                inputProps={{
                  name: "page-type",
                  id: "page-type"
                }}
              >
                {PAGE_TYPES.map(type => (
                  <MenuItem key={type.label} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }

          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="text"
              label={"Page title"}
              value={this.state.page.title}
              onChange={e => this.updatePage("title", e.currentTarget.value)}
            />
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button color="default" onClick={this.props.onToggleNewPageModal}>
            Close
          </Button>
          <Button color="secondary" onClick={this.onSubmit}>
            { this.props.newPage ? "Create page" : "Save" }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


CreatePageModalComponent.defaultProps = {
  page: emptyPage
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CreatePageModalComponent
);
