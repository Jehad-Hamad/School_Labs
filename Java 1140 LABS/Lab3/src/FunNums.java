import java.util.Scanner;

public class FunNums {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int numberYouChose, sum;
        System.out.println("Fun with numbers");
        System.out.print("Enter a single digit number :  ");
        numberYouChose = input.nextInt();
        System.out.println();
        sum = numberYouChose + (numberYouChose*11) + (numberYouChose*111) + (numberYouChose*1111);
        System.out.println("The sum of the sequence is :" + sum);
    }
}