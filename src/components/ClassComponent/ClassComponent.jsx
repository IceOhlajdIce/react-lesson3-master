import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Результат',
    userNumber: '',
    randomNumber: Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    count: 0,
    endGame: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      count: this.state.count + 1,
    });

    this.setState((state) => {
      if (!state.userNumber) return state;

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загадонного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загадонного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
        попыток ${state.count}`,
        endGame: true,
      };
    });

    this.setState({
      userNumber: '',
    });
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleClick = (e) => {
    this.setState({
      result: 'Результат',
      userNumber: '',
      randomNumber: Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      count: 0,
      endGame: false,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber} />
          <button className={style.btn}>Угадать</button>
          {this.state.endGame &&
           <button className={style.btn}
             onClick={this.handleClick}>Сыграть ещё</button>}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
