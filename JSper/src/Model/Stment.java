package Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Stment implements Serializable{

	private int stmDepth;
	private String stmType;
	private String stmText;
	
	public Stment(){}
	public Stment(int stmDepth, String stmType, String stmText){

		this.stmDepth = stmDepth;
		this.stmType = stmType;
		this.stmText = stmText;
	}
	public int getStmDepth() {
		return stmDepth;
	}
	public void setStmDepth(int stmDepth) {
		this.stmDepth = stmDepth;
	}
	public String getStmType() {
		return stmType;
	}
	public void setStmType(String stmType) {
		this.stmType = stmType;
	}
	public String getStmText() {
		return stmText;
	}
	public void setStmText(String stmText) {
		this.stmText = stmText;
	}
	
}
