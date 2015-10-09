/*
var $_GET = {};
location.search.substr(1).split("&").forEach(function(item) {var s = item.split("="), k = s[0], v = s[1] && decodeURIComponent(s[1]); (k in $_GET) ? $_GET[k].push(v) : $_GET[k] = [v]})

var id = $_GET['id'];
*/

loadView= function(id) {
	View = React.createClass({
	  getInitialState: function() {
		return {data: []};
	  },
	  loadFromServer: function() {
		$.ajax({
		  url: serviceUrl+'customer?id='+id,
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
	  goIndex: function (){
		index()
	  },
	  render: function(){  
		var row = this.state.data
		return (
		<div>
		<a className="btn btn-default" href="#" onClick={this.goIndex}>&laquo; Index</a>
		<hr />
		  <table className="table table-bordered table-striped">
			<tr>
			  <td>No</td>
			  <td>{row.id}</td>
			</tr>  
			<tr>
			  <td>Nama</td>
			  <td>{row.name}</td>
			</tr>  
			<tr>
			  <td>Email</td>
			  <td>{row.email}</td>
			</tr>
			<tr>
			  <td>Address</td>
			  <td>{row.address}</td>
			</tr>
			<tr>
			  <td>State</td>
			  <td>{row.state}</td>
			</tr>
			<tr>
			  <td>Zip</td>
			  <td>{row.zip}</td>
			</tr>
			<tr>
			  <td>Kota</td>
			  <td>{row.city}</td>
			</tr>
		  </table>
		 </div>
		)
	  }
	})
	return View;
}