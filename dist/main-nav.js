var Title;

Title = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "main-nav"
    }, React.createElement("h1", null, this.props.title));
  }
});

React.render(React.createElement(Title, {
  "title": "Shoppr"
}), document.getElementById('nav-container'));
