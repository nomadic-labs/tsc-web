import React from "react";
import { Link } from "gatsby";

const RecipeSummary = ({ recipe }) => {
  const content = JSON.parse(recipe.content);

  return(
    <div className="recipe-summary wow fadeIn">
      <div className="card">
        <img className="card-img-top" src={recipe.header_image.imageSrc} />
        <div className="card-body p-4">
          <div className="card-text">
            <h4>{recipe.title}</h4>
            <p>{content["header-subtitle"]["text"]}</p>
            <Link to={recipe.slug} className="btn btn-primary">Get the recipe</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeSummary