import React, { Component } from "react";
import axios from "axios";

const POST_LIMIT = 3;

class EmbeddedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "<p>...</p>",
    };
  }

  componentDidMount() {
    const url = `https://api.instagram.com/oembed/?url=${this.props.postUrl}&omitscript=true`
    axios.get(url).then(res => {
      this.setState({ html: res.data.html })
    })
  }

  componentDidUpdate(prevProps) {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }

  render() {
    return(
      <div className="my-2 flex-grow">
        <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </div>
    )
  }
}


export default class InstagramFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      errors: []
    };
  }

  componentDidMount() {
    this.populateFeed();
  }

  populateFeed = () => {
    const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.GATSBY_INSTAGRAM_TOKEN}`
    axios.get(url).then(res => {
      console.log(res)
      if (res["status"] != 200) {
        console.log(res["data"]["meta"]["error_message"])
        return this.setState({ errors: "There are no recent posts available." })
      }

      this.setState({ items: res["data"]["data"] })
    }).catch(err => {
      console.log(err)
      return this.setState({ errors: "There are no recent posts available." })
    })
  }


  render() {
    const latestPosts = this.state.items.slice(0,POST_LIMIT);

    if (this.state.errors.length > 0) {
      return(
        <div className="py-2">
          { this.state.errors }
        </div>
      )
    };

    return (
      <div className="instagram-feed">
        {
          latestPosts.map(post => {
            return(
              <EmbeddedPost postUrl={post.link} key={post.id} />
            )
          })
        }
      </div>
    );
  }
}
