package csd.uoc.gr.A12;

/*		
 * 		" HY252 2019 Assignment1: Exercise 2 "
 *  
 * 		Find if the table is magic and find the magic number.
 * 
 * 		|	2	|	7	|	6	| 
 * 		|	9	|	5	|	1	| 
 * 		|	4	|	3	|	8	| 
 * 			
 * 		Sum Row1: 15	Sum Col1: 15	Sum Diagonal1: 15
 * 		Sum Row2: 15	Sum Col2: 15	Sum Diagonal2: 15
 * 		Sum Row3: 15	Sum Col3: 15	
 * 
 * 		This is a magic box because every sum is equal and the magic number is 15.
 * 
 *		Note: If the table has duplicates or the sums aren't equal then this isn't a magic box.
 *
 */			

import java.util.ArrayList;
import java.util.Scanner;

public class MagicSquareChecker {
	public static int n = 0;										// N is the number of the table. If n = 3 then the table is n * n = 9 (3 rows, 3 columns).
	public static ArrayList<Integer> sumrow = new ArrayList<Integer>(); 					// I add the sum of each row.
	public static ArrayList<Integer> sumcol = new ArrayList<Integer>(); 					// I add the sum of each column.
	
	// For each row calculate the sum. Then we want all the rows to have the same sum. 
	private static int sumOfRow (int[][] s, int k) {		
		int countersum = 0;
		for(int i=0; i<n; i++) {
			countersum = countersum + s[k][i]; 								// Counts the sum of rows.
		}		
		
		sumrow.add(countersum); 										// Add the sum of row to the array list.
		boolean match = false; 
		if(sumrow.get(k) == sumrow.get(0)) { 									// Check if each sum is equal with the first sum.
			match = true; 
		}
		else {
			match = false;
		}		
				
		if(match == false) { 											// If the sum of each row is not equal among them then return 0.
			return 0;				
		}
		
		return countersum; 											// If the sum of each row is equal among them then return the number.			
	}
	
	// For each column calculate the sum. Then we want all the columns to have the same sum. 
	private static int sumOfColumn (int[][] s, int k) {
		int countersum = 0;
		for(int i=0; i<n; i++) {
			countersum = countersum + s[i][k]; 								// Counts the sum of columns.
		}
		
		sumcol.add(countersum); 										// Add the sum of column to the array list.
		boolean match = false;
		for(int i=0; i<=k; i++) {			
			if(sumcol.get(k) == sumcol.get(0)) { 								// Check if each sum is equal with the first sum.
				match = true;
			}
			else {
				match = false;
			}
		}
		
		if(match == false) { 											// If the sum of each column is not equal among them then return 0.
			return 0;				
		}
		
		return countersum;											// If the sum of each column is equal among them then return the number.	
	}
	
	// For the first diagonal calculate the sum.
	private static int sumOfDiagonal1 (int[][] s) {
		int countersum = 0; 
		
		for(int j=0; j<n; j++) {
			countersum = countersum + s[j][j]; 								// Calculate the diagonal [0][0] + [1][1] + [2][2]
		}
		
		return countersum;		
	}
	
	// For the second diagonal calculate the sum.
	private static int sumOfDiagonal2 (int[][] s) {
		int countersum = 0;
		int k = 0;												// The second diagonal is reversed show I start with row zero.
		
		for(int j=1; j<=n; j++) {
			countersum = countersum + s[k][n-j];								// Because it's reversed I have (if n=3) [0][3-1] -> [0][2] ...
			k++;
		}
		
		return countersum;
	}
	
	// Check if the table is magic.
	public static boolean checkIsMagic(int[][] s) {
		int result1 = 0;
		int result2 = 0;
															// Call the methods.
		for(int i=0; i<n; i++) {
			result1 = sumOfRow(s, i); 
			result2 = sumOfColumn(s, i);
		}
		
		int result3 = sumOfDiagonal1(s);
		int result4 = sumOfDiagonal2(s);
																						
		if(result1 == result2 && result1 == result3 && result1 == result4) {					// If all results are equal then the table is a magic box.
			return true;
		}
		
		return false;		
	}
	
	// Get the magic number.
	public static int getMagicNumber(int[][] s) {
		int result = sumOfDiagonal1(s);										// If the table is a magic box then we take whatever result we want.
		return result;
	}
	
	// Check if the table has duplicate numbers.
	private static boolean hasDuplicates(int[][] s) {
		for(int i=0; i<n; i++) {										// Two fors because the table is a 2d. 
			for(int j=0; j<n; j++) {
				int num = s[i][j];									// Store the number in num variable.
	            for (int otherCol = j+1; otherCol < s.length; otherCol++) {						// Another for in order to check if the num is equal with the next numbers of the row 
	                if (num == s[j][otherCol]) {									// num == [0][1], [0][2] .....
	                    return true;											
	                }
	            }
			}
		}	
		
		return false;
	}
		
	public static void main(String[] args) {		
		@SuppressWarnings("resource")
		Scanner user = new Scanner(System.in);
		ArrayList<Integer> numbers = new ArrayList<Integer>(9);							// We want n to be from 2 to 10, so I created a Array List to check if n is equal to those numbers.
			numbers.add(2);
			numbers.add(3);
		    numbers.add(4);
		    numbers.add(5);  
		    numbers.add(6);
		    numbers.add(7);
		    numbers.add(8);
		    numbers.add(9);  
		    numbers.add(10);
		
		System.out.println("Give me an integer n:");				
		n = user.nextInt();
				
		boolean retval = numbers.contains(n);									// Check if n is equal to with a number of the Array List. If yes then retval = true. 		
		while(retval == false) {
			System.out.println("Wrong input n must be from 2 to 10. Give n again:");
			n = user.nextInt();										// If retval = false then give me again again the n value until is equal with the numbers of the Array List.
			retval = numbers.contains(n);									// Check if n is equal to with a number of the Array List. If yes then retval = true.
		}
		
		int[][] array = new int[n][n];										// Creating the 2d array.
		for(int i=0; i<n; i++) {
			for(int j=0; j<n; j++) {
				System.out.println("Give me a number:");						
				array[i][j] = user.nextInt();								// Give numbers to the array.
			}
		}
		
		/* 
		 * Problem with print:
		 *  1. If you give two digit number (three, four ...) goes one (two, three ...) space inside.
		 *  2. The symbols ----- don't cover the table (on top or in the bottom).
		 *  
		 */
		for(int i=0; i<n*n; i++) {
			System.out.print("-");											// Print the table. 
		}
				
		for(int i=0; i<n; i++) {												
			System.out.println();
			System.out.print("|   ");
			for(int j=0; j<n; j++) {				
				System.out.print(array[j][i]);									// Print the table.
				System.out.print("|   ");
			}			
		}
		
		System.out.println();
		for(int i=0; i<n*n; i++) {
			System.out.print("-");											// Print the table.
		}
		System.out.println();
		
		boolean magicbox = checkIsMagic(array);										// Check if table is magic.
		boolean duplicate = hasDuplicates(array);									// Check if the tables have duplicate numbers.
		int magicnumber = 0;													
		
		if(magicbox == true && duplicate == false) {									// If it is a magic box and has no duplicates then print the table and the magic number.
			magicnumber = getMagicNumber(array);			
			System.out.println("This is a magic box and the magic number is "+magicnumber+".");
		}
		
		if(duplicate == true) {
			System.out.println("There ara duplicates. Therefore it isn't a magic box.");
		}
		else if(magicbox == false) {
			System.out.println("There isn't a magic number. Therefore it isn't a magic box.");
		}		
	}
}
