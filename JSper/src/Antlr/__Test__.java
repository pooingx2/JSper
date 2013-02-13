
package Antlr;

import java.io.*;

import org.antlr.runtime.*;

public class __Test__ {

    public static void main(String args[]) throws Exception {
    	//ANTLRStringStream input = new ANTLRStringStream(textBoxInput.Text);
    	ANTLRFileStream input = new ANTLRFileStream("D:\\Study\\Java\\Workspace\\Web\\ANTLR\\src\\__Test___input.txt", "UTF8");
//    	ANTLRFileStream input = new ANTLRFileStream("src\\Antlr\\__Test___input.txt", "UTF8");
    	JSLexer lex = new JSLexer(input);
    	
//    	String aa = "var a = function () { function b () {var c = 4;}; var a; a = 3; return a;};";
//    	String aa = "function a () { function a () {var c = 4;}; var a; a = 3; return a;};";
//    	ANTLRStringStream input2 = new ANTLRStringStream(aa);
//    	JSLexer lex = new JSLexer(input2);
    	
        CommonTokenStream tokens = new CommonTokenStream(lex);
//        System.out.println();
        

        JSParser g = new JSParser(tokens);
       
        
        try {
        	g.init();
        	
            g.program();
            
            System.out.println("getName : " + g.getFlist().get(0).getName());
            System.out.println("getType : " + g.getFlist().get(0).getType());
            System.out.println("getDepth : " + g.getFlist().get(0).getDepth());
            System.out.println("getParent : " + g.getFlist().get(0).getParent());
            System.out.println("getComment : " + g.getFlist().get(0).getComment());
            System.out.println("getName : " + g.getFlist().get(1).getName());
            System.out.println("getType : " + g.getFlist().get(1).getType());
            System.out.println("getDepth : " + g.getFlist().get(1).getDepth());
            System.out.println("getParent : " + g.getFlist().get(1).getParent());
            System.out.println("getComment : " + g.getFlist().get(1).getComment());
            
        } catch (RecognitionException e) {
            e.printStackTrace();
        }
    }
}

