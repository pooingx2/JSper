package Antlr;

import java.io.*;

import org.antlr.runtime.*;
import org.antlr.runtime.debug.DebugEventSocketProxy;


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
            g.program();
            System.out.println(tokens.size());
            System.out.println(tokens.get(3).getText());
        } catch (RecognitionException e) {
            e.printStackTrace();
        }
    }
}

