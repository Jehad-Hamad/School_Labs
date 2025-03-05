import java.util.*;
import java.io.*;
                                                    //JehadMHamad LAB7 04/03/24
public class Task6 {
    public static void main(String[] args) {
        try {
            Scanner inputFile = new Scanner(new File("Lincon.txt"));
            int count = 0;
            while (inputFile.hasNext()) {
                inputFile.next();
                count++;
            }
            System.out.println(count);
            inputFile.close();
        } catch (FileNotFoundException ex) {
            System.out.println("File is not found");
        }
    }
}
