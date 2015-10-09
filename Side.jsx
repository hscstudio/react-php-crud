loadSide= function () {
	Side = React.createClass({
	  getInitialState: function() {
		return {data: []};
	  },
	  loadFromServer: function() {
			$.ajax({
			  url: serviceUrl+'countCustomer',
			  dataType: 'json',
			  cache: false,
			  success: function(data) {
				this.setState({data: data});
			  }.bind(this),
			  error: function(xhr, status, err) {
				//console.error(this.props.url, status, err.toString());
			  }.bind(this)
			});
	  },
	  componentDidMount: function() {
		this.loadFromServer();
		//setInterval(this.loadFromServer, 1000);
	  },
	  render: function(){  
		var row = this.state.data
		return (
			<div>
				Total : {row} record(s)
			</div>
		)
	  }
	})
	
	return Side;
}
