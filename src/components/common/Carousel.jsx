import React from "react";
import Slider from "react-slick"

import Button from "@material-ui/core/Button"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DEFAULT_SLIDES_TO_SHOW = 3;

class EditableCarousel extends React.Component {
  onSaveItem = itemId => item => {
    const newCollection = {
      ...this.props.collection,
      [itemId]: item
    }

    console.log('newCollection', newCollection)

    this.props.onSave(newCollection)
  }

  onDeleteItem = itemId => () => {
    this.props.onDeleteItem(itemId)
  }

  onAddItem = () => {
    this.props.onAddItem(this.props.defaultContent)
  }


  render() {
    const { collection, SlideComponent, isEditingPage, options, classes } = this.props;

    const defaultOptions = {
      infinite: false,
      slidesToShow: DEFAULT_SLIDES_TO_SHOW,
      slidesToScroll: options.slidesToShow || 1,
      draggable: !isEditingPage,
      swipe: !isEditingPage,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        }
      ]
    }

    const collectionKeys = Object.keys(collection);

    if (!isEditingPage && (collectionKeys.length < 1)) {
      return <p>Coming soon!</p>
    }

    const carouselOptions = { ...defaultOptions, ...options };

    return (
      <div className={`carousel ml-20 mr-20 ${classes ? classes : ""}`}>
        <Slider { ...carouselOptions }>
          {collectionKeys.map(key => {
            const content = collection[key];
            return(
              <SlideComponent
                key={`slide-${key}`}
                content={content}
                onSave={this.onSaveItem(key)}
                onDelete={this.onDeleteItem(key)}
              />
            )
          })}
        </Slider>
        {
          isEditingPage &&
          <div className="row mt-4">
            <div className="col-12">
              <Button onClick={this.onAddItem}>Add item</Button>
            </div>
          </div>
        }
      </div>
    );
  }
}


EditableCarousel.defaultProps = {
  collection: {},
  isEditingPage: false,
  options: {}
}

export default EditableCarousel;


