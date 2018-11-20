import React from "react";
import PropTypes from "prop-types";
import "./index.css";

export default function GameOver(props) {
  return (
    <div className="game-over animated bounceIn">
      <header>
        <h3>Game Over</h3>
      </header>
      <p>Nice job!</p>
      <button onClick={props.handleResetGame}>Play Again</button>
    </div>
  );
}

GameOver.propTypes = {
  handleResetGame: PropTypes.func.isRequired
};
