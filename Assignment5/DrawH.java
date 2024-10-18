package csd.uoc.gr.A11;

import java.util.Scanner;
import java.awt.Desktop;
import java.awt.Font;
import java.io.File;
import java.io.PrintWriter;
import javax.swing.JOptionPane;
import javax.swing.UIManager;
import java.awt.Frame;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.Line2D;
import java.awt.geom.QuadCurve2D;

/*
 * 
 * Draw letter H with different ways.
 * 
 * Example:
 * If L = 5, rows = 5 and columns = 4.
 * 
 * 		*   *
 * 		*   *
 * 		*****
 * 		*   *
 * 		*   *
 * 
 */

public class DrawH {
	public static void printmethod(int L) {
		/*
		 * With L = 3, I have:
		 *  	**
		 *  	**
		 *  	**
		 *  Therefore I did it separately.
		 */
		if(L != 3) {
			// I have i as rows so i<L for example L=5, i<5.
			for(int i=0; i<L; i++) {
				// I have j as columns so j<L-1 for example L=5, i<4.
				for(int j=0; j<L-1; j++) {
					// Put * in the middle (in the middle row).
					if(i==L/2) {
						System.out.print("*");						
					}
					// Put * at the edges.
					else if(j==0 || j==L-2) {
						System.out.print("*");
					}
					// Put space in the middle of *.
					else if(j!=L-2) {
						System.out.print(" ");
					}								
				}
				System.out.println();
			}
		}
		else {
			System.out.println("* *");
			System.out.println("***");
			System.out.println("* *");
		}
	}
	
	// I use this method for the JOptionPane class. It is same with above method, the only difference is that we have a 
	// return (String) value called letterdrawasterisk. 
	public static String drawmethod(int L) {
		/*
		 * With L = 3, I have:
		 *  	**
		 *  	**
		 *  	**
		 *  Therefore I did it separately.
		 */
		String letterdrawasterisk = "\n";
		if(L != 3) {
			// I have i as rows so i<L for example L=5, i<5.
			for(int i=0; i<L; i++) {
				// I have j as columns so j<L-1 for example L=5, i<4.
				for(int j=0; j<L-1; j++) {
					// Put * in the middle (in the middle row).
					if(i==L/2) {
						letterdrawasterisk += "*";						
					}
					// Put * at the edges.
					else if(j==0 || j==L-2) {
						letterdrawasterisk += "*";
					}
					// Put space in the middle of *.
					else if(j!=L-2) {
						letterdrawasterisk += " ";
					}								
				}
				letterdrawasterisk += "\n";
			}
		}
		else {
			letterdrawasterisk += "* *\n";
			letterdrawasterisk += "***\n";
			letterdrawasterisk += "* *\n";
		}
				
		return letterdrawasterisk;
	}
	
	// Create the letter H in a calligraphic way in a frame.
	public static void drawHgraphics(int L) {
		Frame f = new Frame("Draw the letter H.") {
			public void paint (Graphics g) {
				QuadCurve2D cur = new QuadCurve2D.Double();
				Graphics2D g2 = (Graphics2D) g;
				g2.draw(new Line2D.Double(300, L*20, 300, L*50));
				g2.draw(new Line2D.Double(100, L*20, 100, L*50));
				g2.draw(new Line2D.Double(100, L*35, 300, L*35));
				cur.setCurve(300, 50*L, 50*L, 20*L, 350, 350);
				g2.draw(cur);
			}
		};	
		
		f.setSize(400,400);
		f.setVisible(true);
	}
	
	public static void main(String[] args) {
		Scanner user = new Scanner(System.in);		
		// M can have 4 values ‘c’ (from console), ‘w’ (from window), ‘f’ (from file), ‘g’ (from graphics).		
		char  M;
		// L can have values from 3 to 20.
		int L = 0;
		
		// If the value M is invalid then terminate the program.
		System.out.println("Give me the M value: ");
		M = user.next().charAt(0);   		
		if(M != 'c' && M != 'w' && M != 'f' && M != 'g') {
			System.out.println("The values that you gave for M are wrong. The program will terminate.");
			System.exit(0);
		}
		
		// If M == w then in order to work properly we have to do Integer.parseInt(JOptionPane.showInputDialog("..",value)).
		// This is how we give the L value for the option window (w).
		// If the value L is invalid then terminate the program.
		System.out.println("Give me the L value: ");
		L = user.nextInt();
		
		if(M == 'w') {
			int inputk = Integer.parseInt(JOptionPane.showInputDialog("Give me a number ",L));
			L = inputk;
			if(L<3 || L>20) {
				System.out.println("The values that you gave for L are wrong. The program will terminate.");
				System.exit(0);
			}
		}
		else {
			if(L<3 || L>20) {
				System.out.println("The values that you gave for L are wrong. The program will terminate.");
				System.exit(0);
			}
		}
		
		/** 
		 * 
		 * You do not need both printmethod() and drawmethod(). You need only drawmethod but because printmethod was the first method that came to 
		 * my mind I kept it.
		 * 
		 */

		// If M = c then draw letter H in the console.
		if(M == 'c') {			
			printmethod(L);
		}		
		// If M = w then draw letter H in a window.
		else if(M == 'w') {						
			JOptionPane.showMessageDialog(null, drawmethod(L), "Window Output", JOptionPane.INFORMATION_MESSAGE);
			UIManager.put("OptionPane.messageFont", new Font("Lucida Console", Font.BOLD, 14));
		}
		// If M = f then create the letter H in a HTML file.
		else if(M == 'f') {
			PrintWriter writer;
			try {
				// In PrintWriter, we write the path where the HTML file is going to be created.
				writer = new PrintWriter("C:\\Users\\Raphael\\Desktop\\Eclipse_Template_A1\\H.html", "UTF-8");
				// Here we write the HTML code.
				writer.println("<!DOCTYPE html>\r\n"
						+ "<html>\r\n"
						+ 	"\t<head>\r\n"
						+ 		"\t\t<meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\"/>\r\n"
						+ 		"\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\r\n"
						+ 		"\t\t<meta name=\"author\" content=\"Raphael Papadakis\">\r\n"
						+ 		"\t\t<title>Draw H</title>\r\n"
						+ 	"\t</head>\r\n"
						+ 	"\t<body><font size = "+L+">H with font size = "+L+"</font></body>\r\n"
						+ "</html>");
				writer.close();
				
				// With the commands (File ... and Desktop ...) below we open a HTML file in the browser.
				File htmlFile = new File("C:\\Users\\Raphael\\Desktop\\Eclipse_Template_A1\\H.html");
				Desktop.getDesktop().browse(htmlFile.toURI());							
			} catch (Exception e) {
				System.out.println("Error: "+e);
			}			
		}
		// If M = g then create the letter H in a graph type window.
		else if(M == 'g') {
			drawHgraphics(L);
		}
	}
}
