import java.util.Scanner;
import java.io.File;
public class Lab3_example {
public static void main( String args[] ) throws Exception {
// create Scanner object to obtain input from file
Scanner inputFile = new Scanner( new File ("Lab3_ExampleData.txt") );
int a,b,c,d; // reserve space for variables
a = inputFile.nextInt(); // get the number from file
b = inputFile.nextInt(); // get the number from file
inputFile.nextLine(); // skip the rest of the line from file
c = inputFile.nextInt(); // get the number from file
inputFile.nextLine(); // skip the rest of the line from file
inputFile.nextLine(); // skip the rest of the line from file
d = inputFile.nextInt(); // get the number from file
d = inputFile.nextInt(); // get the number from file
System.out.println( "First number: " + a);
System.out.println( "Second number: " + b);
System.out.println( "Third number : " + c);
System.out.println( "Fourth number: " + d);
} // end method main
} // end of the class