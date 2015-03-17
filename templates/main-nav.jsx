var Title = React.createClass({
    render: function() {
        return  <div className="main-nav">
                  <h1>{this.props.title}</h1>
                </div>;
    }
});
 
React.render(<Title title="Shoppr" />, document.getElementById('nav-container'));