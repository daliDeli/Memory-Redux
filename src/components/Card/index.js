import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

export default class Card extends Component {
  componentWillUnmount() {
    if (this.props.cardAnimation) {
      this.props.handleRemoveCardAnimation();
    }
  }

  render() {
    const matched = this.props.matchedCards.includes(this.props.card);

    const flipped =
      this.props.flippedCards.filter(
        card => card.index === this.props.cardIndex
      ).length || false;

    const cssClasses = ["card"];

    if (matched) {
      cssClasses.push("matched");
    }

    if (flipped) {
      cssClasses.push("flipped");
    }

    if (this.props.cardAnimation) {
      cssClasses.push("animated", "bounceIn");
    }

    return (
      <article
        onClick={() =>
          this.props.handleCardFlip(
            matched,
            this.props.cardIndex,
            this.props.card
          )
        }
        className={cssClasses.join(" ")}
      >
        {flipped && <i>{this.props.card}</i>}
      </article>
    );
  }
}

Card.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  card: PropTypes.string.isRequired,
  flippedCards: PropTypes.array.isRequired,
  matchedCards: PropTypes.array.isRequired,
  handleCardFlip: PropTypes.func.isRequired
};
