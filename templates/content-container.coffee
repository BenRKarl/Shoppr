GridContainer = React.createClass({
  render: ->
    <div className="grid-container">
      <h2>{this.props.title}</h2>
      <MainTable></MainTable>
    </div>
})

MainTable = React.createClass({
  render: ->
    <table className="main-table">
      <tr className="table-head">
        <th>Item</th>
        <th>Quantity</th>
        <th>Purchased?</th>
      </tr>
      <TableRow item="Apple" quantity="3" purchased="false"></TableRow>
    </table>
})

TableRow = React.createClass({
  render: ->
    <tr className="table-row">
      <td>{this.props.item}</td>
      <td>{this.props.quantity}</td>
      <td>{this.props.purchased}</td>
    </tr>
})

React.render(<GridContainer title="Shopping List!" />, document.getElementById('content-container'));