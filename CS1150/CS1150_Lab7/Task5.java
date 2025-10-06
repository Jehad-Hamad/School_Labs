import java.io.*;
import java.util.*;

//JehadMHamad LAB7 04/03/24
public class Task5 {
    public static void main(String[] args) {
        try {
            java.io.File file = new java.io.File("Task2.txt");
            java.io.PrintWriter outPut = new java.io.PrintWriter(file);

            Scanner input = new Scanner(file);

            for (int i = 0; i < 100; i++) {
                outPut.print((int) (Math.random() * 20) + " ");
            }
            outPut.close();
            int[] array = new int[100];
            int pos = 0;
            while (input.hasNext()) {
                array[pos] = input.nextInt();
                pos++;
            }
            Arrays.sort(array);
            for (int i = 0; i < 100; i++) {
                System.err.print(array[i] + " ");
            }
            input.close();
        } catch (FileNotFoundException ex) {
            System.out.println("File is not found");
        }

    }
}
