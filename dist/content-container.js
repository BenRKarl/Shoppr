var GridContainer, ListForm, MainTable, TableRow;

GridContainer = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "grid-container"
    }, React.createElement("h2", null, this.props.title), React.createElement(MainTable, {
      "data": this.state.data,
      "onListSubmit": this.handleListSubmit
    }), React.createElement(ListForm, {
      "onListSubmit": this.handleListSubmit
    }));
  },
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    this.loadGroceryData();
    return setInterval(this.loadGroceryData, 2000);
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
  },
  handleListSubmit: function(data) {
    return $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: (function(data) {
        this.setState(data);
      }).bind(this),
      error: (function(xhr, status, err) {
        return console.error(this.props.url, status, err.toString());
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
    }, React.createElement("td", null, this.props.item), React.createElement("td", null, this.props.quantity), React.createElement("td", null, (this.props.purchased === false || this.props.purchased === 'false' ? 'Nope...' : 'Yep!')));
  }
});

ListForm = React.createClass({
  handleSubmit: function(e) {
    var item, purchased, quantity;
    e.preventDefault();
    item = React.findDOMNode(this.refs.item).value.trim();
    quantity = React.findDOMNode(this.refs.quantity).value.trim();
    purchased = React.findDOMNode(this.refs.purchased).checked;
    if (!item || !quantity) {

    } else {
      this.props.onListSubmit({
        item: item,
        quantity: quantity,
        purchased: purchased
      });
      React.findDOMNode(this.refs.item).value = '';
      React.findDOMNode(this.refs.quantity).value = '';
      React.findDOMNode(this.refs.item).placeholder = 'next item...';
      React.findDOMNode(this.refs.quantity).placeholder = 'quantity...';
      React.findDOMNode(this.refs.purchased).checked = false;
    }
  },
  render: function() {
    return React.createElement("form", {
      "className": "list-form",
      "onSubmit": this.handleSubmit
    }, React.createElement("input", {
      "type": "text",
      "placeholder": "Item...",
      "ref": "item"
    }), React.createElement("input", {
      "type": "text",
      "placeholder": "How many?",
      "ref": "quantity"
    }), React.createElement("input", {
      "type": "checkbox",
      "ref": "purchased"
    }), React.createElement("input", {
      "type": "submit",
      "value": "Save"
    }));
  }
});

React.render(React.createElement(GridContainer, {
  "title": "Shopping List!",
  "url": "groceries.json"
}), document.getElementById('content-container'));
