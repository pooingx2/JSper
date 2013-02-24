package Model;

import java.beans.Statement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
public class Function implements Serializable{

	private String name;		// 함수 이름
	private String type;		// 함수 타입 (Declaration, Expression, Anonymous)
	private int depth;			// 함수 깊이
	private String parent;		// 부모 함수 이름
	private String comment;		// 함수위에 있는 전체 주석
	private int length;			// 함수의 이름 길이
	private List<String> lines;	// 여러 라인의 주석을 라인별로 저장한 리스트
	private int maxLength;		// 가장긴 주석 라인의 길이
	private String code;		// 함수 내부의 코드
	
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
	
	// comment가 줄바꿈되어 들어온경우 각각을 줄단위로 나누고 list에 저장한다.
	private void initLines() {
        if(!(comment.equals("0"))) {
        	this.comment = comment.substring(2, comment.length()-2);
        	String[] temp = comment.split("\n");
    		for(int i=0;i<temp.length;i++){
    			lines.add(temp[i]);
    			if(temp[i].length() > maxLength) maxLength=temp[i].length();	// 가장긴 comment길이를 구함
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
