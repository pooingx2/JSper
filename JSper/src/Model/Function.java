package Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 박주영
 *
 */
public class Function implements Serializable{
	
	private String name;		// 함수 이름
	private String type;		// 합수 타입 : Declation, Expression, Anominous
	private int depth;			// 함수의 깊이 
	private String parent;		// 부모 함수의 이름
	private String comment;		// 전체 길이의 주석
	private int length;			// 함수 이름의 길이
	private List<String> lines;	// 주석을 여러줄로 입력 했을때 라인별로 List에 저장
	private int maxLength;		// 주석 List의 가장 긴 문자열 길이
	private String code;		// 합수의 body 코드
	
	public Function(){}
	public Function(String name, int depth, String parent, String comment, String type, String code){
		this.name = name;
		this.depth = depth;
		this.parent = parent;
		this.comment = comment;
		this.type = type;
		this.code = code;
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
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
}
