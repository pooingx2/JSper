package Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Statement implements Serializable{
	
	private String type;
	private String statement;
	
	public Statement(){}
	public Statement(String type, String statement){
		this.type = type;
		this.statement = statement;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStatement() {
		return statement;
	}
	public void setStatement(String statement) {
		this.statement = statement;
	}
}
