package Model;

import java.io.Serializable;
import java.util.List;

public class Function implements Serializable{
	
	private String name;
	private int depth;
	private String parent;
	private String comment;
	
	public Function(){}
	public Function(String name, int depth, String parent, String comment){
		this.name = name;
		this.depth = depth;
		this.parent = parent;
		this.comment = comment;
		
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getDepth() {
		return depth;
	}
	public void setDepth(int depth) {
		this.depth = depth;
	}
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
}
