import React from "react";
import PropTypes from "prop-types";
import Timer from "../../components/Timer";
import id from "uuid/v1";
import "./index.css";

export default function Toolbar(props) {
  const dropdowns = {
    difficulty: {
      handler: props.handleChooseDifficulty,
      selected: props.difficulty,
      disabled: props.mode === "triple",
      label: "Difficulty",
      options: [
        {
          name: "Easy",
          value: "easy"
        },
        {
          name: "Hard",
          value: "hard"
        }
      ]
    },
    mode: {
      handler: props.handleChooseGameMode,
      selected: props.mode,
      disabled: false,
      label: "Game Mode",
      options: [
        {
          name: "Match Two",
          value: "double"
        },
        {
          name: "Match Three",
          value: "triple"
        }
      ]
    },
    background: {
      handler: props.handleChooseBackground,
      selected: props.background,
      disabled: false,
      label: "Background",
      options: [
        {
          name: "Green",
          value: "bg-green"
        },
        {
          name: "Blue",
          value: "bg-blue"
        },
        {
          name: "Orange",
          value: "bg-orange"
        }
      ]
    }
  };

  return (
    <div className="toolbar">
      {Object.keys(dropdowns).map(key => (
        <select
          key={id()}
          onChange={dropdowns[key].handler}
          defaultValue="-1"
          disabled={dropdowns[key].disabled}
        >
          <option value="-1" disabled hidden>
            {dropdowns[key].label}
          </option>
          {dropdowns[key].options.map(option => (
            <option key={id()} value={option.value}>
              {dropdowns[key].selected === option.value && "-"} {option.name}
            </option>
          ))}
        </select>
      ))}

      <Timer startTimer={props.startTimer} resetTimer={props.resetTimer} />
    </div>
  );
}

Toolbar.propTypes = {
  difficulty: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  startTimer: PropTypes.bool.isRequired,
  resetTimer: PropTypes.bool.isRequired,
  handleChooseDifficulty: PropTypes.func.isRequired,
  handleChooseGameMode: PropTypes.func.isRequired,
  handleChooseBackground: PropTypes.func.isRequired
};
