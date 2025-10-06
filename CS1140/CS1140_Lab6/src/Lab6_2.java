
import java.util.Scanner;

public class Lab6_2 {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("Arithmetic Practice Program");
        System.out.println();
        double randoOp, op1, op2, userinput, result;
        randoOp = (int)(Math.random()*4)+1;
        op1 = (int) (Math.random() * 19) + 1;
        op2 = (int) (Math.random() * 19) + 1;
//        System.out.println(randoOp);
        if (randoOp == 1) {
            System.out.print("Question :   " + op1 + " + " + op2 + " = ");
            result = op1 + op2;
            userinput = input.nextDouble();
            if (userinput == result) {
                System.out.println("Correct");
            } else if (userinput != result) {
                System.out.println("Incorrect");
                System.out.println();
            }
        } else if (randoOp == 2) {
            System.out.print("Question :   " + op1 + " - " + op2 + " = ");
            result = op1 - op2;
            userinput = input.nextDouble();
            if (userinput == result) {
                System.out.println("Correct");
            } else if (userinput != result) {
                System.out.println("Incorrect");
                System.out.println();

            }
        } else if (randoOp == 3) {
            System.out.print("Question :   " + op1 + " * " + op2 + " = ");
            userinput = input.nextDouble();
            result = op1 * op2;
            if (userinput == result) {
                System.out.println("Correct");
            } else if (userinput != result) {
                System.out.println("Incorrect");
                System.out.println();

            }
        } else if (randoOp == 4) {
            System.out.print("Question :   " + op1 + " / " + op2 + " = ");
            userinput = input.nextDouble();
            result = op1 / op2;
            if (userinput == result) {
                System.out.println("Correct");
            } else if (userinput != result) {
                System.out.println("Incorrect");
                System.out.println();
            }
        } else if (randoOp == 5) {
            System.out.print("Question :   " + op1 + " % " + op2 + " = ");
            userinput = input.nextDouble();
            result = op1 % op2;
            if (userinput == result) {
                System.out.println("Correct");
            } else if (userinput != result) {
                System.out.println("Incorrect");
                System.out.println();
            }
        }
    }
}
