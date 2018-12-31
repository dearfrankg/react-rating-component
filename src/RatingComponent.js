import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const config = {
  defaultStarCount: 5,
  gold: "#ffb400",
  charcoal: "#333"
};

class RatingComponent extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    editing: PropTypes.bool,
    starCount: PropTypes.number,
    starColor: PropTypes.string,
    onStarClick: PropTypes.func,
    onStarHover: PropTypes.func,
    onStarHoverOut: PropTypes.func,
    renderStarIcon: PropTypes.func,
    renderStarIconHalf: PropTypes.func
  };

  static defaultProps = {
    starCount: config.defaultStarCount,
    editing: true,
    starColor: config.gold,
    emptyStarColor: config.charcoal
  };

  constructor(props) {
    super();
    const { value } = props;
    this.state = {
      value
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { value } = props;
    if (value != null && value !== state.value) {
      return { value };
    }
    return null;
  }

  onChange(inputValue) {
    const { editing, value } = this.props;
    if (!editing) return;
    if (value != null) return;

    this.setState({ value: inputValue });
  }

  onStarClick(index, value, name, e) {
    e.stopPropagation();
    const { onStarClick, editing } = this.props;
    if (!editing) return;

    onStarClick && onStarClick(index, value, name, e);
  }

  onStarHover(index, value, name, e) {
    e.stopPropagation();
    const { onStarHover, editing } = this.props;
    if (!editing) return;

    onStarHover && onStarHover(index, value, name, e);
  }

  onStarHoverOut(index, value, name, e) {
    e.stopPropagation();
    const { onStarHoverOut, editing } = this.props;
    if (!editing) return;

    onStarHoverOut && onStarHoverOut(index, value, name, e);
  }

  renderStars() {
    const { name, starCount } = this.props;
    const { value } = this.state;
    let stars = [];

    const radioStyles = {
      display: "none",
      position: "absolute",
      marginLeft: -9999
    };

    const starStyles = (i, value) => {
      const { starColor, emptyStarColor, editing } = this.props;
      return {
        float: "right",
        cursor: editing ? "pointer" : "default",
        color: value >= i ? starColor : emptyStarColor
      };
    };

    const labelClass = i =>
      "dv-star-rating-star " +
      (value >= i ? "dv-star-rating-full-star" : "dv-star-rating-empty-star");

    for (let i = starCount; i > 0; i--) {
      const id = `${name}_${i}`;
      const starInput = (
        <input
          key={`input_${id}`}
          id={id}
          style={radioStyles}
          className="dv-star-rating-input"
          type="radio"
          name={name}
          value={i}
          checked={value === i}
          onChange={this.onChange.bind(this, i, name)}
        />
      );
      const starLabel = (
        <label
          key={`label_${id}`}
          htmlFor={id}
          style={starStyles(i, value)}
          className={labelClass(i)}
          onClick={e => this.onStarClick(i, value, name, e)}
          onMouseOver={e => this.onStarHover(i, value, name, e)}
          onMouseLeave={e => this.onStarHoverOut(i, value, name, e)}
        >
          {this.renderIcon(i, value, name, id)}
        </label>
      );

      stars.push(starInput);
      stars.push(starLabel);
    }

    return stars.length ? stars : null;
  }

  renderIcon(index, value, name, id) {
    const { renderStarIcon, renderStarIconHalf } = this.props;
    const isRenderingHalfStar =
      typeof renderStarIconHalf === "function" && Math.ceil(value) === index && value % 1 !== 0;
    const isRenderingStar = typeof renderStarIcon === "function";

    const renderBlackStar = () => (
      <i key={`icon_${id}`} style={{ fontStyle: "normal" }}>
        &#9733;
      </i>
    );

    return isRenderingHalfStar
      ? renderStarIconHalf(index, value, name, id)
      : isRenderingStar
      ? renderStarIcon(index, value, name, id)
      : renderBlackStar();
  }

  render() {
    const { editing, className } = this.props;
    const styles = {
      display: "inline-block",
      position: "relative"
    };
    const classes = cx(
      "dv-star-rating",
      {
        "dv-star-rating-non-editable": !editing
      },
      className
    );

    return (
      <div style={styles} className={classes}>
        {this.renderStars()}
      </div>
    );
  }
}

export default RatingComponent;
