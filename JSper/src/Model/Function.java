package Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 박주영
 *
 */
public class Function implements Serializable{
	
	private String name;
	private String type;
	private int depth;
	private String parent;
	private String comment;
	private int length;
	private List<String> lines;	// commentLines
	private int maxLength;		// maxlength - commnetLine
	
	public Function(){}
	public Function(String name, int depth, String parent, String comment){
		this.name = name;
		this.depth = depth;
		this.parent = parent;
		this.comment = comment;
		this.length = name.length();
		this.maxLength = 0;
		this.lines = new ArrayList<String>();
		initLines();
	}
	
	private void initLines() {
        if(!(comment.equals("0"))) {
        	this.comment = comment.substring(2, comment.length()-2);
        	String[] temp = comment.split("\n");
    		for(int i=0;i<temp.length;i++){
    			lines.add(temp[i]);
    			if(temp[i].length() > maxLength) maxLength=temp[i].length();
    		}
        }
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
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
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	public List<String> getLines() {
		return lines;
	}
	public void setLines(List<String> lines) {
		this.lines = lines;
	}
	public int getMaxLength() {
		return maxLength;
	}
	public void setMaxLength(int maxLength) {
		this.maxLength = maxLength;
	}
	
}
