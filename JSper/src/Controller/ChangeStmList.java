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
	}
	
}



