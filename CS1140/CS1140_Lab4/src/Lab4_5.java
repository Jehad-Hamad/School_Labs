
import java.util.Scanner;
import java.io.File;

public class Lab4_5 {

    public static void main(String args[]) throws Exception {
// create Scanner object to obtain input from file
        Scanner inputFile = new Scanner(new File("SecretMsg.txt"));
        String complete = "";
        inputFile.next();
        inputFile.next();
        
        inputFile.next();
        complete = complete + inputFile.next() + ' ';
        //line one done
        inputFile.nextLine();
        String out = "";
        inputFile.next();
        out = out + inputFile.next().toUpperCase().charAt(0);
        out = out + inputFile.next().toUpperCase().charAt(0);
        out = out + inputFile.next().toUpperCase().charAt(0) + ' ';
        //line 2 done
        inputFile.nextLine();
        String line3 = "";
        inputFile.next();
        line3 = line3 + inputFile.next().substring(0, 3);
        inputFile.nextLine();
        inputFile.next();
        inputFile.next();
        line3 = line3 + inputFile.next().substring(2, 6) + ' ';
        //line3
        String line4 = "";
        inputFile.nextLine();
        inputFile.next();
        inputFile.next();
        inputFile.next();
        inputFile.next();
        inputFile.next();
        inputFile.next();
        line4 = line4 + inputFile.next().substring(0, 4) + ' ';
        //line 4 done
        String line5 = "";
        inputFile.next();
        line5 = line5 + inputFile.next().length() + ' ';
        //line5 done
        String line6 = "";
        line6 = line6 + inputFile.next().substring(3, 5) + ' ';
        //line6 done
        String line7 = "";
        inputFile.nextLine();
        inputFile.next();
        inputFile.next();
        line7 = line7 + inputFile.next() + ':';
        String line8 = "";
        inputFile.nextLine();
        line8 = line8 + inputFile.nextLine().length();
        complete = complete + out + line3 + line4 + line5 + line6 + line7 + line8;
        System.out.println(complete);

    }
}
