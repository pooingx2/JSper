package Controller;

import Antlr.JSLexer;
import Antlr.JSParser;
import Model.Function;
import java.io.IOException;
import java.util.ArrayList;
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

@WebServlet("/main")
public class MainController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public MainController() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
		dispatcher.forward(request,  response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		System.out.println("test doPost!");

		String code = request.getParameter("param");
		ANTLRStringStream input = new ANTLRStringStream(code);
		JSLexer lex = new JSLexer(input);

		System.out.println(code);
		CommonTokenStream tokens = new CommonTokenStream(lex);
		JSParser g = new JSParser(tokens);

		try {
			g.init();
			g.program();

			System.out.println("List Test!!!!");

			for(int i=0;i<g.getFlist().size();i++){
				System.out.println("getName : " + g.getFlist().get(i).getName());
				System.out.println("getType : " + g.getFlist().get(i).getType());
				System.out.println("getDepth : " + g.getFlist().get(i).getDepth());
				System.out.println("getParent : " + g.getFlist().get(i).getParent());
				System.out.println("getComment : " + g.getFlist().get(i).getComment());
				System.out.println("getLength : " + g.getFlist().get(i).getLength()+"\n");
			}

			request.setAttribute("fList", g.getFlist());

		} catch (RecognitionException e) {
			e.printStackTrace();
		}
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
		dispatcher.forward(request,  response);
	}

}
