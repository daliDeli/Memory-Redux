import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/game";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Toolbar from "../../components/Toolbar";
import GameOver from "../../components/GameOver";
import id from "uuid/v1";
import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameOver: false,
      startTimer: false,
      resetTimer: false,
      cardAnimation: true,
      difficulty: "easy",
      mode: "double",
      background: "bg-green",
      flippedCards: []
    };

    // this.handleResetGame = this.handleResetGame.bind(this);
    // this.handleChooseDifficulty = this.handleChooseDifficulty.bind(this);
    // this.handleChooseGameMode = this.handleChooseGameMode.bind(this);
    // this.handleChooseBackground = this.handleChooseBackground.bind(this);
    // this.handleRemoveCardAnimation = this.handleRemoveCardAnimation.bind(this);
  }

  componentDidMount() {
    this.props.fetchGame(this.state.mode);
  }

  handleCardFlip = (matched, cardIndex, card) => {
    if (matched) {
      return;
    }
    const flippedCard = {
      index: cardIndex,
      card: card
    };

    let flippedCards;
    if (this.state.flippedCards.length) {
      const lastFlippedCards =
        this.state.mode === "double"
          ? this.state.flippedCards.slice(-1)
          : this.state.flippedCards.slice(-2);

      flippedCards = [...lastFlippedCards, flippedCard];
    } else {
      flippedCards = [flippedCard];
    }

    this.setState(
      {
        flippedCards: flippedCards,
        resetTimer: false
      },
      () => {
        if (!this.state.startTimer) {
          this.setState({ startTimer: true });
        }

        const maxFlipAllowed = this.state.mode === "double" ? 2 : 3;
        if (this.state.flippedCards.length === maxFlipAllowed) {
          this.handleCardMatchCheck();
        }
      }
    );
  };

  handleCardMatchCheck() {
    setTimeout(() => {
      const cards = this.state.flippedCards.map(card => card.card);

      this.setState(
        {
          flippedCards: []
        },
        async () => {
          const allCardsMatch = cards.every((val, i, arr) => val === arr[0]);

          if (allCardsMatch) {
            await this.props.addMatch(cards[0]);

            this.handleGameEndCheck();
          }
        }
      );
    }, 100);
  }

  handleGameEndCheck() {
    const totalMatchesNeeded =
      this.state.mode === "triple" || this.state.difficulty === "hard" ? 8 : 4;

    const gameEnded =
      this.props.game.currentGame.matches.length === totalMatchesNeeded;

    if (gameEnded) {
      this.setState({
        gameOver: true,
        startTimer: false
      });
    }
  }

  handleResetGame = () => {
    this.props.resetGame();
    this.setState({
      gameOver: false,
      startTimer: false,
      resetTimer: true,
      cardAnimation: true,
      flippedCards: []
    });
  };

  handleChooseDifficulty = event => {
    this.handleResetGame();
    this.setState({ difficulty: event.target.value });
  };

  handleChooseGameMode = event => {
    this.setState(
      {
        mode: event.target.value,
        difficulty: "easy"
      },
      () => {
        this.handleResetGame();
        this.props.fetchGame(this.state.mode);
      }
    );
  };

  handleChooseBackground = event => {
    this.setState({ background: event.target.value });
  };

  handleRemoveCardAnimation = () => {
    if (this.state.cardAnimation) {
      this.setState({ cardAnimation: false });
    }
  };

  render() {
    const game = this.props.game.mode
      ? this.props.game.mode[this.state.mode][this.state.difficulty]
      : [];

    const gameContainerCss = ["game", this.state.background];
    if (this.state.gameOver) {
      gameContainerCss.push("game-ended");
    }

    return (
      <div className={gameContainerCss.join(" ")}>
        <Header />

        <div className={`cards ${this.state.difficulty} ${this.state.mode}`}>
          {this.state.gameOver ? (
            <GameOver handleResetGame={this.handleResetGame} />
          ) : (
            game.map((card, index) => (
              <Card
                key={id()}
                cardIndex={index}
                card={card}
                flippedCards={this.state.flippedCards}
                matchedCards={this.props.game.currentGame.matches}
                cardAnimation={this.state.cardAnimation}
                handleCardFlip={this.handleCardFlip}
                handleRemoveCardAnimation={this.handleRemoveCardAnimation}
              />
            ))
          )}
        </div>

        <Toolbar
          difficulty={this.state.difficulty}
          mode={this.state.mode}
          background={this.state.background}
          startTimer={this.state.startTimer}
          resetTimer={this.state.resetTimer}
          handleChooseDifficulty={this.handleChooseDifficulty}
          handleChooseGameMode={this.handleChooseGameMode}
          handleChooseBackground={this.handleChooseBackground}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.game
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGame: mode => dispatch(actions.fetchGame(mode)),
    resetGame: () => dispatch(actions.resetGame()),
    addMatch: card => dispatch(actions.addMatch(card))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
