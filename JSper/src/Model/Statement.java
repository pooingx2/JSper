package Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Statement implements Serializable{
	
	private String stmtype;
	private String stmText;
	private int stmDepth;
	
	public Statement(){}
	public Statement(int stmDepth, String stmtype, String stmText){

		this.stmDepth = stmDepth;
		this.stmtype = stmtype;
		this.stmText = stmText;
	}
	public int getStmDepth() {
		return stmDepth;
	}
	public void setStmDepth(int stmDepth) {
		this.stmDepth = stmDepth;
	}
	public String getStmtype() {
		return stmtype;
	}
	public void setStmtype(String stmtype) {
		this.stmtype = stmtype;
	}
	public String getStmText() {
		return stmText;
	}
	public void setStmText(String stmText) {
		this.stmText = stmText;
	}
	
}
