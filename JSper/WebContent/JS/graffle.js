//	var make_list_node = 
//		[
//		 [0,"bfunction","0",17,["this is caption1."],[10,2,"var a = 3","function b"]], 
//		 [1,"cfun","bfunction",17,["this is caption2."," this is caption2."," this is caption2."," this is caption2."],[10,4,"var a","var b","function a","function b"]], 
//		 [1,"dfun","bfunction",17,["this is caption3"],[10,3,"var m = 3","var k = 3","function m"]],
//		 [0,"afunctionisvery","0",17,["this is caption2."," this is caption2."," this is caption2."],[0,0]],
//		 [1,"afunctionisveryverylong","afunctionisvery",22,["this is caption2 test."," this is caption2."," this is caption2."],[0,0]], 
//		 [2,"efun","afunctionisvery",17,["this is caption4"],[0,0]], 
//		 [0,"ffun","0",17,["this is caption5"],[0,0]], 
//		 [1,"gfun","ffun",17,["this is caption6"],[0,0]], 
//		 [1,"hfun","ffun",17,["this is caption7"],[0,0]], 
//		 [2,"ifun","hfun",17,["this is caption8"],[0,0]], 
//		 [0,"jfunction","0",17,["this is caption9"],[0,0]] 
//		 ];

var m_colorful ="Divide";
var divide_color = ["#111","#222","#333","#444","#555","#666","#777","#888","#999"];
graphs = [];

var make_list = [[0,"bfunction","0",17,["this is caption1."],[10,2,"var a = 3","function b"]]];
Raphael.fn.connection = function (obj1, obj2, line, bg) {
	if (obj1.line && obj1.from && obj1.to) {
		line = obj1;
		obj1 = line.from;
		obj2 = line.to;
	};
	var bb1 = obj1.getBBox(),
	bb2 = obj2.getBBox(),

	p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
	     {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
	     {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
	     {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
	     {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
	     {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
	     {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
	     {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
	     d = {}, 
	     dis = [];
	
	for (var i = 0; i < 4; i++) {
		for (var j = 4; j < 8; j++) {
			var dx = Math.abs(p[i].x - p[j].x),
			dy = Math.abs(p[i].y - p[j].y);
			if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
				dis.push(dx + dy);
				d[dis[dis.length - 1]] = [i, j];
			}
		}
	}
	
	if (dis.length == 0) {
		var res = [0, 4];
	} else {
		res = d[Math.min.apply(Math, dis)];
	}
	
	var x1 = p[res[0]].x,
	y1 = p[res[0]].y,
	x4 = p[res[1]].x,
	y4 = p[res[1]].y;
	dx = Math.max(Math.abs(x1 - x4) / 2, 10);
	dy = Math.max(Math.abs(y1 - y4) / 2, 10);
	var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
	y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
	x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
	y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
	var path = ["M", x1.toFixed(3), y1.toFixed(3),/* "C", x2, y2, x3, y3, */x4.toFixed(3), y4.toFixed(3)].join(",");
	
	if (line && line.line) {
		line.bg && line.bg.attr({path: path});
		line.line.attr({path: path});
	} else {
		var color = typeof line == "string" ? line : "#000";
		return {
			bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
			line: this.path(path).attr({stroke: color, fill: "none"}).toBack(),
			from: obj1,
			to: obj2
		};
	}
};
Raphael.fn.connections = function (obj1, obj2, line, bg) {
	if (obj1.line && obj1.from && obj1.to) {
		line = obj1;
		obj1 = line.from;
		obj2 = line.to;
	};
	var bb1 = obj1.getBBox(),
	bb2 = obj2.getBBox(),

	p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
	     {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
	     {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
	     {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
	     {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
	     {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
	     {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
	     {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
	     d = {}, 
	     dis = [];

	var i=0;
	var j=5; 
	var dx = Math.abs(p[i].x - p[j].x),
	dy = Math.abs(p[i].y - p[j].y);
	if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
		dis.push(dx + dy);
		d[dis[dis.length - 1]] = [i, j];
	}
	if (dis.length == 0) {
		var res = [0, 4];
	} else {
		res = d[Math.min.apply(Math, dis)];
	}
	
	var x1 = p[res[0]].x,
	y1 = p[res[0]].y,
	x4 = p[res[1]].x,
	y4 = p[res[1]].y;
	dx = Math.max(Math.abs(x1 - x4) / 2, 10);
	dy = Math.max(Math.abs(y1 - y4) / 2, 10);
	var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
	y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
	x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
	y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
	var path = ["M", x1.toFixed(3), y1.toFixed(3),/* "C", x2, y2, x3, y3, */x4.toFixed(3), y4.toFixed(3)].join(",");
	
	if (line && line.line) {
		line.bg && line.bg.attr({path: path});
		line.line.attr({path: path});
	} else {
		var color = typeof line == "string" ? line : "#000";
		return {
			bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
			line: this.path(path).attr({stroke: color, fill: "none"}).toBack(),
			from: obj1,
			to: obj2
		};
	}
};
Raphael.fn.connectionsleft = function (obj1, obj2, line, bg) {
	if (obj1.line && obj1.from && obj1.to) {
		line = obj1;
		obj1 = line.from;
		obj2 = line.to;
	};
	var bb1 = obj1.getBBox(),
	bb2 = obj2.getBBox(),

	p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
	     {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
	     {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
	     {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
	     {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
	     {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
	     {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
	     {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
	     d = {}, 
	     dis = [];

	var i=3;
	var j=6; 
	var dx = Math.abs(p[i].x - p[j].x),
	dy = Math.abs(p[i].y - p[j].y);
	if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
		dis.push(dx + dy);
		d[dis[dis.length - 1]] = [i, j];
	}

	if (dis.length == 0) {
		var res = [0, 4];
	} else {
		res = d[Math.min.apply(Math, dis)];
	}
	
	var x1 = p[res[0]].x,
	y1 = p[res[0]].y,
	x4 = p[res[1]].x,
	y4 = p[res[1]].y;
	dx = Math.max(Math.abs(x1 - x4) / 2, 10);
	dy = Math.max(Math.abs(y1 - y4) / 2, 10);
	var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
	y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
	x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
	y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
	var path = ["M", x1.toFixed(3), y1.toFixed(3),/* "C", x2, y2, x3, y3, */x4.toFixed(3), y4.toFixed(3)].join(",");
	
	if (line && line.line) {
		line.bg && line.bg.attr({path: path});
		line.line.attr({path: path});
	} else {
		var color = typeof line == "string" ? line : "#000";
		return {
			bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
			line: this.path(path).attr({stroke: color, fill: "none"}).toBack(),
			from: obj1,
			to: obj2
		};
	}
};


function darw_raphael( make_list_node ){
	
	make_list = make_list_node;		
	if( typeof(make_list_node) == "undefined" ){
		m_colorful ="Divide";
		make_list_node = [[0,"bfunction","0",17,["this is caption1."],[10,2,"var a = 3","function b"]]];
	}
	
	var homepage_height = 300 + make_list_node.length * 70;;
	$('#holder').height(homepage_height);
	$('#holder').html('');
	
	var r = Raphael("holder", "100%", "100%");
	r.clear();
	m_connection = [];
	font = r.getFont("whoa");
	m_shapes = r.set();
	m_texts = r.set();
	m_caption_rect = r.set();
	m_caption = r.set();
	m_detail_shapes = r.set();
	m_detail_text = r.set();
	m_caption_hides = r.set();
	m_type = [];
	m_show_detail = true;
	m_show_caption = true;
	/*----------------------- Common Function -----------------------*/
	function push_array( array ,shape ){ array.push( shape ); };
	function push_num_array( array, shapes, num ){
		for( var i = 0 ; i < num ; i++ ){
			push_array( array, shapes[i] );
		}
	};
	function make_node( parent , list, height ){ make_rec_to_line( parent , 190 + list[0] * 30, 100 + height, 60, 40, 5); };
	function make_line( shapes_start, shapes_end ){ push_array( m_connection,r.connection( shapes_start, shapes_end, "#fff")); };
	function line_to_line( parent , child ){
		push_array( m_shapes,child );
//		push_array( m_connection,r.connection( parent, child, "#000", "#000|1")  );
		push_array( m_connection,r.connection( parent, child, "#000")  );
	};
	function make_rec_to_line( shape1, posx, posy, lengthx, lengthy, shape_edge ){
		shape = r.rect(posx, posy, lengthx, lengthy, shape_edge);
		push_array( m_shapes,shape );	
		push_array( m_connection,r.connection( parent, child, "#000")  );

		//		push_array( m_connection,r.connection( shape1, shape, "#000", "#000|1")  );
	};
	function make_eclipse_to_line( shape1, posx, posy, lengthx, lengthy ){
		shape = r.eclipse(posx, posy, lengthx, lengthy);
		push_array( m_shapes,shape );
//		push_array( m_connection,r.connection( shape1, shape, "#000", "#000|1")  );
		push_array( m_connection,r.connection( parent, child, "#000")  );

	};

	/*----------------------- Gather Function -----------------------*/
	function push_arrays( index , node, depth ){
		var caption_array = r.set();
		length = m_shapes[index].attrs.x+m_shapes[index].attrs.width+40;
		line_to_line(m_shapes[index], r.rect(length, 100 + depth*62,10 + node[1].length*15, 30 ,2));
		if(node[3] == 0){
			push_array( m_caption_hides, r.rect(length, 135 + depth*62,10+ node[1].length*15, 0 ,2).attr({'fill-opacity':0}));			
			push_array( m_caption_rect, r.rect(length, 135 + depth*62 ,20+ node[1].length*15, 0 ,2));			
			push_array( caption_array, r.text(length+10, 148 + depth*62 + i*30 ,"").attr({font: "12px Helvetica", opacity: 0.5}).attr({fill: "#000","text-anchor": "start"}) );						
		}else{
			push_array( m_caption_hides, r.rect(length, 135 + depth*62,10+ node[1].length*15, 5 ,2).attr({'fill-opacity':0}));			
			push_array( m_caption_rect, r.rect(length, 135 + depth*62,30+ node[3]*6, node[4].length*20 ,2));			
			for( var i=0 ; i<node[4].length ; i++ ){
				push_array( caption_array, r.text(length+10, 145 + depth*62 + i*20 ," "+ node[4][i]).attr({font: "12px Helvetica", opacity: 0.5}).attr({fill: "#000","text-anchor": "start"}) );			
			}			
		}
		m_caption.push(caption_array);
		push_array( m_texts, r.text(length+8, 117 + depth*62, node[1]).attr({font: "25px Helvetica", opacity: 1.0}).attr({fill: "#000", cursor: "pointer","text-anchor": "start"}) );		
	};
	/*----------------------- Var Function -----------------------*/
	var clickFunc = function(i){
		return function(){
			if(m_detail_shapes[i-1].attr('fill-opacity') == 0){
				m_detail_shapes[i-1].attr({'fill-opacity':1}).show();
				m_detail_shapes[i].attr({'fill-opacity':1}).show();
				m_shapes[i/2].attr({'fill-opacity':'2.0'});
			}
			else{
				m_detail_shapes[i-1].attr({'fill-opacity':0}).hide();				
				m_detail_shapes[i].attr({'fill-opacity':0}).hide();
				m_shapes[i/2].attr({'fill-opacity':'0.9'});
			}
		};
	};	
	var mouseon = function(i){
		return function(){
			if(m_show_caption){
				m_caption_hides[i/2].hide();			
				m_caption_rect[i/2].show().toFront();
				m_caption[i/2].show().toFront();							
			}
		};
	}
	var mouseout = function(i){
		return function(){
			if(m_show_caption){
				m_caption_rect[i/2].hide();
				m_caption_hides[i/2].show();			
				m_caption[i/2].hide();					
			}
		};
	}
	var unclickFuncCaptionAll = function(){
		return function(){
			if(!m_show_caption){
				for(var i = 0 ; count = m_caption.length, i<count; i++){
					m_caption_hides[i].show();
					m_caption_rect[i].hide();
					m_caption.hide();
				}
				m_show_caption = true;								
			}			
		};
	}
	var clickFuncCaptionAll = function(){
		return function(){
			if(m_show_caption){
				for(var i = 0 ; count = m_caption.length, i<count; i++){
					m_caption_hides[i].hide();
					m_caption_rect[i].show();
					m_caption.show();
				}
				m_show_caption = false;				
			}
		};
	}
	
	var clickFuncAll = function(){
		return function(){
			if(m_show_detail){
				m_shapes[0].attr({'fill-opacity':'2.0'});
				for(var i = 1 ; count = m_texts.length, i<count; i++){
					m_detail_shapes[i*2].attr({'fill-opacity':1}).show();
					m_detail_shapes[i*2-1].attr({'fill-opacity':1}).show();
					m_shapes[i].attr({'fill-opacity':'2.0'});
				}
				m_show_detail = false;
			}
			else{
				m_texts[0].attr({'fill':'#000'});
				m_shapes[0].attr({'fill-opacity':'0.9'});
				for(var i = 1 ; count = m_texts.length, i<count; i++){
					m_detail_shapes[i*2].attr({'fill-opacity':0}).hide();				
					m_detail_shapes[i*2-1].attr({'fill-opacity':0}).hide();
					m_shapes[i].attr({'fill-opacity':'0.9'});
				}	
				m_show_detail = true;
			}				
		};
	};
	
	var clickAjax = function(i){
		return function(){
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
			})
		};
	};
	
	/*----------------------- Push -----------------------*/
	push_array( m_shapes, r.rect(25, 100, 120, 30 ,5) );
	push_array( m_texts, r.text(85, 117, "document").attr({font: "25px Helvetica", opacity: 1.0}).attr({fill: "#000",cursor: "pointer"	}));
	push_array( m_caption_rect, r.rect(25, 135, 80, 20, 2)  );
	push_array( m_caption_hides, r.rect(25, 135, 120, 5,2)  );
	push_array( m_caption, r.text(60, 145, "caption").attr({font: "12px Helvetica", opacity: 0.5}).attr({fill: "#000"}));
	push_array( m_detail_shapes, r.rect(50, 150, 50, 50 ,5).attr({fill: m_shapes[0].attrs.fill, stroke: 0, "fill-opacity": 0, "stroke-width": 2}));
	push_array( m_type, "document" );
	for( var m = 0 ,list_length = make_list_node.length;  m < list_length ; m++ ){
		var list_node_text = make_list_node[m];
		push_array( m_type, list_node_text[6] );		
		if(list_node_text[2] == "0"){ push_arrays( 0, list_node_text, m ); }
		else{
			for( var k = m - 1 ; k >= 0 ; k-- ){
				if( make_list_node[k][1] == list_node_text[2] ){ push_arrays( k+1, list_node_text, m ); break;}
			}
		}
	};

	changeColor(m_colorful);

	/*----------------------- Left Chart -----------------------*/
	for( var m = 0 ,list_length = make_list_node.length ; m < list_length ; m++ ){
		var function_detail = r.set();
		var position_x = m_shapes[m+1].attrs.x + m_shapes[m+1].attrs.width - 5;
		var position_y = m_shapes[m+1].attrs.y;
		var rectangle = r.rect( position_x + 10 ,position_y, make_list_node[m][4][1]*make_list_node[m][4][0]*10,30,5).attr({fill: m_shapes[m+1].attrs.fill, stroke: 0, "fill-opacity": 0.1, "stroke-width": 2});
		for( var k=0 ; k < make_list_node[m][4][1] ; k++ ){				
			function_detail.push( r.text( position_x + make_list_node[m][4][0] * k * 10 + 25 ,position_y + 15 , make_list_node[m][4][k+2]).attr({font: "16px Helvetica", opacity: 0.5, fill: "#000" , "text-anchor": "start"}));
		}
		push_num_array( m_detail_shapes, [ rectangle, function_detail ],2 );
		function_detail.hide();
	};	

	m_detail_shapes.hide();
	m_caption_rect.hide();
	m_caption.hide();

	for(var i = 0, count = m_texts.length ; i < count ; i++){
		m_texts[i].mouseover( mouseon( i*2 ) ).mouseout( mouseout( i*2 ));
		m_shapes[i].attr({cursor: "move"});
	};	
	for(var i = 1, count = m_texts.length ; i < count ; i++){
		m_texts[i].click( clickAjax(i-1) )
	}
	m_caption_hides[0].attr({cursor: "pointer"}).click(clickFuncCaptionAll());
	m_caption[0].attr({cursor: "pointer"}).click(unclickFuncCaptionAll());
	$("#holder").draggable();
	$("#holder").attr({cursor: "move"})

	 for(var k = 0;k<m_shapes.length;k++){
		 m_shapes[k].data("enclosedText",m_texts[k]);
		 m_shapes[k].data("enclosedShape",m_caption_hides[k]);
		 m_shapes[k].data("enclosedDetailShape",m_caption_rect[k]);
		 m_shapes[k].data("enclosedDetail",m_caption[k]);		 
	 };

	 var dragShape = function () {
		 $("#holder").draggable("destroy");
		 this.ox = this.attr("x");
		 this.oy = this.attr("y");
	 };
	 var moveShape = function (dx, dy) {
		 this.attr({x: this.ox + dx, y: this.oy + dy});
		 this.data("enclosedText").attr({x: this.ox + dx + 7, y: this.oy + dy + 17});
		 this.data("enclosedShape").attr({x: this.ox + dx , y: this.oy + dy + 35});
		 this.data("enclosedDetailShape").attr({x: this.ox + dx , y: this.oy + dy + 35});
		 for(var i=0;i<this.data("enclosedDetail").length;i++){
			 this.data("enclosedDetail")[i].attr({x: this.ox + dx + 10 , y: this.oy + dy + 45+i*20});			 
		 }
		 
		 for (var i = m_connection.length; i--;) {
			 r.connection(m_connection[i]);
		 }
		 r.safari();
	 }
	 var upShape = function () {
		 $("#holder").draggable();
	 };     
	 for(var k = 1;k<m_shapes.length;k++){
		 m_shapes[k].drag(moveShape, dragShape, upShape);
	 };	

}
function changeColor(argu){
	m_colorful = argu;
	if(argu == "Simple"){
		m_shapes.attr({"stroke":"#999","stroke-width": 2,"fill":"white"});
		m_caption_rect.attr({"fill":"white","stroke":"#999","stroke-width": 2});
		m_caption_hides.attr({"stroke":"#999","stroke-width": 2,"fill":"#ddd"});
	}
	else if(argu == "Divide"){	
		m_shapes[0].attr({fill: divide_color[3], stroke: divide_color[3], "fill-opacity": 0.9, "stroke-width": 4});	
		m_caption_rect[0].attr({fill: divide_color[3], stroke: divide_color[3], "fill-opacity": 0.7, "stroke-width": 2});
		m_caption_hides[0].attr({fill: divide_color[3], stroke: divide_color[3], "fill-opacity": 0.5, "stroke-width": 2});			
		for(var i = 1 , count = m_shapes.length; i<count;i++){
			var color; 
			if(make_list[i-1][6]=="Expression"){
				color = divide_color[0];
			}else if(make_list[i-1][6]=="Anonymous"){
				color = divide_color[1];				
			}else if(make_list[i-1][6]=="Declaration"){
				color = divide_color[2];				
			}else{
				color = divide_color[3];				
			}
			m_shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0.9, "stroke-width": 4});	
			m_caption_rect[i].attr({fill: color, stroke: color, "fill-opacity": 0.7, "stroke-width": 2});
			m_caption_hides[i].attr({fill: color, stroke: color, "fill-opacity": 0.5, "stroke-width": 2});			
		};		
	}
	else if(argu == "Colorful"){
		m_shapes[0].attr({fill:"red" , stroke: "red", "fill-opacity": 0.9, "stroke-width": 4});	
		m_caption_rect[0].attr({fill: "red", stroke: "red", "fill-opacity": 0.7, "stroke-width": 2});
		m_caption_hides[0].attr({fill: "red", stroke: "red", "fill-opacity": 0.5, "stroke-width": 2});			
		for(var i = 1 , count = m_shapes.length; i<count;i++){
			var color = divide_color[make_list[i-1][0]];
			m_shapes[i].attr({fill:color , stroke: color, "fill-opacity": 0.9, "stroke-width": 4});	
			m_caption_rect[i].attr({fill: color, stroke: color, "fill-opacity": 0.7, "stroke-width": 2});
			m_caption_hides[i].attr({fill: color, stroke: color, "fill-opacity": 0.5, "stroke-width": 2});			
		};

	}
}
function drawDiagram(){
	$('#holder').height(5000);
	var r = Raphael("holder", "100%", "100%");
	m_diagram_text = r.set();
	m_diagram_rect = r.set();
	m_diagram_line = r.set();
	m_diagram_left = r.set();
	function dia_make_line( shapes_start, shapes_end ){ push_array( m_connection,r.connection( shapes_start, shapes_end, "#fff")); };
	function dia_line_to_line( parent , child ){
		m_diagram_rect.push( child );
		m_diagram_line.push( r.connection( parent, child, "#000", "#000|1") );
	};
	var startnode;
	var endnode;
	var datas=
		[
		[ "if", "0", "0", "0", "0", "0", "0"],
		[ "ifN", "if", "0", "0", "0", "0", "0"],
		[ "0", "ifN", "var", "0", "0", "0", "0"],
		[ "0", "0", "textN", "0", "0", "0", "0"],
		[ "0", "0", "while", "0", "0", "0", "0"],
		[ "0", "0", "whileN", "var", "0", "0", "0"],
		[ "0", "0", "0", "textN", "0", "0", "0"],
		[ "0", "0", "0", "var", "0", "0", "0"],
		[ "0", "0", "0", "textN", "0", "0", "0"],
		[ "0", "0", "line", "line", "0", "0", "0"],
		[ "0", "0", "var", "0", "0", "0", "0"],
		[ "0", "0", "textN", "0", "0", "0", "0"],
		[ "0", "0", "if", "0", "0", "0", "0"],
		[ "0", "0", "ifN", "var", "0", "0", "0"],
		[ "0", "0", "0", "textN", "0", "0", "0"],
		[ "0", "line", "line", "line", "0", "0", "0"],
		[ "0", "elif", "0", "0", "0", "0", "0"],
		[ "0", "elifN", "if", "0", "0", "0", "0"],
		[ "0", "0", "ifN", "var", "0", "0", "0"],
		[ "0", "0", "0", "textN", "0", "0", "0"],
		[ "0", "line", "line", "line", "0", "0", "0"],
		[ "0", "elif", "0", "0", "0", "0", "0"],
		[ "0", "elifN", "var", "0", "0", "0", "0"],
		[ "0", "0", "textN", "0", "0", "0", "0"],
		[ "0", "line", "line", "0", "0", "0", "0"],
		[ "0", "else", "0", "0", "0", "0", "0"],
		[ "0", "elseN", "var", "0", "0", "0", "0"],
		[ "0", "0", "textN", "0", "0", "0", "0"],
		[ "0", "line", "line", "0", "0", "0", "0"],
		[ "0", "var", "0", "0", "0", "0", "0"],
		[ "0", "textN", "0", "0", "0", "0", "0"],
		[ "line", "line", "0", "0", "0", "0", "0"],
		[ "elif", "0", "0", "0", "0", "0", "0"],
		[ "elifN", "elifY", "0", "0", "0", "0", "0"],
		[ "else", "0", "0", "0", "0", "0", "0"],
		[ "elseN", "var", "0", "0", "0", "0", "0"],
		[ "0", "textN", "0", "0", "0", "0", "0"],
		[ "line", "line", "0", "0", "0", "0", "0"]
		];	
	startnode = r.rect(100, 10, 80, 80, 5).attr({fill: "white", stroke: "black", "stroke-width": 2});
	r.text(120, 50 ,"start").attr({font: "12px Helvetica", opacity: 1.0,fill:"black",});											
	for(var i=0 ; i < datas.length ; i++){
		var logical = [];
		for(var j=0 ; j < datas[0].length ; j++){
			var index = datas[i][j];
			if(index!="0"){
				if(index!="line"&&index!="ifN"&&index!="forN"&&index!="elifN"&&index!="ifY"&&index!="forY"&&index!="elifY"&&index!="whileN"&&index!="whileY"&&index!="textN"&&index!="textY"){
					logical.push(r.rect( 100 + j * 80, 120 + i * 105, 80, 80, 5 ));
					if(index == "if" || index == "for"||index == "elif"||index == "else"||index == "while"){
						r.text(105 + j * 80, 150 + i * 105 ,datas[i][j]).attr({font: "12px Helvetica", opacity: 1.0,fill:"black"});											
					}else{
						r.text(120 + j * 80, 150 + i * 105 ,datas[i][j]).attr({font: "12px Helvetica", opacity: 1.0,fill:"black"});											
					}
				}else{
					logical.push(r.rect( 138 + j * 80, 135 + i * 105, 5, 5, 5 ));	
				}
			}else{
				logical.push("");				
			}
		}graphs.push(logical);
		
		if(i==datas.length-1){
			endnode = r.rect(100, 210 + i * 105, 80, 80, 5).attr({fill: "white", stroke: "black", "stroke-width": 2});
			r.text(120, 240 + i * 105 ,"end").attr({font: "12px Helvetica", opacity: 1.0,fill:"black"});											
		}
	}

	for(var i=0 ; i < datas.length ; i++){
		for(var j=0 ; j < datas[0].length ; j++){
			var argu = datas[i][j];
			if(argu=="line"){
				if(datas[i][j+1]=="line"){
					r.connections(graphs[i][j+1] , graphs[i][j], "black");					
				}
				if(i+1<datas.length&&datas[i+1][j]!="0"){
					r.connections(graphs[i+1][j] , graphs[i][j], "black");										
				}
				for(var k=i-1;k>0;k--){
					if(datas[k][j]!="0"){
						r.connections(graphs[k][j] , graphs[i][j], "black");										
						break;
					}
				}
			}
			if(argu=="if"){
				if(i>0&&graphs[i-1][j]!=""){
					r.connections(graphs[i][j] ,graphs[i-1][j] , "black");
				}
				r.connections(graphs[i+1][j], graphs[i][j] , "red");
				r.connections(graphs[i+1][j+1] ,graphs[i][j] , "green");
				graphs[i][j].rotate(45);
			}
			else if(argu=="elif"){
				for(var i1 = i-1;i1>0;i1--){
					if(datas[i1][j]=="if"||datas[i1][j]=="elif"){
						r.connections(graphs[i1+1][j] , graphs[i][j], "black");																	
						break;
					}
				}
				r.connections(graphs[i+1][j] , graphs[i][j], "red");
				r.connections(graphs[i+1][j+1] , graphs[i][j], "green");				
				graphs[i][j].rotate(45);
			}
			else if(argu=="elifN"){
				if(datas[i+1][j]!="0"){
					r.connections(graphs[i+1][j] , graphs[i][j], "black");					
				}
			}			
			else if(argu=="for"){
				graphs[i][j].rotate(45);
				if(i>0&&graphs[i-1][j]!=""){
					r.connections(graphs[i][j] ,graphs[i-1][j] , "black");
				}
				r.connections(graphs[i+1][j] , graphs[i][j], "red");
				r.connections(graphs[i+1][j+1] , graphs[i][j], "green");
				r.connectionsleft(graphs[i+1][j+1] ,graphs[i][j], "black");				
			}	
			else if(argu=="while"){
				graphs[i][j].rotate(45);
				if(i>0&&graphs[i-1][j]!=""){
					r.connections(graphs[i][j] ,graphs[i-1][j] , "black");
				}
				r.connections(graphs[i+1][j] , graphs[i][j], "red");
				r.connections(graphs[i+1][j+1] , graphs[i][j], "green");
				r.connectionsleft(graphs[i+1][j+1] ,graphs[i][j], "black");				
			}	
			else if(argu=="else"){
				graphs[i][j].rotate(45);
				for(var i1 = i-1;i1>0;i1--){
					if(datas[i1][j]=="if"||datas[i1][j]=="elif"){
						r.connections(graphs[i1+1][j] , graphs[i][j], "black");																	
						break;
					}
				}
				r.connections(graphs[i+1][j+1] , graphs[i][j], "green");
				r.connections(graphs[i+1][j] , graphs[i][j], "red");																	

			}else if(argu=="var"){
				r.connections(graphs[i+1][j] , graphs[i][j], "black");
				if(i+2<datas.length&&datas[i+2][j]!="0"){
					r.connections(graphs[i+2][j] , graphs[i][j], "black");					
				}
			}else if(argu=="ifY"||argu=="elifY"||argu=="elseY"){
				r.connections(graphs[i][j-1] , graphs[i][j], "black");
			}
			if( graphs[i][j]!="" ){
				graphs[i][j].attr({fill: "white", stroke: "black", "stroke-width": 2});
			}
		}
	}
	r.connections(graphs[0][0], startnode , "black");
	r.connections(graphs[datas.length-1][0] ,endnode ,"black")
}

$(document).ready(function() {
	darw_raphael(make_list);
//	drawDiagram();
	});
