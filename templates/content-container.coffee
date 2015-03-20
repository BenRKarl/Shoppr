GridContainer = React.createClass({
  render: ->
    <div className="grid-container">
      <h2>{@props.title}</h2>
      <MainTable data={@state.data} onListSubmit={this.handleListSubmit}></MainTable>
      <ListForm onListSubmit={this.handleListSubmit} ></ListForm>
    </div>

  getInitialState: ->
    data: []

  componentDidMount: ->
    @loadGroceryData()
    setInterval @loadGroceryData, 2000

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

  handleListSubmit: (data) ->
    $.ajax
      url: @props.url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: ((data) ->
        this.setState(data)
        return
      ).bind(this)
      error: ((xhr, status, err) ->
        console.error @props.url, status, err.toString()
      ).bind(this)
})

MainTable = React.createClass 
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


TableRow = React.createClass({
  render: ->
    <tr className="table-row">
      <td>{@props.item}</td>
      <td>{@props.quantity}</td>
      <td>{if (@props.purchased == false || @props.purchased == 'false') then 'Nope...' else 'Yep!'}</td>
    </tr>
})

ListForm = React.createClass({
  handleSubmit: (e) ->
    e.preventDefault()
    item      = React.findDOMNode(this.refs.item).value.trim()
    quantity  = React.findDOMNode(this.refs.quantity).value.trim()
    purchased = React.findDOMNode(this.refs.purchased).checked

    if (!item || !quantity) then return else
      this.props.onListSubmit({item: item, quantity: quantity, purchased: purchased});
      React.findDOMNode(this.refs.item).value = ''
      React.findDOMNode(this.refs.quantity).value = ''
      
      React.findDOMNode(this.refs.item).placeholder = 'next item...'
      React.findDOMNode(this.refs.quantity).placeholder = 'quantity...'
      React.findDOMNode(this.refs.purchased).checked = false
      return;

  render: ->
    <form className="list-form" onSubmit={ this.handleSubmit }>
      <input type="text" placeholder="Item..." ref="item" />
      <input type="text" placeholder="How many?" ref="quantity" />
      <input type="checkbox" ref="purchased" />
      <input type="submit" value="Save" />
    </form>
})

React.render(<GridContainer title="Shopping List!" url="groceries.json" />, document.getElementById('content-container'));