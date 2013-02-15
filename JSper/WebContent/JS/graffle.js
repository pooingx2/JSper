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
	var make_list_node = test_gender;
	/*----------------------- Var Declaration -----------------------*/
	var homepage_height = make_list_node.length * 100;
	if(homepage_height < 100){
		homepage_height = 1000;
	}
	$('#holder').height(homepage_height);
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
	var m_caption_hides = r.set();
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
		push_array( m_connection,r.connection( parent, child, "#000", "#000|1")  );
//		push_array( m_connection,r.connection( parent, child, "#eee")  );
	};
	function make_rec_to_line( shape1, posx, posy, lengthx, lengthy, shape_edge ){
		shape = r.rect(posx, posy, lengthx, lengthy, shape_edge);
		push_array( m_shapes,shape );	
		push_array( m_connection,r.connection( shape1, shape, "#000", "#000|1")  );
	};
	function make_eclipse_to_line( shape1, posx, posy, lengthx, lengthy ){
		shape = r.eclipse(posx, posy, lengthx, lengthy);
		push_array( m_shapes,shape );
		push_array( m_connection,r.connection( shape1, shape, "#000", "#000|1")  );
	};
	function make_rectangle(){
		
	};
	function make_circle(){
		
	};
	function make_rhombus(){
		
	};
	/*----------------------- Gather Function -----------------------*/
	function push_arrays( index , node, depth ){
		var caption_array = r.set();
		length = m_shapes[index].attrs.x+m_shapes[index].attrs.width+40;
		line_to_line(m_shapes[index], r.rect(length, 100 + depth*62,20 + node[1].length*15, 30 ,2));
		push_array( m_caption_hides, r.rect(length, 135 + depth*62,30+ node[4]*6, 10 ,2).attr({'fill-opacity':0}));			
		if(node[4] == 0){
			push_array( m_caption_rect, r.rect(length, 135 + depth*62 ,30, 10 ,2).attr({'fill-opacity':0}));			
			push_array( caption_array, r.text(length+10, 148 + depth*62 + i*30 ,"").attr({font: "12px Helvetica", opacity: 0.5}).attr({fill: "#000","text-anchor": "start"}) );						
		}else{
			push_array( m_caption_rect, r.rect(length, 135 + depth*62,30+ node[4]*6, node[5].length*30 ,2).attr({'fill-opacity':0}));			
			for( var i=0 ; i<node[5].length ; i++ ){
				push_array( caption_array, r.text(length+10, 148 + depth*62 + i*30 ," : "+ node[5][i]).attr({font: "12px Helvetica", opacity: 0.5}).attr({fill: "#000","text-anchor": "start"}) );			
			}			
		}
		m_caption.push(caption_array);
		push_array( m_texts, r.text(length+8, 117 + depth*62, node[1]).attr({font: "25px Helvetica", opacity: 0.5}).attr({fill: "#000", cursor: "pointer","text-anchor": "start"}) );		
	};
	/*----------------------- Var Function -----------------------*/
	var clickFunc = function(i){
		return function(){
			if(m_detail_shapes[i-1].attr('fill-opacity') == 0){
				m_detail_shapes[i-1].attr({'fill-opacity':1}).show();
				m_detail_shapes[i].attr({'fill-opacity':1}).show();
///				m_texts[i/2].attr({'fill':'#000'});
				m_shapes[i/2].attr({'fill-opacity':'2.0'});
			}
			else{
				m_detail_shapes[i-1].attr({'fill-opacity':0}).hide();				
				m_detail_shapes[i].attr({'fill-opacity':0}).hide();
				m_shapes[i/2].attr({'fill-opacity':'0.9'});
///				m_texts[i/2].attr({'fill':'#000'});			
				}
		};
	};	
	var mouseon = function(i){
		return function(){
			m_caption_rect[i/2].attr({'fill-opacity':1}).show().toFront();
			m_caption[i/2].show().toFront();			
		}
	}
	var mouseout = function(i){
		return function(){
			m_caption_rect[i/2].attr({'fill-opacity':0}).hide();
			m_caption[i/2].hide();	
		}
	}

	var clickFuncAll = function(){
		return function(){
			if(m_show_detail){
///				m_texts[0].attr({'fill':'#fff'});
				m_shapes[0].attr({'fill-opacity':'2.0'});
				for(var i = 1 ; count = m_texts.length, i<count; i++){
					m_detail_shapes[i*2].attr({'fill-opacity':1}).show();
					m_detail_shapes[i*2-1].attr({'fill-opacity':1}).show();
//					m_texts[i].attr({'fill':'#333'});
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
///					m_texts[i].attr({'fill':'#000'});			
					m_shapes[i].attr({'fill-opacity':'0.9'});
				}	
				m_show_detail = true;
			}				
		};
	};		

	/*----------------------- Push -----------------------*/
	push_array( m_shapes, r.rect(25, 100, 120, 30 ,5) );
	push_array( m_texts, r.text(85, 117, "document").attr({font: "25px Helvetica", opacity: 0.5}).attr({fill: "#000",cursor: "pointer"	}));
	push_array( m_caption_rect, r.rect(25, 135, 80, 15,5)  );
	push_array( m_caption_hides, r.rect(25, 135, 80, 10,2)  );
	push_array( m_caption, r.text(60, 142, "caption").attr({font: "12px Helvetica", opacity: 0.5}).attr({fill: "#000"}));
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
		m_shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0.9, "stroke-width": 4});	
		m_caption_rect[i].attr({fill: color, stroke: color, "fill-opacity": 0.5, "stroke-width": 2});
		m_caption_hides[i].attr({fill: color, stroke: color, "fill-opacity": 0.5, "stroke-width": 2});			
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
	m_caption_rect.hide();
	m_caption.hide();

	for(var i = 0, count = m_texts.length ; i < count ; i++){
		m_texts[i].mouseover( mouseon( i*2 ) ).mouseout( mouseout( i*2 ) );
//		m_texts[i].click( clickFunc( i*2 ) ).mouseover( mouseon( i*2 ) ).mouseout( mouseout( i*2 ) );
	};	
//	m_texts[0].click(clickFuncAll());
	
//	$("#holder").draggable();
	$('#holder').css({'background-color': '#fff'});
	
	 var dragger = function () {
		 this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
		 this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
	 };
	 var move = function (dx, dy) {
		 var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
		 this.attr(att);
		 for (var i = m_connection.length; i--;) {
			 r.connection(m_connection[i]);
		 }
		 r.safari();
	 };
	 var up = function () {
	 };
	 for (var i = 0, ii = m_shapes.length; i < ii; i++) {
		 m_shapes[i].drag(move, dragger, up);
	 }

	 
	 for(var k = 0;k<m_shapes.length;k++){
		 m_shapes[k].data("enclosedText",m_texts[k]);
		 m_shapes[k].data("enclosedShape",m_caption_hides[k]);
		 m_shapes[k].data("enclosedDetailShape",m_caption_rect[k]);
		 m_shapes[k].data("enclosedDetail",m_caption[k]);		 
	 }


	 var dragShape = function () {
		 this.ox = this.attr("cx");
		 this.oy = this.attr("cy");
	 } 
	 var moveShape = function (dx, dy) {
		 this.attr({cx: this.ox + dx, cy: this.oy + dy});
		 this.data("enclosedText").attr({x: this.ox + dx + 2, y: this.oy + dy + 10});
		 this.data("enclosedShape").attr({x: this.ox + dx , y: this.oy + dy + 35});
		 this.data("enclosedDetailShape").attr({x: this.ox + dx , y: this.oy + dy + 35});
		 this.data("enclosedDetail").attr({x: this.ox + dx , y: this.oy + dy + 50});
	 }
	 var upShape = function () {
	 }       
	 for(var k = 0;k<m_shapes.length;k++){
		 m_shapes[k].drag(moveShape, dragShape, upShape);
	 }
});


