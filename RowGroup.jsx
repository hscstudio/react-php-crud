loadRowGroup= function(){
	RowGroup = React.createClass({
	  render: function (){
		return (
		  <tbody>
		  {this.props.options.map(function (option){
			return (
			  <Row nomer={option.id} nama={option.name} kota={option.country} />
			);
		  })}
		  </tbody>
		);
	  }
	})
	return RowGroup;
}