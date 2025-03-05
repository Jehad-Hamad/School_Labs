import java.util.Scanner;

public class Lav7_2 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.printf("Enter a numerator : ");
        int numerator = input.nextInt();
        System.out.printf("Enter a denominator : ");
        int denominator = input.nextInt();

        if(numerator < denominator){
            System.out.printf("This is a proper fraction %d / %d", numerator, denominator);
        } else if((numerator % denominator) == 0){
            System.out.printf("This is an improper fraction %d / %d", numerator, denominator);
            System.out.printf(", and it can be reduced to 1");
        } else {
            System.out.printf("This is an improper fraction %d / %d", numerator, denominator);
            int leftovers = numerator % denominator;
            System.out.printf(", and its mixed fraction is %d + %d / %d", (numerator / denominator), leftovers, denominator);
        }
        System.out.printf("\n");
    }
}