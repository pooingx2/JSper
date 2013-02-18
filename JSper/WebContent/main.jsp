<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- ace -->
<link rel="stylesheet" href="CSS/layout-default.css" type="text/css" media="screen" />
<link rel="stylesheet" href="CSS/layout.css" type="text/css" media="screen" />
<link rel="stylesheet" href="CSS/custom.css" type="text/css" media="screen" />

<!-- jquert.layout -->
<script type="text/javascript" src="JS/jquery-latest.js"></script>
<script type="text/javascript" src="JS/jquery-ui-latest.js"></script>
<script type="text/javascript" src="JS/jquery.layout-latest.js"></script>
</head>
 <body id="allpage">
	<div class="outer-center">
 		<div id="holder"></div>
 		<select class="drawSelector" onChange = "javascript:selectDraw(this)">
			  <option value="Colorful">Colorful</option>
			  <option value="Simple">Simple</option>
			  <option value="Divide">Divide</option> 
		</select>
	</div>

	<div class="outer-west">
	<div class="textCode"></div>
		<div id="editor">

/*this is test foo*/
function foo(items) {
	/*this is test test*/
	function test(){}
	/*this is test test1*/
	function test1(){
		function test2(){}
		/*this is ANONYMOUS function*/
		(function() {})()
	}
	var x = "All this is syntax highlighted"; 
	var k = 0;
}
		/*this is test foo*/
function fo3o(items) {
    /*this is test test*/
	function test(){}
	/*this is test test1*/
	function test1(){
		function test2(){}
		/*this is ANONYMOUS function*/
		(function() {})()
	}
	var x = "All this is syntax highlighted"; 
	var k = 0;
}
		
		</div>
		<div class="zoomBG">
			<div><a href="#" onClick="setSize(3); return false;">+</a></div>
 			<div><a href="#" onClick="setSize(4); return false;">-</a></div>
		</div>
		<select class="skinSelector" onChange = "javascript:selectEvent(this)">
			  <option value="ambiance">Ambiance</option>
			  <option value="chrome" selected>Chrome</option>
			  <option value="clouds">Clouds</option>
			  <option value="cobalt">Cobalt</option>
			  <option value="dawn">Dawn</option>
			  <option value="eclipse">Eclipse</option>
			  <option value="monokai">Monokai</option>
			  <option value="textmate">Textmate</option>
		</select>
	</div>
<!-- <div class="outer-east">Outer East</div> -->

<!-- <div class="ui-layout-north">Outer North</div> -->
	<div class="ui-layout-south">
		<a class="button" id="sendForm" href="#"> 
		<img src="./img/btnRun.png" style="position: absolute; left: 103px; width: 20px; height: 20px; margin-top: 20px" />
		Run
		</a>
	</div>
</body>


<!-- ace -->

<script type="text/javascript" src="JS/ace/ace.js" charset="utf-8"></script>
<script type="text/javascript" src="JS/ace/ace-controll.js" charset="utf-8"></script>
<script src="JS/raphael-min.js"></script>
<script src="JS/graffle.js"></script>
<script type="text/javascript">
	$("#sendForm").click(function userViewSub(){
		  var k = editor.getValue();
		  $.ajax({   
			   type: "POST",  
			   url: "main",   
			   data: "param="+k,
			   success: function(response) {
				   test_gender = [];
				   console.log('succeess');
				   test_ajax = jQuery.parseJSON(response);
				   for(var i=0,length = test_ajax.fList.length; i< length ; i++){
				       test_gender.push([test_ajax.fList[i].depth,test_ajax.fList[i].name,test_ajax.fList[i].parent,test_ajax.fList[i].maxLength,test_ajax.fList[i].lines,[0,0],test_ajax.fList[i].type]);					   
				   }
				   darw_raphael(test_gender);
			   },
			   error:function() {
				   console.log('error');
			   }
		  });
	});

$(document).ready(function () {

	// OUTER-LAYOUT
	$('body').layout({
		center__paneSelector:	".outer-center"
	,	west__paneSelector:		".outer-west"
	,	west__size:				350
	,	south__size:			80
	,   south__spacing_open:	10
	//,	south__maxSize:			80
	//,	south__minSize:			80
	,   south__fxName:           "none"
	,	south__togglerLength_open:  0
	//,	south__initClosed: true
	,	south__closable : false
	, 	south__resizable : false
	,	spacing_closed:			20 // ALL panes
	,	spacing_open:			10  // ALL panes
	});

});

var setSize;
var selectEvent;
var selectDraw;
window.onload = function(){
	var codeBtn = document.getElementById('editor');
		codeBtn.style.fontSize='12px';
	setSize = function( n ) {
		
		switch (n) {
			case 1:
				scaleLarge();
				break;
			case 2:
				scaleSmall();
				break;
			case 3:
				var t  = parseFloat(codeBtn.style.fontSize);
				if(t<=16) t += 2; codeBtn.style.fontSize= t + "px" ;
				break;
			case 4:
				var t  = parseFloat(codeBtn.style.fontSize)
				if(t>10) t -= 2; codeBtn.style.fontSize= t + "px" ;
			default:
				break;
		}
			
	}
	
	selectEvent = function (selectObj) {		
		editor.setTheme("ace/theme/" + selectObj.value);
	}
	selectDraw = function (selectValue) {
		changeColor(""+selectValue.value);
	}
}



</script>
</html>
