import java.util.*;
                                                    //JehadMHamad LAB7 04/03/24
public class Task3 {

    public static String bin2Dec(String binaryString) {
        int num = Integer.parseInt(binaryString);
        int true_number = 0;
        int i = 0;
        int leftover = 0;
        while (num != 0) {
            leftover = num % 10;
            num /= 10;
            true_number += leftover * Math.pow(2, i);
            ++i;
        }
        String numString = "" + true_number;
        return "your dec number is " + numString;
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.err.print("What is your binary number ");

        String binaryString = input.next();
        input.close();
        for (int i = 0; i < binaryString.length(); i++) {
            char c = binaryString.charAt(i);
            if (c != '1' && c != '0') {
                throw new NumberFormatException("Invalid binary string!");
            }
        }
        String result = bin2Dec(binaryString);
        System.out.println(result);
    }
}
