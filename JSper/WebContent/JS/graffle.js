var m_colorful ="Divide";
var divide_color = ["#ffe4e1","#e6e6fa","#b0e0e6","#fff8dc","#87ceeb","#87cefa","#4169e1","#6a5acd","#4682b4"];
var flow_color = ["#afeeee","#fffacd","#fff8dc","#f5f5dc"];
var make_list = [];
var alltext = true;

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

	var i=0;
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


function draw_raphael( make_list_node ){

	make_list = make_list_node;		
	if( typeof(make_list_node) == "undefined" ){
		m_colorful ="Divide";
		make_list_node = [[0,"bfunction","0",17,["this is caption1."],[10,2,"var a = 3","function b"]]];
	}

	var homepage_height = 300 + make_list_node.length * 68;;
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
		push_array( m_connection,r.connection( parent, child, "#000")  );
	};
	function make_rec_to_line( shape1, posx, posy, lengthx, lengthy, shape_edge ){
		shape = r.rect(posx, posy, lengthx, lengthy, shape_edge);
		push_array( m_shapes,shape );	
		push_array( m_connection,r.connection( parent, child, "#000")  );
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
			var s = i;
			$.ajax({   
				type: "POST",   
				url: "main",   
				data: "option=function&code="+encodeURIComponent(make_list[s][5]),
				success: function(response) {
					var flowDatas = [];
					var flowDetails = [];					
					var test_ajax = jQuery.parseJSON(response);
					if(test_ajax!=null && $('.flowBG').css('display') == 'none' ){
						var length = test_ajax.stmOrgin.length;
						for ( var t = 1; t < length; t++) {
							flowDatas.push(test_ajax.stmOrgin[t]);
						}
						for ( var t = 1; t < length; t++) {
							flowDetails.push(test_ajax.stmDetail[t]);
						}
						drawDiagram(flowDatas,flowDetails);

						before = s;
						
						$('.flowBG').show('fast', function(){});
						
					} else if (test_ajax!=null && $('.flowBG').css('display') == 'block' && s!=before) {
						
						document.getElementById('flowBG').style.display = 'none';
						var length = test_ajax.stmOrgin.length;
						for ( var t = 1; t < length; t++) {
							flowDatas.push(test_ajax.stmOrgin[t]);
						}
						for ( var t = 1; t < length; t++) {
							flowDetails.push(test_ajax.stmDetail[t]);
						}
						drawDiagram(flowDatas,flowDetails);
						
						before = s;
						
						document.getElementById('flowBG').style.display = 'block';
						
					} else {
						console.log('33');
						//document.getElementById('flowBG').style.display = 'none';
						$('.flowBG').hide('fast');
					}
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
	//m_texts[i].click(clickAjax(-1));
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
		m_shapes.attr({"stroke":"#333","stroke-width": 1.5,"fill":"white"});
		m_caption_rect.attr({"fill":"white","stroke":"#333","stroke-width": 0.8});
		m_caption_hides.attr({"stroke":"#333","stroke-width": 0.8,"fill":"#ddd"});
	}
	else if(argu == "Divide"){	
		m_shapes[0].attr({fill: divide_color[3], stroke: "black", "fill-opacity": 0.9, "stroke-width": 0.6});	
		m_caption_rect[0].attr({fill: divide_color[3], stroke: "black", "fill-opacity": 0.7, "stroke-width": 0.5});
		m_caption_hides[0].attr({fill: divide_color[3], stroke: "black", "fill-opacity": 0.5, "stroke-width": 0.5});			
		for(var i = 1 , count = m_shapes.length; i<count;i++){
			var color; 
			if(make_list[i-1][6]=="Expression"){
				color = divide_color[0];
			}else if(make_list[i-1][6]=="Anonymous"){
				color = divide_color[1];				
			}else if(make_list[i-1][6]=="Declaration"){
				color = divide_color[3];				
			}else{
				color = divide_color[6];				
			}
			m_shapes[i].attr({fill: color, stroke: "black", "fill-opacity": 0.9, "stroke-width": 0.6});	
			m_caption_rect[i].attr({fill: color, stroke: "black", "fill-opacity": 0.7, "stroke-width": 0.5});
			m_caption_hides[i].attr({fill: color, stroke: "black", "fill-opacity": 0.5, "stroke-width": 0.5});			
		};		
	}
	else if(argu == "Colorful"){
		m_shapes[0].attr({fill:"#f5fffa" , stroke: "black", "fill-opacity": 0.9, "stroke-width": 0.6});	
		m_caption_rect[0].attr({fill: "#f5fffa", stroke: "black", "fill-opacity": 0.7, "stroke-width": 0.5});
		m_caption_hides[0].attr({fill: "#f5fffa", stroke: "black", "fill-opacity": 0.5, "stroke-width": 0.5});			
		for(var i = 1 , count = m_shapes.length; i<count;i++){
			var color = divide_color[make_list[i-1][0]];
			m_shapes[i].attr({fill:color , stroke: "black", "fill-opacity": 0.9, "stroke-width": 0.6});	
			m_caption_rect[i].attr({fill: color, stroke: "black", "fill-opacity": 0.7, "stroke-width": 0.5});
			m_caption_hides[i].attr({fill: color, stroke: "black", "fill-opacity": 0.5, "stroke-width": 0.5 });			
		};
	}
};
Raphael.fn.rhombus = function (x,y,color){
	var rhombus = this.path("M "+x+" "+y+" l60 -25 l60 25 l-60 25 l-60 -25").attr("fill",color);
	rhombus.data("x",rhombus.attrs.path[0][1]);
	rhombus.data("y",rhombus.attrs.path[0][2]);
	rhombus.data("height",rhombus.attrs.path[4][2] - rhombus.attrs.path[1][2]);
	rhombus.data("width",rhombus.attrs.path[1][1] - rhombus.attrs.path[0][1]);
	return rhombus;
};

Raphael.fn.arrow = function (x1, y1, x2, y2, size , color) {
	var angle = Math.atan2(x1-x2,y2-y1);
	angle = (angle / (2 * Math.PI)) * 360;
	var arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2 - size) + " " + (y2 - size) + " L" + (x2 - size) + " " + (y2 + size) + " L" + x2 + " " + y2 ).attr({"fill":color,"stroke":color}).rotate((90+angle),x2,y2);
	var linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2).attr ("stroke", color);
	return [linePath,arrowPath];
};
function DrawGraphLine(paper,start,end,type,color){
	var startPosX;
	var startPosY;
	var endPosX;
	var endPosY;
	if(type == "right"){
		startPosX = start.attrs.x + start.attrs.width;
		startPosY = start.attrs.y + start.attrs.height/2; 
		endPosX = end.attrs.x;
		endPosY = end.attrs.y + end.attrs.height/2;		
	}else if(type == "down"){
		startPosX = start.attrs.x + start.attrs.width/2;
		startPosY = start.attrs.y + start.attrs.height; 
		endPosX = end.attrs.x + end.attrs.width/2;
		endPosY = end.attrs.y;		
	}else{

	}
	paper.arrow(startPosX,startPosY,endPosX,endPosY,0,color);
}
function DrawGraphArrow(paper,start,end,type,color){
	var startPosX;
	var startPosY;
	var endPosX;
	if(type == "right"){
		startPosX = start.attrs.x + start.attrs.width;
		startPosY = start.attrs.y + start.attrs.height/2; 
		endPosX = end.attrs.x;
		endPosY = end.attrs.y + end.attrs.height/2;		
	}else if(type == "down"){
		startPosX = start.attrs.x + start.attrs.width/2;
		startPosY = start.attrs.y + start.attrs.height; 
		endPosX = end.attrs.x + end.attrs.width/2;
		endPosY = end.attrs.y;		
	}else{ 

	}
	paper.arrow(startPosX,startPosY,endPosX,endPosY,5,color);
}
function drawDiagram(datas,realdata){
	if(!datas.length == 0){
		var graphs_texts = [];
		var graphs = [];
		var colorful_graphs = [];
		var array_height = datas.length;
		var array_width = datas[0].length;
		var chartlength =  array_width * 75;// = 400;
		var chartheight = array_height * 35 + 200;// = 600;
		var startnode;
		var endnode;
		var widthSize = 90;
		var heightSize = 30;
		$('#flowCont').html('');
		$('#flowCont').width(chartlength-10).height(chartheight-10);		
		$('#flowBG').width(chartlength).height(chartheight);

		var DiagramRaphael = Raphael("flowCont", "100%", "100%");
		DiagramRaphael.clear();
		for(var i=0;i<array_height;i++){
			var array = [];
			for(var j=0;j<array_width;j++){
				array.push("0");
			}
			graphs_texts.push(array);
		}
		startnode = DiagramRaphael.rect(65, 40, 50, 50, 5).attr({fill: "white", stroke: "black", "stroke-width": 2});
		DiagramRaphael.text(90, 35 ,"start").attr({font: "10px Helvetica", opacity: 1.0,fill:"black",});											
		for(var i=0 ; i < array_height ; i++){
			var logical = [];          
			var colorful_logical=[];
			for(var j=0 ; j < array_width ; j++){
				var index = datas[i][j];
				if(index!="0"){
					if(index=="if"||index=="elif"||index=="else"||index=="for"||index=="while"||index=="do"||index=="switch"||index=="try"||index=="catch"){
						logical.push(DiagramRaphael.rect( 89 + j * widthSize, 150 + i * heightSize, 1, 1, 5 ));
						colorful_logical.push(DiagramRaphael.rhombus(30 + j * widthSize, 145 + i * heightSize,"white"));
					}
					else if(index=="1"||index=="case"||index=="default"||index=="func"){
						logical.push(DiagramRaphael.rect( 54 + j * widthSize, 135 + i * heightSize, 70, 40, 5 ));					
						colorful_logical.push("");
					}else if(index=="R"){
						logical.push(DiagramRaphael.rect( 89 + j * widthSize, 154 + i * heightSize, 0, 0, 5 ));						
						colorful_logical.push("");
					}else{
						logical.push(DiagramRaphael.rect( 89 + j * widthSize, 160 + i * heightSize, 1, 1, 5 ));	
						colorful_logical.push("");
					}
				}else{
					logical.push("");				
					colorful_logical.push("");
				}
			}
			graphs.push(logical);
			colorful_graphs.push(colorful_logical);

			if(i==array_height-1){
				endnode = DiagramRaphael.rect(65, 160 + i * heightSize, 50, 50, 5).attr({fill: "white", stroke: "black", "stroke-width": 2});
				DiagramRaphael.text(90, 95 + i * (heightSize-15) ,"end").attr({font: "10px Helvetica", opacity: 1.0,fill:"black"});											
			}
		}
		try{
			for(var i=0 ; i < array_height ; i++){
				for(var j=0 ; j < array_width ; j++){
					var argu = datas[i][j];
					if(argu=="line"){
						var casebreak = false;
						for(var l1 = i-1;;l1--){
							if(datas[l1][j]!="0"){
								if(datas[l1][j]=="caseN"&&datas[i-1][j+1]!="breakN"){
									casebreak = true;
									break;
								}
								else{
									break;
								}						
							}
						}
						if(!casebreak&&datas[i][j+1]=="line"){
							DiagramRaphael.connections(graphs[i][j+1] , graphs[i][j], "black");					
						}

						if(i+1<array_height&&datas[i+1][j]!="0"&&datas[i+1][j]!="R"){
							DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "black");										
						}
						for(var k=i-1;k>0;k--){
							if(datas[k][j]!="0"){
								if(datas[k][j]!="swN"){
									DiagramRaphael.connections(graphs[k][j] , graphs[i][j], "black");																	
								}
								break;
							}
						}
					}
					if(argu=="if"){
						if(i>0&&datas[i-1][j]!="0"&&datas[i-1][j]!="R"){
							DiagramRaphael.connections(graphs[i][j] ,graphs[i-1][j] , "black");
						}
						DiagramRaphael.connections(graphs[i+1][j], graphs[i][j] , "red");
						DiagramRaphael.connections(graphs[i][j] ,graphs[i][j+1] , "green");				
						DiagramRaphael.connections(graphs[i][j+1] ,graphs[i+1][j+1] , "green");
						DiagramRaphael.text(65 + j * widthSize, 87 + i * (heightSize - 15) ,"n o").attr({font: "10px Helvetica", opacity: 1.0,fill:"red"});
						DiagramRaphael.text(157 + j * widthSize, 70 + i * (heightSize - 15) ,"y e s").attr({font: "10px Helvetica", opacity: 1.0,fill:"green"});
					}
					else if(argu=="elif"){
						for(var i1 = i-1;i1>0;i1--){
							if(datas[i1][j]=="if"||datas[i1][j]=="elif"){
								DiagramRaphael.connections(graphs[i1+1][j] , graphs[i][j], "black");																	
								break;
							}
						}
						DiagramRaphael.connections(graphs[i][j] ,graphs[i][j+1] , "green");				
						DiagramRaphael.connections(graphs[i][j+1] ,graphs[i+1][j+1] , "green");
						DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "red");
						DiagramRaphael.text(65 + j * widthSize, 87 + i * (heightSize - 15) ,"n o").attr({font: "10px Helvetica", opacity: 1.0,fill:"red"});
						DiagramRaphael.text(157 + j * widthSize, 70 + i * (heightSize - 15) ,"y e s").attr({font: "10px Helvetica", opacity: 1.0,fill:"green"});
					}
					else if(argu=="elifN"){
						if(datas[i+1][j]!="0"){
							DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "black");					
						}
					}else if(argu=="do"){
						if(i>0&&graphs[i-1][j]!=""){
							DiagramRaphael.connections(graphs[i][j] ,graphs[i-1][j] , "black");
						}
						DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "black");
						DiagramRaphael.connections(graphs[i+1][j+1] ,graphs[i][j] , "black");
					}else if(argu=="for"){
						if(i>0&&graphs[i-1][j]!=""){
							DiagramRaphael.connections(graphs[i][j] ,graphs[i-1][j] , "black");
						}
						DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "red");

						DiagramRaphael.connections(graphs[i][j] ,graphs[i][j+1] , "green");				
						DiagramRaphael.connections(graphs[i][j+1] ,graphs[i+1][j+1] , "green");
						DiagramRaphael.connectionsleft(graphs[i+1][j+1] ,graphs[i][j], "black");				
						DiagramRaphael.text(65 + j * widthSize, 87 + i * (heightSize - 15) ,"n o").attr({font: "10px Helvetica", opacity: 1.0,fill:"red"});
						DiagramRaphael.text(157 + j * widthSize, 70 + i * (heightSize - 15) ,"y e s").attr({font: "10px Helvetica", opacity: 1.0,fill:"green"});
					}else if(argu=="case"){
						if(i>0&&graphs[i-1][j]!=""){
							DiagramRaphael.connections(graphs[i][j] ,graphs[i-1][j] , "black");
						}
						DiagramRaphael.connections(graphs[i+1][j], graphs[i][j] , "red");
						DrawGraphLine(DiagramRaphael,graphs[i][j],graphs[i][j+1],"right","green");
						DrawGraphLine(DiagramRaphael,graphs[i][j+1],graphs[i+1][j+1],"down","green");
						DiagramRaphael.text(65 + j * widthSize, 95 + i * (heightSize - 15) ,"n o").attr({font: "10px Helvetica", opacity: 1.0,fill:"red"});
						DiagramRaphael.text(157 + j * widthSize, 70 + i * (heightSize - 15) ,"y e s").attr({font: "10px Helvetica", opacity: 1.0,fill:"green"});
						if(datas[i-1][j+1]=="line"&&datas[i-2][j+1]!="breakN"){
							DrawGraphLine(DiagramRaphael,graphs[i-1][j+1],graphs[i][j+1],"down","black");
						}
					}
					else if(argu=="break"){
						DiagramRaphael.connections(graphs[i][j], graphs[i+1][j] , "black");						
						DiagramRaphael.connections(graphs[i-1][j], graphs[i][j] , "black");	
						if(i+2<array_height&&datas[i+2][j]!="line"&&datas[i+2][j]!="0"){
							graphs[i][j-1] = DiagramRaphael.rect( 89 + (j-1) * widthSize, 160 + i * heightSize, 1, 1, 5 );
							DrawGraphLine(DiagramRaphael,graphs[i][j-1],graphs[i][j],"right","red");							
						}
					}
					else if(argu=="default"){
						if(i>0&&graphs[i-1][j]!=""){
							DiagramRaphael.connections(graphs[i][j] ,graphs[i-1][j] , "black");
						}
						DiagramRaphael.connections(graphs[i+1][j], graphs[i][j] , "red");
						DrawGraphLine(DiagramRaphael,graphs[i][j],graphs[i][j+1],"right","green");
						DrawGraphLine(DiagramRaphael,graphs[i][j+1],graphs[i+1][j+1],"down","green");
						DiagramRaphael.text(65 + j * widthSize, 95 + i * (heightSize - 15) ,"n o").attr({font: "10px Helvetica", opacity: 1.0,fill:"red"});
						DiagramRaphael.text(157 + j * widthSize, 70 + i * (heightSize - 15) ,"y e s").attr({font: "10px Helvetica", opacity: 1.0,fill:"green"});
					}else if(argu=="try"){
						DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "black");
						DiagramRaphael.connections(graphs[i][j] ,graphs[i][j+1] , "black");				
						DiagramRaphael.connections(graphs[i][j+1] ,graphs[i+1][j+1] , "black");
					}else if(argu=="catch"){
						DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "black");					
						DiagramRaphael.connections(graphs[i][j] ,graphs[i][j+1] , "black");				
						DiagramRaphael.connections(graphs[i][j+1] ,graphs[i+1][j+1] , "black");
					}else if(argu=="func"){
						if(i>0&&graphs[i-1][j]!=""){
							DiagramRaphael.connections(graphs[i][j] ,graphs[i-1][j] , "black");
						}
						DiagramRaphael.connections(graphs[i+1][j], graphs[i][j] , "black");
					}else if(argu=="switch"){
						if(i>0&&graphs[i-1][j]!=""){
							DiagramRaphael.connections(graphs[i][j] ,graphs[i-1][j] , "black");
						}
						DiagramRaphael.connections(graphs[i+1][j] ,graphs[i][j] , "black");				
					}else if(argu=="while"){
						if(datas[i+1][j+1]=="whileY"){
							if(i>0&&graphs[i-1][j]!=""){
								DiagramRaphael.connections(graphs[i][j] ,graphs[i-1][j] , "green");
							}
							DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "black");
						}else{
							if(i>0&&graphs[i-1][j]!=""){
								DiagramRaphael.connections(graphs[i][j] ,graphs[i-1][j] , "black");
							}
							DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "red");
							DiagramRaphael.connections(graphs[i][j] ,graphs[i][j+1] , "green");				
							DiagramRaphael.connections(graphs[i][j+1] ,graphs[i+1][j+1] , "green");
							DiagramRaphael.connectionsleft(graphs[i+1][j+1] ,graphs[i][j], "black");
							DiagramRaphael.text(65 + j * widthSize, 87 + i * (heightSize - 15) ,"n o").attr({font: "10px Helvetica", opacity: 1.0,fill:"red"});
							DiagramRaphael.text(157 + j * widthSize, 70 + i * (heightSize - 15) ,"y e s").attr({font: "10px Helvetica", opacity: 1.0,fill:"green"});
						}
						if(graphs[i+2][j]!=""){
							DiagramRaphael.connections(graphs[i+2][j] ,graphs[i+1][j] , "black");					
						}
					}	
					else if(argu=="else"){

						for(var i1 = i-1;i1>0;i1--){
							if(datas[i1][j]=="if"||datas[i1][j]=="elif"){
								DiagramRaphael.connections(graphs[i1+1][j] , graphs[i][j], "black");																	
								break;
							}
						}
						DiagramRaphael.connections(graphs[i][j] ,graphs[i][j+1] , "green");				
						DiagramRaphael.connections(graphs[i][j+1] ,graphs[i+1][j+1] , "green");
						DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "red");																	
						DiagramRaphael.text(65 + j * widthSize, 87 + i * (heightSize - 15) ,"n o").attr({font: "10px Helvetica", opacity: 1.0,fill:"red"});
						DiagramRaphael.text(157 + j * widthSize, 70 + i * (heightSize - 15) ,"y e s").attr({font: "10px Helvetica", opacity: 1.0,fill:"green"});

					}
					else if(argu=="1"){
						DiagramRaphael.connections(graphs[i+1][j] , graphs[i][j], "black");
						if(i+2<array_height&&datas[i+2][j]!="0"){
							DiagramRaphael.connections(graphs[i+2][j] , graphs[i][j], "black");					
						}
					}
					else if(argu=="ifY"||argu=="elifY"||argu=="elseY"||argu=="doY"||argu=="caseY"||argu=="catchY"){
						DiagramRaphael.connections(graphs[i][j-1] , graphs[i][j], "black");
					}
					if( graphs[i][j]!="" ){
						graphs[i][j].attr({fill: "white", stroke: "black", "stroke-width": 2});
					}
				}
			}
			DiagramRaphael.connections(graphs[0][0], startnode , "black");
			DiagramRaphael.connections(graphs[array_height-1][0] ,endnode ,"black");

			for(var i=0;i<realdata.length;i++){
				for(var j=0;j<realdata[0].length;j++){
					var index = datas[i][j];
					var text = realdata[i][j];
					if(text!="0"){	
						if(text.length > 14){
							if(index == "for"||index == "if"||index == "elif"||index == "else"||index=="do"||index=="switch"||index == "while"||index == "try"||index == "catch"){
								graphs_texts[i][j] = ([DiagramRaphael.text(90 + j * widthSize, 74 + i * (heightSize-15) ,text.substr(0,14)+"..").attr({font: "10px Helvetica", opacity: 1.0,fill:"black",cursor: "pointer"}).show().click(flowChartOver(graphs_texts,i,j)),
								                       DiagramRaphael.text(90 + j * widthSize, 74 + i * (heightSize-15) ,text).attr({font: "10px Helvetica", opacity: 1.0,fill:"black",cursor: "pointer"}).hide().click(flowChartUp(graphs_texts,i,j))]);																
							}else if(index=="func"){
								graphs_texts[i][j] = ([DiagramRaphael.text(90 + j * widthSize, 79 + i * (heightSize-15) ,text.substr(0,14)+"..").attr({font: "10px Helvetica", opacity: 1.0,fill:"black",cursor: "pointer"}).show().click(flowChartOver(graphs_texts,i,j)),
								                       DiagramRaphael.text(90 + j * widthSize, 79 + i * (heightSize-15) ,text).attr({font: "10px Helvetica", opacity: 1.0,fill:"black",cursor: "pointer"}).hide().click(flowChartUp(graphs_texts,i,j))]);																					
							}else if(index=="break"){
								graphs_texts[i][j] = ([DiagramRaphael.text(70 + j * widthSize, 88 + i * (heightSize-15) ,text.substr(0,14)+"..").attr({font: "10px Helvetica", opacity: 1.0,fill:"red",cursor: "pointer"}).show().click(flowChartOver(graphs_texts,i,j)),
								                       DiagramRaphael.text(70 + j * widthSize, 88 + i * (heightSize-15) ,text).attr({font: "10px Helvetica", opacity: 1.0,fill:"black",cursor: "pointer"}).hide().click(flowChartUp(graphs_texts,i,j))]);																					
							}else{
								graphs_texts[i][j] = ([DiagramRaphael.text(90 + j * widthSize, 79 + i * (heightSize-15) ,text.substr(0,14)+"..").attr({font: "10px Helvetica", opacity: 1.0,fill:"black",cursor: "pointer"}).show().click(flowChartOver(graphs_texts,i,j)),
								                       DiagramRaphael.text(90 + j * widthSize, 79 + i * (heightSize-15) ,text).attr({font: "10px Helvetica", opacity: 1.0,fill:"black",cursor: "pointer"}).hide().click(flowChartUp(graphs_texts,i,j))]);
							}
						}else{
							if(index == "for"||index == "if"||index == "elif"||index == "else"||index=="do"||index=="switch"||index == "while"||index == "try"||index == "catch"){
								DiagramRaphael.text(90 + j * widthSize, 74 + i * (heightSize-15) ,text).attr({font: "10px Helvetica", opacity: 1.0,fill:"black"});																
							}else if(index=="func"){
								DiagramRaphael.text(90 + j * widthSize, 79 + i * (heightSize-15) ,text).attr({font: "10px Helvetica", opacity: 1.0,fill:"black"});																					
							}else if(index=="break"){
								DiagramRaphael.text(70 + j * widthSize, 88 + i * (heightSize-15) ,text).attr({font: "10px Helvetica", opacity: 1.0,fill:"red"});																					
							}else{
								DiagramRaphael.text(90 + j * widthSize, 79 + i * (heightSize-15) ,text).attr({font: "10px Helvetica", opacity: 1.0,fill:"black"});
							}

						}
					}
				}
			}
		}
		catch(err){
			
		}	
	}
}
var flowChartOver = function(array,i,j){
	return function(){
		array[i][j][0].hide();
		array[i][j][1].show();
	}
};
var flowChartUp= function(array,i,j){
	return function(){
		array[i][j][1].hide();
		array[i][j][0].show();		
	}
};
$(document).ready(function() {
	
});
