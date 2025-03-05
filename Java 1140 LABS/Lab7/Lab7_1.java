import java.util.Scanner;

public class Lab7_1 {
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);

        System.out.printf("\nEnter a four digit integer : ");
        int value = input.nextInt();
        int valueRev = value;

        int d1 = value / 1000;
        value = value - (d1 * 1000);
        int d2 = value / 100;
        value = value - (d2 * 100);
        int d3 = value / 10;
        value = value - (d3 * 10);
        int d4 = value / 1;

        if(d1 == d4){
            if(d2 == d3){
                System.out.printf("Value is a palindrome %d", valueRev);
            } else{
                System.out.printf("Value is not a palindrome %d", valueRev);
            }
        } else{
            System.out.printf("Value is not a palindrome %d", valueRev);
        }
    }
}