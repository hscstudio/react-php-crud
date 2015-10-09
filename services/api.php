<?php
require_once("Rest.php");
require_once("config.php");

class API extends Rest {

	public $data = "";
	private $db = NULL;
	private $mysqli = NULL;
	public function __construct(){
		parent::__construct();				// Init parent contructor
		$this->dbConnect();					// Initiate Database connection
	}
	
	/*
	 *  Connect to Database
	*/
	private function dbConnect(){
		$this->mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB);
	}
	
	/*
	 * Dynmically call the method based on the query string
	 */
	public function processApi(){
		$func = strtolower(trim(str_replace("/","",@$_REQUEST['x'])));
		if((int)method_exists($this,$func) > 0)
			$this->$func();
		else
			$this->response('',404); // If the method not exist with in this class "Page not found".
	}
	
	private function customers(){
		//sleep(1)	
		if($this->get_request_method() != "GET"){
			$this->response('',406);
		}
		$query="SELECT distinct c.id, c.name, c.email, c.address, c.city, c.state, c.zip, c.country FROM customers c order by c.id desc";
		$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

		if($r->num_rows > 0){
			$result = array();
			while($row = $r->fetch_assoc()){
				$result[] = $row;
			}
			$this->response($this->json($result), 200); // send user details
		}
		$this->response('',204);	// If no records "No Content" status
	}
	
	private function countCustomer(){	
		if($this->get_request_method() != "GET"){
			$this->response('',406);
		}
		$query="SELECT distinct c.id FROM customers c order by c.id desc";
		$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		$this->response($r->num_rows,200);	// If no records "No Content" status
	}
	
	private function customer(){	
		if($this->get_request_method() != "GET"){
			$this->response('',406);
		}
		$id = (int)$this->_request['id'];
		if($id > 0){	
			$query="SELECT distinct c.id, c.name, c.email, c.address, c.city, c.state, c.zip, c.country FROM customers c where c.id=$id";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0) {
				$result = $r->fetch_assoc();	
				$this->response($this->json($result), 200); // send user details
			}
		}
		$this->response('',204);	// If no records "No Content" status
	}
	
	private function insertCustomer(){
		if($this->get_request_method() != "POST"){
			$this->response('',406);
		}
		
		//$customer = json_decode(file_get_contents("php://input"),true);
		$customer = json_decode($_POST['customer']);
		$columns = '';
		$values = '';
		foreach($customer as $key=>$value){
			$columns .= $key.",";
			$values .= "'".$value."',";				
		}
		$query = "INSERT INTO customers(".trim($columns,',').") VALUES(".trim($values,',').")";
		if(!empty($customer)){
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			$success = [
				"status" => "Success", 
				"msg" => "Customer Created Successfully.", 
				"data" => $customer
			];
			$this->response($this->json($success),200);
		}else
			$this->response('',204);	//"No Content" status
	}
	
	private function updateCustomer(){
		if($this->get_request_method() != "POST"){
			$this->response('',406);
		}			
		
		//$customer = json_decode(file_get_contents("php://input"),true);
		$id = (int)json_decode($_POST['id']);
		$customer = json_decode($_POST['customer']);
		$columns = '';
		foreach($customer as $key=>$value){
			$columns .= $key."='".$value."',";
		}
		$query = "UPDATE customers SET ".trim($columns,',')." WHERE id=".$id;
		if(!empty($customer)){
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			$success = [
				"status" => "Success", 
				"msg" => "Customer ".$id." Updated Successfully.", 
				"data" => $customer
			];
			$this->response($this->json($success),200);
		}else
			$this->response('',204);	// "No Content" status
	}
	
	private function deleteCustomer(){
		if($this->get_request_method() != "DELETE"){
			$this->response('',406);
		}
		$id = (int)$this->_request['id'];
		if($id > 0){				
			$query="DELETE FROM customers WHERE id = $id";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			$success = [
				"status" => "Success", "msg" => "Successfully deleted one record."
			];
			$this->response($this->json($success),200);
		}else
			$this->response('',204);	// If no records "No Content" status
	}
	
	/*
	 *	Encode array into JSON
	*/
	private function json($data){
		if(is_array($data)){
			return json_encode($data);
		}
	}
}

// Initiiate Library

$api = new API;
$api->processApi();
?>