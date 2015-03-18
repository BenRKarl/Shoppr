var GridContainer, MainTable, TableRow;

GridContainer = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "grid-container"
    }, React.createElement("h2", null, this.props.title), React.createElement(MainTable, null));
  }
});

MainTable = React.createClass({
  render: function() {
    return React.createElement("table", {
      "className": "main-table"
    }, React.createElement("tr", {
      "className": "table-head"
    }, React.createElement("th", null, "Item"), React.createElement("th", null, "Quantity"), React.createElement("th", null, "Purchased?")), React.createElement(TableRow, {
      "item": "Apple",
      "quantity": "3",
      "purchased": "false"
    }));
  }
});

TableRow = React.createClass({
  render: function() {
    return React.createElement("tr", {
      "className": "table-row"
    }, React.createElement("td", null, this.props.item), React.createElement("td", null, this.props.quantity), React.createElement("td", null, this.props.purchased));
  }
});

React.render(React.createElement(GridContainer, {
  "title": "Shopping List!"
}), document.getElementById('content-container'));
