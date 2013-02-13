//	var make_list_node = 
//		[
//		 [0,"bfunction","0","this is caption1.",[10,2,"var a = 3","function b"]], 
//		 [1,"cfun","bfunction","this is caption2. this is caption2. this is caption2. this is caption2.",[10,4,"var a","var b","function a","function b"]], 
//		 [1,"dfun","bfunction","this is caption3",[10,3,"var m = 3","var k = 3","function m"]],
//		 [0,"afunctionisveryveryveryverylong","0","this is caption2. this is caption2. this is caption2.",[0,0]],
//		 [1,"afunctionisveryverylong","afunctionisveryveryveryverylong","this is caption2. this is caption2. this is caption2.",[0,0]], 
//		 [2,"efun","afunctionisveryverylong","this is caption4",[0,0]], 
//		 [0,"ffun","0","this is caption5",[0,0]], 
//		 [1,"gfun","ffun","this is caption6",[0,0]], 
//		 [1,"hfun","ffun","this is caption7",[0,0]], 
//		 [2,"ifun","hfun","this is caption8",[0,0]], 
//		 [0,"jfunction","0","this is caption9",[0,0]] 
//		 ];
	var make_list_node = gender;
Raphael.fn.connection = function (obj1, obj2, line, bg) {
	
	if (obj1.line && obj1.from && obj1.to) {
		line = obj1;
		obj1 = line.from;
		obj2 = line.to;
	}
	
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
	     d = {}, dis = [];
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
	var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
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

$(document).ready(function() {
	/*----------------------- Var Declaration -----------------------*/
	var homepage_height = make_list_node.length*80;
	$('#editor').height(homepage_height);
	$('#holder').height(homepage_height).css({'border': '2px solid #fff'});
	var	r = Raphael("holder", 1800, homepage_height);
	var m_connection = [];
	var font = r.getFont("whoa");
	var m_shapes = r.set();
	var m_texts = r.set();
	var m_caption_rect = r.set();
	var m_caption = r.set();
	var m_detail_shapes = r.set();
	var m_detail_text = r.set();
	var m_show_detail = true;
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
		push_array( m_connection,r.connection( parent, child, "#fff", "#fff|1")  );
//		push_array( m_connection,r.connection( parent, child, "#eee")  );
	};
	function make_rec_to_line( shape1, posx, posy, lengthx, lengthy, shape_edge ){
		shape = r.rect(posx, posy, lengthx, lengthy, shape_edge);
		push_array( m_shapes,shape );
		push_array( m_connection,r.connection( shape1, shape, "#fff", "#fff|1")  );
	};
	function make_eclipse_to_line( shape1, posx, posy, lengthx, lengthy ){
		shape = r.eclipse(posx, posy, lengthx, lengthy);
		push_array( m_shapes,shape );
		push_array( m_connection,r.connection( shape1, shape, "#fff", "#fff|1")  );
	};

	/*----------------------- Gather Function -----------------------*/
	function push_arrays( index , node, depth ){
		length = m_shapes[index].attrs.x+m_shapes[index].attrs.width+40;
		line_to_line(m_shapes[index], r.rect(length, 100 + depth*62,20 + node[1].length*15, 30 ,5));
		if( 20 + node[1].length*14 >= 20+ node[3].length*6  ){
			push_array( m_caption_rect, r.rect(length, 135 + depth*62,20 + node[1].length*15, 15 ,5));			
		}else{
			push_array( m_caption_rect, r.rect(length, 135 + depth*62,30+ node[3].length*6, 15 ,5));			
		}
		push_array( m_caption, r.text(length+10, 142 + depth*62," : "+ node[3]).attr({font: "12px Helvetica", opacity: 0.5}).attr({fill: "#fff","text-anchor": "start"}) );
		push_array( m_texts, r.text(length+8, 117 + depth*62, node[1]).attr({font: "25px Helvetica", opacity: 0.5}).attr({fill: "#000", cursor: "pointer","text-anchor": "start"}) );		
	};

	/*----------------------- Var Function -----------------------*/
	var clickFunc = function(i){
		return function(){
			if(m_detail_shapes[i-1].attr('fill-opacity') == 0){
				m_detail_shapes[i-1].attr({'fill-opacity':1}).show();
				m_detail_shapes[i].attr({'fill-opacity':1}).show();
				m_texts[i/2].attr({'fill':'#fff'});
				m_shapes[i/2].attr({'fill-opacity':'0.4'});
			}
			else{
				m_detail_shapes[i-1].attr({'fill-opacity':0}).hide();				
				m_detail_shapes[i].attr({'fill-opacity':0}).hide();
				m_shapes[i/2].attr({'fill-opacity':'0.9'});
				m_texts[i/2].attr({'fill':'#000'});			}
		};
	};	

	var clickFuncAll = function(){
		return function(){
			if(m_show_detail){
				m_texts[0].attr({'fill':'#fff'});
				m_shapes[0].attr({'fill-opacity':'0.4'});
				for(var i = 1 ; count = m_texts.length, i<count; i++){
					m_detail_shapes[i*2].attr({'fill-opacity':1}).show();
					m_detail_shapes[i*2-1].attr({'fill-opacity':1}).show();
					m_texts[i].attr({'fill':'#fff'});
					m_shapes[i].attr({'fill-opacity':'0.4'});
				}
				m_show_detail = false;
			}
			else{
				m_texts[0].attr({'fill':'#000'});
				m_shapes[0].attr({'fill-opacity':'0.9'});
				for(var i = 1 ; count = m_texts.length, i<count; i++){
					m_detail_shapes[i*2].attr({'fill-opacity':0}).hide();				
					m_detail_shapes[i*2-1].attr({'fill-opacity':0}).hide();
					m_texts[i].attr({'fill':'#000'});			
					m_shapes[i].attr({'fill-opacity':'0.9'});
				}	
				m_show_detail = true;
			}				
		};
	};		

	/*----------------------- Push -----------------------*/
	push_array( m_shapes, r.rect(50, 100, 80, 30 ,5) );
	push_array( m_texts, r.text(85, 117, "start").attr({font: "25px Helvetica", opacity: 0.5}).attr({fill: "#000",cursor: "pointer"	}));
	push_array( m_caption_rect, r.rect(50, 135, 80, 15,5)  );
	push_array( m_caption, r.text(85, 142, ": caption").attr({font: "12px Helvetica", opacity: 0.5}).attr({fill: "#fff"}));
	push_array( m_detail_shapes, r.rect(50, 150, 50, 50 ,5).attr({fill: m_shapes[0].attrs.fill, stroke: 0, "fill-opacity": 0, "stroke-width": 2}));

	for( var m = 0 ,list_length = make_list_node.length;  m < list_length ; m++ ){
		var list_node_text = make_list_node[m];
		if(list_node_text[2] == "0"){ push_arrays( 0, list_node_text, m ); }
		else{
			for( var k = 0 ; k < m ; k++ ){
				if( make_list_node[k][1] == list_node_text[2] ){ push_arrays( k+1, list_node_text, m );}
			}
		}
	};

	for(var i = 0 , count = m_shapes.length; i<count;i++){
		var color = Raphael.getColor();
		m_shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0.9, "stroke-width": 2});	
		m_caption_rect[i].attr({fill: color, stroke: color, "fill-opacity": 0.5, "stroke-width": 2});
	};

	/*----------------------- Left Chart -----------------------*/
	for( var m = 0 ,list_length = make_list_node.length ; m < list_length ; m++ ){
		var function_detail = r.set();
		var position_x = m_shapes[m+1].attrs.x + m_shapes[m+1].attrs.width - 5;
		var position_y = m_shapes[m+1].attrs.y;
		var rectangle = r.rect( position_x + 10 ,position_y, make_list_node[m][4][1]*make_list_node[m][4][0]*10,30,5).attr({fill: m_shapes[m+1].attrs.fill, stroke: 0, "fill-opacity": 0.1, "stroke-width": 2});
		for( var k=0 ; k < make_list_node[m][4][1] ; k++ ){				
			function_detail.push( r.text( position_x + make_list_node[m][4][0] * k * 10 + 25 ,position_y + 15 , make_list_node[m][4][k+2]).attr({font: "16px Helvetica", opacity: 0.5}).attr({fill: "#000" , "text-anchor": "start"}));
		}
		push_num_array( m_detail_shapes, [ rectangle, function_detail ],2 );
		function_detail.hide();
	}	
	m_detail_shapes.hide();
	/*----------------------- Down Chart -----------------------*/
//	for( var m = 0 ; list_length = make_list_node.length, m < list_length ; m++ ){
//	var function_detail = r.set();
//	var position_x = m_shapes[m+1].attrs.x;
//	var position_y = m_shapes[m+1].attrs.y;
//	var rectangle = r.rect( position_x ,position_y+70,make_list_node[m][4][0]*20,make_list_node[m][4][1]*20,10).attr({fill: m_shapes[m+1].attrs.fill, stroke: 0, "fill-opacity": 0, "stroke-width": 2});
//	for( var k=0 ; k < make_list_node[m][4][1] ; k++ ){				
//	function_detail.push( r.text( position_x+10,position_y + 20*k + 80 , make_list_node[m][4][k+2]).attr({font: "15px Helvetica", opacity: 0.5}).attr({fill: "#000" , "text-anchor": "start"}));
//	}
//	push_num_array( m_detail_shapes, [ rectangle, function_detail ],2 );
//	function_detail.hide();
//	}	
	for(var i = 1, count = m_texts.length ; i < count ; i++){
		m_texts[i].click( clickFunc( i*2 ) );
	};	
	m_texts[0].click(clickFuncAll());
	
	
	
	
	$("#holder").draggable();
	$('#holder').css({'background-color': '#111'});
	
	
	/*----------------------- Drag Function -----------------------*/
//	var dragger = function () {
//	this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
//	this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
//	this.animate({"fill-opacity": .2}, 500);
//	},
//	move = function (dx, dy) {
//	var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
//	this.attr(att);
//	for (var i = connections.length; i--;) {
//	r.connection(connections[i]);
//	}
//	r.safari();
//	},
//	up = function () {
//	this.animate({"fill-opacity": 0}, 500);
//	},
//	l = Raphael("holder", 640, 480),
//	connections = [],
//	shapes = [  l.ellipse(190, 100, 30, 20),
//	l.rect(290, 80, 60, 40, 10),
//	l.rect(290, 180, 60, 40, 2),
//	l.ellipse(450, 100, 20, 20),
//	l.ellipse(450, 200, 20, 20)
//	];
//	for (var i = 0, ii = shapes.length; i < 3; i++) {
//	var color = Raphael.getColor();
//	shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
//	shapes[i].drag(move, dragger, up);    
//	}
//	connections.push(l.connection(shapes[0], shapes[1], "#fff"));
//	connections.push(l.connection(shapes[1], shapes[2], "#fff", "#fff|5"));
//	connections.push(l.connection(shapes[1], shapes[3], "#000", "#fff"));
	/*----------------------- Drag Function -----------------------*/
//	var dragger = function () {
//	this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
//	this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
//	this.animate({"fill-opacity": .2}, 500);
//	},
//	move = function (dx, dy) {
//	var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
//	this.attr(att);
//	for (var i = connections.length; i--;) {
//	r.connection(connections[i]);
//	}
//	r.safari();
//	},
//	up = function () {
//	this.animate({"fill-opacity": 0}, 500);
//	},
//	l = Raphael("holder", 640, 480),
//	connections = [],
//	shapes = [  l.ellipse(190, 100, 30, 20),
//	l.rect(290, 80, 60, 40, 10),
//	l.rect(290, 180, 60, 40, 2),
//	l.ellipse(450, 100, 20, 20),
//	l.ellipse(450, 200, 20, 20)
//	];
//	for (var i = 0, ii = shapes.length; i < 3; i++) {
//	var color = Raphael.getColor();
//	shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
//	shapes[i].drag(move, dragger, up);    
//	}
//	connections.push(l.connection(shapes[0], shapes[1], "#fff"));
//	connections.push(l.connection(shapes[1], shapes[2], "#fff", "#fff|5"));
//	connections.push(l.connection(shapes[1], shapes[3], "#000", "#fff"));
});


