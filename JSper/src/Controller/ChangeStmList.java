package Controller;

import java.util.List;
import Model.Stment;

public class ChangeStmList{
	
	private String[][] originChart;		// flowchart 도형을 그리기 위한 배열
	private String[][] detailChart;		// flowchart 내부의 text를 그리기 위한 배열
	
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
		
		// statement list를 배열 형태로 바꿈
		for(int i=0;i<stmSize;i++){
			stmArray[i][0] = stmList.get(i).getStmDepth()+"";
			stmArray[i][1] = stmList.get(i).getStmType();
			stmArray[i][2] = stmList.get(i).getStmText();
		}
				
		// flow chart를 그리기 위한 Array로 바꿈
		ChartSetting a = new ChartSetting();
		a.CheckChart(maxDepth, stmArray);
		
		originChart = a.getRealOrigins();
		detailChart = a.getRealDetails();
	}
	
}



