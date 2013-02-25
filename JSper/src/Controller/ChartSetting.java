package Controller;


class ChartSetting{
	private int depth;
	private String value[][];
	private int lengthX;
	private int lengthY;
	private String chart[][];
	private String details[][];
	private int mapX, mapY;
	private int indexX;
	private int depthcase;
	private String realOrigins[][];
	private String realDetails[][];
	
	public String[][] getRealOrigins() {
		return realOrigins;
	}
	public String[][] getRealDetails() {
		return realDetails;
	}
	public int realLengthX(){
		return mapX+1;
	}
	public int realLengthY(){
		return lengthY;
	}
	public int lengthX(){
		return lengthX;
	}
	public int lengthY(){
		return lengthY;		
	}
	public String[][] originChart(){
		return chart;
	}
	public String[][] detailChart(){
		return details;
	}
	public ChartSetting(){
		mapX = 0;
		mapY = 0;
		indexX = 0; 
	}
	public void CheckChart(int depths,String array[][]){
		depth = depths;
		value = array;
		lengthX = value.length*3;
		lengthY = depth+3;
		chart = new String[lengthX][lengthY];
		details = new String[lengthX][lengthY];
		depthcase = 0;
		int startDepth = 0;
		for(int i=0;i<lengthX;i++){
			for(int j=0;j<lengthY;j++){
				chart[i][j] = "0";
				details[i][j] = "0";
			}
		}
		
		for(int k=0;k<value.length;k++){
			int depth = Integer.parseInt(value[indexX][0]);
			String subname = value[indexX][2];
			subname = subname.trim();
			if( startDepth == depth){
				mapX+=1;
				setChart(subname);
				depthcase = 0;
			}else if(startDepth < depth){
				startDepth = depth;
				mapY +=1;
				setChart(subname);
				depthcase = 1;
			}else if(startDepth > depth){
				for(int j=0;j<startDepth - depth;j++){
					mapY -=1;					
				}
				mapX +=2;
				startDepth = depth;
				setChart(subname);
				depthcase=2;
			}
			mapX +=1;
			indexX++;
		}
		if( depthcase == 2||depthcase == 1 ){
			mapX++;
			for(int te = 0; chart[mapX-1][te]!="0"&&te<value.length ;te++){
				chart[mapX][te] = "line";						
			}			
		}
		else if( depthcase == 0 ){
			for(int te = 0; chart[mapX-1][te]!="0"&&te<value.length ;te++){
				chart[mapX][te] = "line";						
			}
		}
		for(int i=1;i<mapX+1;i++){
			int checkup = 0;
			int checkdown = 0;
			boolean line = false;
			for(int j=0;j<lengthY;j++){
				if(chart[i][j]!="0"){
					line = true;
					break;
				}
			}
			if(!line){
				for(int j=lengthY-1;j>=0;j--){
					if(chart[i-1][j]!="0"&&chart[i-1][j]!="R"){
						checkup = j;
						break;
					}
				}
				for(int j=lengthY-1;j>=0;j--){
					if(chart[i+1][j]!="0"&&chart[i+1][j]!="R"){
						checkdown = j;
						break;
					}
				}
				for(int j=checkdown;j<checkup+1;j++){
					chart[i][j] ="line";
				}
			}
		}
		realOrigins = new String[mapX+1][lengthY];
		realDetails = new String[mapX+1][lengthY];
		for(int i=0;i<mapX+1;i++){
			for(int j=0;j<lengthY;j++){				
				realOrigins[i][j] = chart[i][j];
				realDetails[i][j] = details[i][j];
			}
		}
	}
	private void setChart(String name){
		if(value[indexX][1].equals("if")){
			ifchart(mapX, mapY,name);
		}else if(value[indexX][1].equals("elif")){
			elseifchart(mapX, mapY,name);
		}else if(value[indexX][1].equals("else")){
			elsechart(mapX, mapY,name);
		}else if(value[indexX][1].equals("for")){
			forchart(mapX, mapY,name);
		}else if(value[indexX][1].equals("while")){
			whilechart(mapX, mapY,name);					
		}else if(value[indexX][1].equals("do")){
			dochart(mapX, mapY,name);					
		}else if(value[indexX][1].equals("switch")){
			switchchart(mapX, mapY,name);					
		}else if(value[indexX][1].equals("case")){
			casechart(mapX, mapY,name);					
		}else if(value[indexX][1].equals("func")){
			funcchart(mapX, mapY,name);					
		}else if(value[indexX][1].equals("break")){
			breakchart(mapX, mapY,name);					
		}else if(value[indexX][1].equals("catch")){
			catchchart(mapX, mapY,name);			
		}else if(value[indexX][1].equals("try")){
			trychart(mapX, mapY,name);			
		}else if(value[indexX][1].equals("default")){
			defaultchart(mapX, mapY,name);						
		}else{
			fordeclation(mapX, mapY,name);
		}
		
	}
	private void defaultchart(int x,int y,String change){
		chart[x][y] = "default";
		details[x][y] = change;		
		chart[x][y+1] = "R";
		chart[x+1][y] = "defaultN";
		chart[x+1][y+1] = "defaultY";		
	}
	private void trychart(int x,int y,String change){
		chart[x][y] = "try";
		chart[x][y+1] = "R";
		chart[x+1][y] = "textN";
		details[x][y] = change;
	}
	private void catchchart(int x,int y,String change){
		chart[x][y] = "catch";
		details[x][y] = change;
		chart[x][y+1] = "R";
		chart[x+1][y] = "catchN";
		chart[x+1][y+1] = "catchY";			}
	private void breakchart(int x,int y,String change){
		chart[x][y] = "break";
		chart[x+1][y] = "breakN";
		details[x][y] = change;
	}
	private void funcchart(int x,int y,String change){
		chart[x][y] = "func";
		details[x][y] = change;
		chart[x+1][y] = "funcN";
	}
	private void fordeclation(int x,int y,String change){
		chart[x][y] = "1";
		details[x][y] = change;		
		chart[x+1][y] = "textN";
	}
	private void switchchart(int x,int y,String change){
		chart[x][y] = "switch";
		details[x][y] = change;
		chart[x+1][y] = "swN";
	}
	private void casechart(int x,int y,String change){
		chart[x][y] = "case";
		details[x][y] = change;		
		chart[x][y+1] = "R";
		chart[x+1][y] = "caseN";
		chart[x+1][y+1] = "caseY";		
	}
	private void dochart(int x,int y,String change){
		chart[x][y] = "do";
		details[x][y] = change;
		chart[x+1][y] = "doN";
		chart[x+1][y+1] = "doY";		
	}
	private void ifchart(int x,int y,String change){
		chart[x][y] = "if";
		details[x][y] = change;
		chart[x+1][y] = "ifN";
		chart[x+1][y+1] = "ifY";
		chart[x][y+1] = "R";
	}
	private void forchart(int x,int y,String change){
		chart[x][y] = "for";
		details[x][y] = change;
		chart[x+1][y] = "forN";
		chart[x+1][y+1] = "forY";
		chart[x][y+1] = "R";
	}
	private void elseifchart(int x,int y,String change){
		chart[x][y] = "elif";
		details[x][y] = change;
		chart[x+1][y] = "elifN";
		chart[x+1][y+1] = "elifY";
		chart[x][y+1] = "R";
	}
	private void elsechart(int x,int y,String change){
		chart[x][y] = "else";
		details[x][y] = change;
		chart[x+1][y] = "elseN";
		chart[x+1][y+1] = "elseY";
		chart[x][y+1] = "R";
	}
	private void whilechart(int x,int y,String change){
		chart[x][y] = "while";
		details[x][y] = change;
		chart[x+1][y] = "whileN";
		chart[x+1][y+1] = "whileY";
		chart[x][y+1] = "R";
	}
}