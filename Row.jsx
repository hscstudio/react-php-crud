loadRow = function(){
	Row = React.createClass({
	  getInitialState: function(){
		return {
		  checked: false
		}
	  },
	  viewRow: function (){
		view(this.props.nomer)
	  },
	  updateRow: function (){
		update(this.props.nomer)
	  },
	  deleteRow: function (){
		if (confirm('Are You sure?')){
			$.ajax({
			  url: serviceUrl+'deleteCustomer?id='+this.props.nomer,
			  method: 'delete',
			  dataType: 'json',
			  cache: false,
			  success: function(data) {
				index()
				side()
			  }.bind(this),
			  error: function(xhr, status, err) {
				//console.error(this.props.url, status, err.toString());
			  }.bind(this)
			});
		}
	  },
	  render: function(){
		return (
			<tr>
			  <td>{this.props.nomer}</td>
			  <td>{this.props.nama}</td>
			  <td>{this.props.kota}</td>
			  <td>
			  <a className="btn btn-xs btn-default" href="#" onClick={this.viewRow} id={this.props.nomer}>view</a>&nbsp;
			  <a className="btn btn-xs btn-default" href="#" onClick={this.updateRow} id={this.props.nomer}>update</a>&nbsp;
			  <a className="btn btn-xs btn-default" href="#" onClick={this.deleteRow} id={this.props.nomer}>delete</a>
			  </td>
			</tr>
		)
	  }
	})
	
	return Row;
}