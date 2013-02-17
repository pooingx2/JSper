package Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Statement implements Serializable{
	
	private String name;
	private String statement;
	
	public Statement(){}
	public Statement(String name, String statement){
		this.name = name;
		this.statement = statement;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatement() {
		return statement;
	}
	public void setStatement(String statement) {
		this.statement = statement;
	}
}
