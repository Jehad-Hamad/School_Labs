import java.util.Scanner;

public class Lab7_4 {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        int Rock, Paper, Scissors, user, computer;
        System.out.println("Choices are 1: Rock");
        System.out.println("            2: Paper");
        System.out.println("            3: Scissors");

        System.out.print("Which do you choose (1,2,3) : ");

        computer = (int) (Math.random() * 3) + 1;
        user = input.nextInt();
        System.out.println();
        if ((user == 1) && (computer == 3)) {
            System.out.println("You picked ROCK and I picked SCISSORS: You win");
        } else if ((user == 1) && (computer == 2)) {
            System.out.println("You picked ROCK and I picked PAPER: I win");
        } else if ((user == 1) && (computer == 1)) {
            System.out.println("You picked ROCK and I picked ROCK: tie");
        }

        else if ((user == 2) && (computer == 3)) {
            System.out.println("You picked Paper and I picked SCISSORS: I win");
        } else if ((user == 2) && (computer == 1)) {
            System.out.println("You picked Paper and I picked Rock:YOU win");
        } else if ((user == 2) && (computer == 3)) {
            System.out.println("You picked Paper and I picked Paper: tie");
        }

        else if ((user == 3) && (computer == 1)) {
            System.out.println("You picked SCISSORS and I picked Rock: I win");
        } else if ((user == 3) && (computer == 2)) {
            System.out.println("You picked SCISSORS and I picked PAPER: You win");
        } else if ((user == 3) && (computer == 3)) {
            System.out.println("You picked SCISSORS and I picked SCISSORS: tie");
        }
    }
}