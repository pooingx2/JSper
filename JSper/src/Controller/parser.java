package Controller;
//출력값을 보면 알 수 있을꺼야
public class parser {
	public static void printchart(String chart[][],int limitX,int limitY){
		System.out.println("[");
		for(int i=1;i<limitX;i++){
			System.out.print("[");
			for(int j=0;j<limitY;j++){
				if(j!=limitY-1){
					System.out.print( "\""+ chart[i][j]+"\"," );					
				}else{
					System.out.print( "\""+ chart[i][j]+"\"" );										
				}
			}
			if(i!=limitX-1){
				System.out.println("],");				
			}else{
				System.out.println("]");				
			}
		}
		System.out.println("];");
	}
	
	public static void main(String[] args){
		String test[][] = {{"0","func","goo(input)"},{"0","func","voo(input)"},{"0","if","if(m>2)"},{"1","switch","switch(n)"},{"1","case","case 1:"},{"2","var","m++"},{"1","case","case 2:"},{"2","var","l--"},{"2","break","break"},{"1","if","if(m>5)"},{"2","var","k = 3"},{"2","do","do"},{"3","var","n++"},{"2","while","while(true)"},{"2","var","k = 2"},{"2","if","if(m<4)"},{"3","var"," k = 3"},{"1","elseif","else if(m>39)"},{"2","if","if(l<4)"},{"3","var","k=3"},{"1","elseif","else if(m>54)"},{"2","var","m++"},{"1","else","else"},{"2","var","var l--"},{"1","var","l--"},{"0","elseif","else if(ef<3)"},{"0","else","else"},{"1","var","var k = 3"},{"0","while","while(dlkwj)"},{"1","var","j++"}};
//		String test[][] = {{"0","if","if(m>2)"},{"0","do","do"},{"1","var","k++"},{"1","var","l--"},{"1","if","if(m>2)"},{"2","var","break"},{"0","while","while(m==0)"},{"0","else","else"},{"1","var","m++"}};
//		String test[][] = {{"0","if","if(m>2)"},{"0","switch","switch(m)"},{"1","case","case 1:"},{"2","var","l--"},{"1","case","case 2:"},{"2","var","l++"},{"0","while","while(m==0)"},{"0","else","else"},{"1","var","m++"}};
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
			String subname = value[indexX][2];
			if(subname.length()>20){
				subname = subname.substring(0,20);
			}
			if( startDepth == depth){
					mapX+=1;
				drawChart(subname);
			}else if(startDepth < depth){
				startDepth = depth;
				mapY +=1;
				drawChart(subname);				
			}else if(startDepth > depth){
				for(int j=0;j<startDepth - depth;j++){
					mapY -=1;					
				}
				mapX +=2;
				startDepth = depth;
				drawChart(subname);
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
	}
	private void drawChart(String name){
		if(value[indexX][1].equals("if")){
			ifchart(mapX, mapY,name);
		}else if(value[indexX][1].equals("elseif")){
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
		}else{
			fordeclation(mapX, mapY,name);
		}
	}
	private void breakchart(int x,int y,String change){
		chart[x][y] = "break";
		details[x][y] = change;
		mapX--;
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


