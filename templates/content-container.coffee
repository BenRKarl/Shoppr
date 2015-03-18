GridContainer = React.createClass({
  render: ->
    <div className="grid-container">
      <h2>{@props.title}</h2>
      <MainTable data={@state.data}></MainTable>
    </div>

  getInitialState: ->
    data: []

  componentDidMount: ->
    @loadGroceryData()

  loadGroceryData: ->
    $.ajax
      url: @props.url
      dataType: 'json'
      success: ((data) ->
        @setState data: data
        return
      ).bind(this)
      error: ((xhr, status, err) ->
        console.error @props.url, status, err.toString()
        return
      ).bind(this)
})

MainTable = React.createClass({
  render: ->
    listNodes = @props.data.map( (list) ->
      <TableRow item={list.item} quantity={list.quantity} purchased={list.purchased}></TableRow>
    )
    <table className="main-table">
      <tr className="table-head">
        <th>Item</th>
        <th>Quantity</th>
        <th>Purchased?</th>
      </tr>
      { listNodes }
    </table>
})

TableRow = React.createClass({
  render: ->
    <tr className="table-row">
      <td>{@props.item}</td>
      <td>{@props.quantity}</td>
      <td>{if @props.purchased then 'Yep!' else 'Nope...'}</td>
    </tr>
})

React.render(<GridContainer title="Shopping List!" url="groceries.json" />, document.getElementById('content-container'));