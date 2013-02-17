<<<<<<< HEAD
package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
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
import Model.Function;

@WebServlet("/main")
public class MainController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public MainController() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");

		RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
		dispatcher.forward(request,  response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");

		//Ajax을 통해서 코드를 받는다.
		String code = request.getParameter("param");
		ANTLRStringStream input = new ANTLRStringStream(code);
		
		//받은 코드를 Lexer를 사용해서 토큰을 나눈다.
		JSLexer lex = new JSLexer(input);

		//생성된 토큰을 사용해서 파서를 생성한다.
		CommonTokenStream tokens = new CommonTokenStream(lex);
		JSParser g = new JSParser(tokens);
		
		try {
			//파서를 초기화하고 실행한다.
			g.init();
			g.program();

			//"Function"자료형 리스트를 만든다. 
			List<Function> fList = g.getFlist();
			JSONObject obj = new JSONObject();
			
			//반환값을 출력하여 확인 
			for(Function function : fList) {
				System.out.println("getName : " + function.getName());
				System.out.println("getType : " + function.getType());
				System.out.println("getDepth : " + function.getDepth());
				System.out.println("getParent : " + function.getParent());
				System.out.println("getComment : " + function.getComment());
				System.out.println("getLength : " + function.getLength());
				System.out.println("getMaxLength : " + function.getMaxLength()+"\n");
			}
			
			//출력된 정보를 Ajax를 통해서 JSON형식으로 다시 보낸다.
			JSONArray jsonArray = new JSONArray(fList.toArray());
			obj.put("fList", jsonArray);
			PrintWriter writer = response.getWriter();
			writer.write(obj.toString());
			
//			request.setAttribute("fList", fList);
			
		} catch (RecognitionException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		}
//		RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
//		dispatcher.forward(request,  response);
	}

}
=======
package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
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
import Model.Function;

@WebServlet("/main")
public class MainController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public MainController() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");

		RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
		dispatcher.forward(request,  response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");

		//Ajax을 통해서 코드를 받는다.
		String code = request.getParameter("param");
		ANTLRStringStream input = new ANTLRStringStream(code);
		
		//받은 코드를 Lexer를 사용해서 토큰을 나눈다.
		JSLexer lex = new JSLexer(input);

		//생성된 토큰을 사용해서 파서를 생성한다.
		CommonTokenStream tokens = new CommonTokenStream(lex);
		JSParser g = new JSParser(tokens);
		
		try {
			//파서를 초기화하고 실행한다.
			g.init();
			g.program();

			//"Function"자료형 리스트를 만든다. 
			List<Function> fList = g.getFlist();
			JSONObject obj = new JSONObject();
			
			//반환값을 출력하여 확인 
			for(Function function : fList) {
				System.out.println("getName : " + function.getName());
				System.out.println("getType : " + function.getType());
				System.out.println("getDepth : " + function.getDepth());
				System.out.println("getParent : " + function.getParent());
				System.out.println("getComment : " + function.getComment());
				System.out.println("getLength : " + function.getLength());
				System.out.println("getMaxLength : " + function.getMaxLength()+"\n");
			}
			
			//출력된 정보를 Ajax를 통해서 JSON형식으로 다시 보낸다.
			JSONArray jsonArray = new JSONArray(fList.toArray());
			obj.put("fList", jsonArray);
			PrintWriter writer = response.getWriter();
			writer.write(obj.toString());
			
//			request.setAttribute("fList", fList);
			
		} catch (RecognitionException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		}
//		RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
//		dispatcher.forward(request,  response);
	}

}
>>>>>>> tt
