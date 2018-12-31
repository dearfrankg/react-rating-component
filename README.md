# react-rating-component

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

> Tiny **React.js** component for ratings. Defaults to a star icon but it is configurable.

## Install

        npm install @cogent-labs/react-rating-component

## Demo

![code](https://i.imgur.com/eQ5zCca.png)

## Props

```js props
<RatingComponent
    name={String} /* name of the radio input, it is required */
    value={Number} /* number of selected icon (`0` - none, `1` - first) */
    starCount={Number} /* number of icons in rating, default `5` */
    onStarClick={Function(nextValue, prevValue, name)} /* on icon click handler */
    onStarHover={Function(nextValue, prevValue, name)} /* on icon hover handler */
    onStarHoverOut={Function(nextValue, prevValue, name)} /* on icon hover out handler */
    renderStarIcon={Function(nextValue, prevValue, name)} /* it should return string or react component */
    renderStarIconHalf={Function(nextValue, prevValue, name)} /* it should return string or react component */
    starColor={String} /* color of selected icons, default `#ffb400` */
    emptyStarColor={String} /* color of non-selected icons, default `#333` */
    editing={Boolean} /* is component available for editing, default `true` */
/>
```

## Example

```js editable rating
import React from 'react';
import ReactDOM from 'react-dom';
import RatingComponent from 'react-rating-component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <h2>Rating from state: {rating}</h2>
        <RatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

<hr/>

**MIT Licensed**

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/@cogent-labs/react-rating-component.svg?style=flat-square
[npm]: https://www.npmjs.org/package/@cogent-labs/react-rating-component
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
