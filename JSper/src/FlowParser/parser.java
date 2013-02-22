package FlowParser;
//출력값을 보면 알 수 있을꺼야
public class parser {
	public static void printchart(String chart[][],int limitX,int limitY){
		System.out.println("[");
		for(int i=1;i<limitX;i++){
			System.out.print("[");
			for(int j=0;j<limitY;j++){
				System.out.print( "\""+ chart[i][j]+"\"," );
			}
			System.out.println("],");
		}
		System.out.println("]");
	}
	
	public static void main(String[] args){
		String test[][] = {{"0","if","if(m>2)"},{"1","if","if(m>5)"},{"2","var","k = 3"},{"2","while","while(true)"},{"3","var","k = 3"},{"3","var","k = 8"},{"2","var","k = 2"},{"2","if","if(m<4)"},{"3","var"," k = 3"},{"1","elseif","else if(m>39)"},{"2","if","if(l<4)"},{"3","var","k=3"},{"1","elseif","else if(m>54)"},{"2","var","m++"},{"1","else","else"},{"2","var","var l--"},{"1","var","l--"},{"0","elseif","else if(ef<3)"},{"0","else","else"},{"1","var","var k = 3"}};
		DrawChart a = new DrawChart();
		a.CheckChart(4,test);//차트 파싱
		
		String[][] originChart = a.originChart();//첫번째 차트
		String[][] detailChart = a.detailChart();//두번째 차트
		
		printchart(originChart, a.realLengthX(), a.realLengthY());//첫번째 차트 출력해보려면
		printchart(detailChart, a.realLengthX(), a.realLengthY());//두번째 차트 출력해보려면
	}
}

class DrawChart{
	private int depth;
	private String value[][];
	private int lengthX;
	private int lengthY;
	private String chart[][];
	private String details[][];
	private int mapX = 0,mapY = 0;
	private int indexX = 0; 
	
	public int realLengthX(){
		return mapX;
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
	public void CheckChart(int depths,String array[][]){
		depth = depths;
		value = array;
		lengthX = value.length*3;
		lengthY = depth+2;
		chart = new String[lengthX][lengthY];
		details = new String[lengthX][lengthY];

		int startDepth = 0;
		for(int i=0;i<lengthX;i++){
			for(int j=0;j<lengthY;j++){
				chart[i][j] = "0";
				details[i][j] = "0";
			}
		}
		for(int k=0;k<value.length;k++){
			int depth = Integer.parseInt(value[indexX][0]);
			if( startDepth == depth){
				mapX+=1;
				if(value[indexX][1].equals("if")){
					ifchart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("elseif")){
					elseifchart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("else")){
					elsechart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("for")){
					forchart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("while")){
					whilechart(mapX, mapY,value[indexX][2]);					
				}else{
					fordeclation(mapX, mapY,value[indexX][2]);
				}
			}else if(startDepth < depth){
				startDepth = depth;
				mapY +=1;
				if(value[indexX][1].equals("if")){
					ifchart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("elseif")){
					elseifchart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("else")){
					elsechart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("for")){
					forchart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("while")){
					whilechart(mapX, mapY,value[indexX][2]);					
				}else{
					fordeclation(mapX, mapY,value[indexX][2]);
				}			
			}else if(startDepth > depth){
				for(int j=0;j<startDepth - depth;j++){
					mapY -=1;					
				}
				mapX +=2;
				startDepth = depth;
				if(value[indexX][1].equals("if")){
					ifchart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("elseif")){
					elseifchart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("else")){
					elsechart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("for")){
					forchart(mapX, mapY,value[indexX][2]);
				}else if(value[indexX][1].equals("while")){
					whilechart(mapX, mapY,value[indexX][2]);					
				}else{
					fordeclation(mapX, mapY,value[indexX][2]);
				}			
			}
			mapX +=1;
			indexX++;
			if(k == value.length-1){
				for(int te = 0; chart[mapX-1][te]!="0" ;te++){
					chart[mapX][te] = "line";
				}
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
					if(chart[i-1][j]!="0"){
						checkup = j;
						break;
					}
				}
				for(int j=lengthY-1;j>=0;j--){
					if(chart[i+1][j]!="0"){
						checkdown = j;
						break;
					}
				}
				for(int j=checkdown;j<checkup+1;j++){
					chart[i][j] ="line";
				}
			}
		}
	}
	private void fordeclation(int x,int y,String change){
		chart[x][y] = "1";
		details[x][y] = change;		
		chart[x+1][y] = "textN";
	}
	private void ifchart(int x,int y,String change){
		chart[x][y] = "if";
		details[x][y] = change;
		chart[x+1][y] = "ifN";
		chart[x+1][y+1] = "ifY";
	}
	private void forchart(int x,int y,String change){
		chart[x][y] = "for";
		details[x][y] = change;
		chart[x+1][y] = "forN";
		chart[x+1][y+1] = "forY";
	}
	private void elseifchart(int x,int y,String change){
		chart[x][y] = "elif";
		details[x][y] = change;
		chart[x+1][y] = "elifN";
		chart[x+1][y+1] = "elifY";
	}
	private void elsechart(int x,int y,String change){
		chart[x][y] = "else";
		details[x][y] = change;
		chart[x+1][y] = "elseN";
		chart[x+1][y+1] = "elseY";
	}
	private void whilechart(int x,int y,String change){
		chart[x][y] = "while";
		details[x][y] = change;
		chart[x+1][y] = "whileN";
		chart[x+1][y+1] = "whileY";
	}
}


