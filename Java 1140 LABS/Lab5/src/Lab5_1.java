
import java.util.Scanner;
import java.io.File;

public class Lab5_1 {

    public static void main(String args[]) throws Exception {
// create Scanner object to obtain input from file
        Scanner inputFile = new Scanner(new File("PaycheckData2.txt"));
        
        double hwage, mon, tue, wen, thur, fri, sat, sun;

        System.out.printf("Employee Paystub \n");
        System.out.println();
        System.out.printf("Employee First Name       : " + inputFile.next() + "\n");
        System.out.printf("Employee Last Name        : " + inputFile.next() + "\n");
        System.out.printf("Employee Number           : " + inputFile.next() + "\n");
        hwage = inputFile.nextDouble();
        System.out.printf("Hourly wage               : " + hwage + "\n\n");
        mon = inputFile.nextDouble();
        System.out.printf("Hours worked on Monday    :%6.1f ", mon);
        System.out.println();
        tue = inputFile.nextDouble();
        System.out.printf("Hours worked on Tuesday   :%6.1f ", tue);
        System.out.println();
        wen = inputFile.nextDouble();
        System.out.printf("Hours worked on Wednesday :%6.1f ", wen);
        System.out.println();
        thur = inputFile.nextDouble();
        System.out.printf("Hours worked on Thursday  :%6.1f  ", thur);
        System.out.println();
        fri = inputFile.nextDouble();
        System.out.printf("Hours worked on Friday    :%6.1f ", fri);
        System.out.println();
        sat = inputFile.nextDouble();
        System.out.printf("Hours worked on Saturday  :%6.1f ", sat);
        System.out.println();
        sun = inputFile.nextDouble();
        System.out.printf("Hours worked on Sunday    :%6.1f ", sun);
        System.out.println();
        System.out.printf("Hours worked on Sunday    :%6.1f ", sun);
        System.out.println();
        System.out.println();
        System.out.printf("Monday earnings           :$%8.2f ", mon*hwage);
        System.out.println();
        System.out.printf("Tuesday earnings          :$%8.2f ", tue*hwage);
        System.out.println();
        System.out.printf("Wenesday earnings         :$%8.2f ", wen*hwage);
        System.out.println();
        System.out.printf("Thursday earnings         :$%8.2f ", thur*hwage);
        System.out.println();
        System.out.printf("Friday earnings           :$%8.2f ", fri*hwage);
        System.out.println();
        System.out.printf("Saturday earnings         :$%8.2f ", sat*hwage);
        System.out.println();
        System.out.printf("Sunday earnings           :$%8.2f ", sun*hwage);
        System.out.println();
    } 
}
