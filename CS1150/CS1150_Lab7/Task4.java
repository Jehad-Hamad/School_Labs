import java.util.*;
import java.io.*;
                                                    //JehadMHamad LAB7 04/03/24
public class Task4 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("What is the name of your file? ");
        String fileName = input.next();

        try {
            Scanner inputFile = new Scanner(new File(fileName));
            int total = 0;
            int count = 0;

            while (inputFile.hasNext()) {
                int score = inputFile.nextInt();
                total += score;
                count++;
                inputFile.close();
            }
            double average = (double) total / count;
            System.out.println("Total: " + total);
            System.out.println("Average: " + average);

        } catch (FileNotFoundException ex) {
            System.out.println("File is not found");
        }
        input.close();
    }
}
