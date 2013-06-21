<?php
/*author:Bujji*/
require_once("lib/config.php");
require_once("lib/Rest.inc.php");
class Bujji extends REST //create a class for make connection
{   
	var $db="";
	public function __construct()
	{
		parent::__construct();				// Init parent contructor
		$this->dbConnect();
						
	}
	//to connect database
	private function dbConnect()
	{
			$this->db = mysql_connect(DB_SERVER,DB_USER,DB_PASSWORD);
			if($this->db)
				mysql_select_db(DB,$this->db);
				
	}
	//this functions executes to verify the request type
	public function processApi()
	{
			$func=isset($_REQUEST['action'])?$_REQUEST['action']:'index';												  
			
			if((int)method_exists($this,$func) > 0)
				$this->$func();				
			else
				$this->response('',404);				
				// If the method not exist with in this class, response would be "Page not found".
	}
	function getcomment()
	{   $comment_array=array();
	    $comment_data_query=mysql_query("select * from comment")or die(mysql_error());
		while($row1=mysql_fetch_object($comment_data_query))
		{
			$comment_array[]= $row1;
		}
		
		$rowscount=mysql_num_rows($comment_data_query);
		if($rowscount>0)
		{   	
			
			$this->response(json_encode($comment_array),"200");
			return;
		}
		else
		{
			 $this->response("",204);
			 return;
		}
		
	}
	function getpost()
	{   $post_array=array();
	    $post_data_query=mysql_query("select * from post")or die(mysql_error());
		while($row1=mysql_fetch_object($post_data_query))
		{
			$post_array[]= $row1;
		}
		
		$rowscount=mysql_num_rows($post_data_query);
		if($rowscount>0)
		{   	
			
			$this->response(json_encode($post_array),"200");
			return;
		}
		else
		{
			 $this->response("",204);
			 return;
		}
		
	}
	function savecomment()
	{   
	    if(isset($_POST['comment'])  )
       {
		/*$decode=json_decode($_POST['comment']);
		$comment=$decode->comment;
		$postid=$decode->postid;*/
		$comment=$_POST['comment'];
		
	    $comment_array=array();
	    $comment_data_query=mysql_query("insert into comment(postid,comment) values(1,'$comment')")or die(mysql_error());
		
		if($comment_data_query)
		{
			$this->response(1,"200");
			return;
		}else
		{
			$this->response(0,"200");
			return;
		}
		
	 }
	 else
	 {
		  $this->response("",405);
			 return;
	 }
	}
	function deletecomment()
	{   
	    if(isset($_POST['commentid']) )
       {
		
		$commentid=$_POST['commentid'];
		 
	    
	    $comment_data_query=mysql_query("delete from comment where id='$commentid'")or die(mysql_error());
		
		if($comment_data_query)
		{
			$this->response(1,"200");
			return;
		}else
		{
			$this->response(0,"200");
			return;
		}
		
	 }
	 else
	 {
		  $this->response("",405);
			 return;
	 }
	}
	function updatepost()
	{   
	    if(isset($_POST['postdata']) )
       {
		
		$post=$_POST['postdata'];
		 
	    
	    $comment_data_query=mysql_query("update post set post='$post' where id=1")or die(mysql_error());
		
		if($comment_data_query)
		{
			$this->response(1,"200");
			return;
		}else
		{
			$this->response(0,"200");
			return;
		}
		
	 }
	 else
	 {
		  $this->response("",405);
			 return;
	 }
	}
			
	public function __destruct()
	{
		mysql_close($this->db);
	}
}
$api = new Bujji;
$api->processApi();

?>
