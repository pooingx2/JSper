package Controller;

import java.util.List;
import Model.Stment;

public class ChangeStmList{
	
	private String[][] originChart;
	private String[][] detailChart;
	
	public String[][] getOriginChart() {
		return originChart;
	}

	public void setOriginChart(String[][] originChart) {
		this.originChart = originChart;
	}

	public String[][] getDetailChart() {
		return detailChart;
	}

	public void setDetailChart(String[][] detailChart) {
		this.detailChart = detailChart;
	}

	public ChangeStmList(List<Stment> stmList, int maxDepth){

		int stmSize = stmList.size();
		String stmArray[][] = new String[stmSize][3];
		
		for(int i=0;i<stmSize;i++){
			stmArray[i][0] = stmList.get(i).getStmDepth()+"";
			stmArray[i][1] = stmList.get(i).getStmType();
			stmArray[i][2] = stmList.get(i).getStmText();
		}
				
		ChartSetting a = new ChartSetting();
		a.CheckChart(maxDepth, stmArray);
		
		originChart = a.getRealOrigins();//첫번째 차트
		detailChart = a.getRealDetails();//두번째 차트
		
//		printchart(originChart, a.realLengthX(), a.realLengthY());//첫번째 차트 출력해보려면
//		printchart(detailChart, a.realLengthX(), a.realLengthY());//두번째 차트 출력해보려면
	}
	
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

}



