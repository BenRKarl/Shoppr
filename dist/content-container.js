var GridContainer, MainTable, TableRow;

GridContainer = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "grid-container"
    }, React.createElement("h2", null, this.props.title), React.createElement(MainTable, {
      "data": this.state.data
    }));
  },
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    return this.loadGroceryData();
  },
  loadGroceryData: function() {
    return $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (function(data) {
        this.setState({
          data: data
        });
      }).bind(this),
      error: (function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  }
});

MainTable = React.createClass({
  render: function() {
    var listNodes;
    listNodes = this.props.data.map(function(list) {
      return React.createElement(TableRow, {
        "item": list.item,
        "quantity": list.quantity,
        "purchased": list.purchased
      });
    });
    return React.createElement("table", {
      "className": "main-table"
    }, React.createElement("tr", {
      "className": "table-head"
    }, React.createElement("th", null, "Item"), React.createElement("th", null, "Quantity"), React.createElement("th", null, "Purchased?")), listNodes);
  }
});

TableRow = React.createClass({
  render: function() {
    return React.createElement("tr", {
      "className": "table-row"
    }, React.createElement("td", null, this.props.item), React.createElement("td", null, this.props.quantity), React.createElement("td", null, (this.props.purchased ? 'Yep!' : 'Nope...')));
  }
});

React.render(React.createElement(GridContainer, {
  "title": "Shopping List!",
  "url": "groceries.json"
}), document.getElementById('content-container'));
