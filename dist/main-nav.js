var Title = React.createClass({displayName: "Title",
    render: function() {
        return React.createElement("div", null, this.props.title);
    }
});
 
React.render(React.createElement(Title, {title: "Shoppr"}), document.getElementById('nav-container'));