package csd.uoc.gr.A12;

/**
 *  << Info about the Exercise >>
 *  
 *  In a PingPong.java file, define a Ping class (ie a Pong class) that has a static ping method (ie Pong has a static pong method) that takes an integer k as a parameter.
 *  Calling ping(k) (resp. calling pong(k)) should display a window (via JOptionPane) titled "Ping" (resp. "Pong") that displays the value of k in it, and then if k is greater 
 *  than 1 call pong(k-1) (respectively ping(k-1)). Finally, the Ping class (respectively also the Pong class) should have a main method which will make the ping(10) call 
 *  (respectively pong(10)).
 *  
 *  For this exercise you are using an IDE (Eclipese/NetBeans). You are given (in the templates in the Library folder) a jar (named jfugue-4.0.3.jar) which you need to add to 
 *  your project library. Then enrich the PingPong.java file with a Utilities class that has a static method void sound(int k). Enrich Ping (resp. Pong) so that ping(k) (resp. 
 *  pong(k)) just before opening the window calls sound(k). The sound(k) method must have the following commands:
 *  Player p = new Player();
 *  p.play(“[x] [x+2] [x+5] ”);
 *  where x is the value of k * 12.
 *  
 */

import java.awt.Font;
import javax.swing.JOptionPane;
import javax.swing.UIManager;
import org.jfugue.Player;

class Ping {
	public static void ping(int k) {
		Utilities.sound(k);
		JOptionPane.showMessageDialog(null, k, "Ping", JOptionPane.INFORMATION_MESSAGE);
		UIManager.put("OptionPane.messageFont", new Font("Lucida Console", Font.BOLD, 14));
		
		if(k>1) {
			Pong.pong(k-1);
		}
	}
	
	public static void main(String[] args) {
		ping(10);
	}
}

class Pong {
	public static void pong(int k) {
		Utilities.sound(k);
		JOptionPane.showMessageDialog(null, k, "Pong", JOptionPane.INFORMATION_MESSAGE);
		UIManager.put("OptionPane.messageFont", new Font("Lucida Console", Font.BOLD, 14));
		
		if(k>1) {
			Ping.ping(k-1);
		}
	}
	
	public static void main(String[] args) {
		pong(10);
	}
}	

class Utilities {
	static void sound(int k) {
		int x = k*12;
		Player p = new Player();
		p.play("["+x+"] ["+(x+2)+"] ["+(x+5)+"]");
	}
}

public class PingPong {
	public static void main(String[] args) {
		Ping.main(args);
	}
}
