var Title = React.createClass({
    render: function() {
        return <div>{this.props.title}</div>;
    }
});
 
React.render(<Title title="Shoppr" />, document.getElementById('nav-container'));