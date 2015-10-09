loadTable= function () {
	var intervalHandle = null;
	Table = React.createClass({
	  getInitialState: function() {
		return {data: []};
	  },
	  loadFromServer: function() {
			$.ajax({
			  url: serviceUrl+'customers',
			  dataType: 'json',
			  cache: false,
			  success: function(data) {
				if (this.isMounted()) {
					this.setState({data: data});
					clearInterval(intervalHandle);
				}
			  }.bind(this),
			  error: function(xhr, status, err) {
				//console.error(this.props.url, status, err.toString());
			  }.bind(this)
			});
	  },
	  componentDidMount: function() {
		//this.loadFromServer();
		intervalHandle = setInterval(this.loadFromServer, 1000);
	  },
	  goCreate: function (){
		create()
	  },
	  render: function(){  
		var row = this.state.data
		return (
			<div>
				<a className="btn btn-success" href="#" onClick={this.goCreate}>+ Create</a>
				<hr />
				<table className="table table-bordered table-striped">
				<tr>
				  <td>No</td>
				  <td>Nama</td>
				  <td>Kota</td>
				  <td>Action</td>
				</tr>
				<RowGroup options={row} />
				</table>
			</div>
		)
	  }
	})
	
	return Table;
}
