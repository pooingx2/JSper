package Controller;

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

@WebServlet("/main")
public class MainController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public MainController() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("test doGet!");
		request.setCharacterEncoding("utf-8");

		List<Function> fList;
		fList = new ArrayList<Function>();
		
		// test data 
		fList.add(new Function("name0",0,"root","comment0"));
		fList.add(new Function("name1",1,"name0","comment1"));
		fList.add(new Function("name2",2,"name1","comment2"));
		fList.add(new Function("name3",3,"name2","comment3"));
		fList.add(new Function("name4",2,"name1","comment4"));
		fList.add(new Function("name5",1,"name0","comment5"));
		fList.add(new Function("name6",2,"name5","comment6"));
		fList.add(new Function("name7",2,"name5","comment7"));
		fList.add(new Function("name8",3,"name7","comment8"));
		fList.add(new Function("name9",1,"name0","comment9"));
		
		request.setAttribute("fList", fList);

		RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
		dispatcher.forward(request,  response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("test");
		request.setCharacterEncoding("utf-8");
		
		// code data from main.jsp
		request.getParameter("code");
		String code = request.getParameter("param");
		System.out.println(code);
		

		System.out.println("test doPost!");
		request.setCharacterEncoding("utf-8");
		
		List<Function> fList;
		fList = new ArrayList<Function>();
		
		// test data
		fList.add(new Function("name0",0,"root","comment0"));
		fList.add(new Function("name1",1,"name0","comment1"));
		fList.add(new Function("name2",2,"name1","comment2"));
		fList.add(new Function("name3",3,"name2","comment3"));
		fList.add(new Function("name4",2,"name1","comment4"));
		fList.add(new Function("name5",1,"name0","comment5"));
		fList.add(new Function("name6",2,"name5","comment6"));
		fList.add(new Function("name7",2,"name5","comment7"));
		fList.add(new Function("name8",3,"name7","comment8"));
		fList.add(new Function("name9",1,"name0","comment9"));
		
		request.setAttribute("fList", fList);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("main.jsp");
		dispatcher.forward(request,  response);
	}

}
