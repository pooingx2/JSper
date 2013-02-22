package Model;

public class CodeMap{
	int depth;
	String code;
	
	public CodeMap () {
		
	}
	public CodeMap(int depth, String code){
		this.depth = depth;
		this.code = code;
	}

	public int getDepth() {
		return depth;
	}

	public void setDepth(int depth) {
		this.depth = depth;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
}
