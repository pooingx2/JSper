package Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.antlr.runtime.ANTLRStringStream;
import org.antlr.runtime.CommonTokenStream;
import org.antlr.runtime.RecognitionException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import Antlr.JSLexer;
import Antlr.JSParser;
import Antlr.fCodeLexer;
import Antlr.fCodeParser;
import Model.CodeMap;
import Model.Function;
import Model.Stment;

@WebServlet("/main")
public class MainController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public MainController() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	List<CodeMap> sortList;
	
	// 함수별 code 매칭 알고리즘
	// (depth 재귀 호출 기준) 우선순위 : depth는 낮을수록, 같은 depth는 나눈 기준 왼쪽 순서
	public void sortList(List<CodeMap> cList, int n){
		int i=0;
		List<CodeMap> tempList = new ArrayList<CodeMap>();
		while(cList.size() != 0 ){			// 현재 list가 빌때까지 반복한다.
			while(cList.get(i).getDepth() != n){	// 현재 depth를 나눈다.
				tempList.add(cList.get(i));
				i++;
			}
			sortList.add(cList.get(i));		 // 뽑아낸 리스트의 데이터의 오른쪽을 저장한다.
			cList.remove(cList.get(i));
			
			// 뽑아낸 리스트만큼 현재 리스트에서 삭제한다.
			for(CodeMap item : tempList){
				cList.remove(item);
			}
			sortList(tempList, n+1);
			i=0;
		}
	}
	

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		
		String filename = "/WEB-INF/test/test1.txt";
		ServletContext context = getServletContext();
		InputStream input = context.getResourceAsStream(filename);

		String code="";
		String temp="";
		
		if(input != null){
			InputStreamReader isr = new InputStreamReader(input);
			BufferedReader reader = new BufferedReader(isr);
			while((temp = reader.readLine()) != null){
				code += temp+'\n';
			}
		}
		request.setAttribute("code", code);
		RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
		dispatcher.forward(request,  response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
			
		//Ajax를 통해서 옵션과 코드를 받는다.
		String option = request.getParameter("option");
		String code = request.getParameter("code");
		
		// option 별로 다른 parser를 실행한다.
		if(!(code.equals("0")) && !(code.equals("")) && code != null ) {
			if(option.equals("total"))
				TotalParser(code, request, response);
			else if(option.equals("function"))
				functionParser(code, request, response);
		}
	}


	protected void TotalParser(String code, HttpServletRequest request, HttpServletResponse response) {
		//받은 코드를 Lexer를 사용해서 토큰을 나눈다.
		ANTLRStringStream input = new ANTLRStringStream(code);
		JSLexer lex = new JSLexer(input);

		//생성된 토큰을 사용해서 파서를 생성한다.
		CommonTokenStream tokens = new CommonTokenStream(lex);
		JSParser g = new JSParser(tokens);

		try {
			//파서를 초기화하고 실행한다.
			g.init();
			g.program();

			//"Function"자료형 리스트와 JSON 객체를 만든다. 
			List<Function> fList = g.getFlist();
			JSONObject obj = new JSONObject();

			List<CodeMap> cList = g.getClist();	// Before sorting;
			sortList = new ArrayList<CodeMap>();		// After sorting;
			
			// flow chart를 위한 코드를 뽑아 함수에 매칭시킨다.
			sortList(cList, 0);
			

			System.out.println("test!!!!!!!!!!!!!!!!!!!");
			for(CodeMap item : sortList){
				System.out.println(item.getCode());
			}

			for(int i=0; i<sortList.size();i++){
				fList.get(i).setCode(sortList.get(i).getCode());
			}
			
			//반환값을 출력하여 확인 
			for(Function function : fList) {
				System.out.println("getName : " + function.getName());
				System.out.println("getType : " + function.getType());
				System.out.println("getDepth : " + function.getDepth());
				System.out.println("getParent : " + function.getParent());
				System.out.println("getComment : " + function.getComment());
				System.out.println("getCode : " + function.getCode()+"\n");
			}
			
			// JSON JSONArray형식으로 전송한다.
			JSONArray jsonArray = new JSONArray(fList.toArray());
			obj.put("fList", jsonArray);
			
			PrintWriter writer = response.getWriter();
			writer.write(obj.toString());
			
		} catch (RecognitionException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private void functionParser(String code, HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
				
		//받은 코드를 Lexer를 사용해서 토큰을 나눈다.
		ANTLRStringStream input = new ANTLRStringStream(code);
		fCodeLexer lex = new fCodeLexer(input);

		//생성된 토큰을 사용해서 파서를 생성한다.
		CommonTokenStream tokens = new CommonTokenStream(lex);
		fCodeParser g = new fCodeParser(tokens);

		try {
			//파서를 초기화하고 실행한다.
			g.init();
			g.program();

			int maxDepth=0;
			JSONObject obj = new JSONObject();
			List<Stment> stmList = g.getStmList();		// Antlr paser로 뽑은 StatementList

			String stmOrgin[][];		// flow chart 도형을 그리기 위한 string 배열
			String stmDetail[][];		// flow chart 도형 내부 text를 그리기 위한 string 배열
			
			// flow chart의 가장 깊은 depth를 구한다.
			for(Stment stm : stmList) {
				if(stm.getStmDepth() > maxDepth) {
					maxDepth = stm.getStmDepth();
				}
			}
				
			//반환값을 출력하여 확인한다.
			for(Stment stm : stmList) {
				System.out.println("getStmDepth : " + stm.getStmDepth());
				System.out.println("getStmType : " + stm.getStmType());
				System.out.println("getStmText : " + stm.getStmText()+"\n");
			}
			
			// list를 string 배열로 변환한다.
			ChangeStmList changeList = new ChangeStmList(stmList, maxDepth);
			
			// flow chart 도형을 그리기 위한 string 배열을 저장한다.
			// flow chart 도형 내부 text를 그리기 위한 string 배열을 저장한다.
			stmOrgin = changeList.getOriginChart();
			stmDetail = changeList.getDetailChart();
			
			
			// JSON JSONArray형식으로 전송한다.
			JSONArray jsonArray1 = new JSONArray(stmOrgin);
			JSONArray jsonArray2 = new JSONArray(stmDetail);
			
			// jsp로 보내줄 파라미터
			obj.put("stmOrgin", jsonArray1);
			obj.put("stmDetail", jsonArray2);
			
			// JSON 객체 출력
			System.out.println(jsonArray1.toString());
			System.out.println(jsonArray2.toString());
			
			PrintWriter writer = response.getWriter();
			writer.write(obj.toString());
			
		} catch (RecognitionException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
