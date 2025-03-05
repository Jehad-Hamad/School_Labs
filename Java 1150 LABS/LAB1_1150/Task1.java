import java.util.Scanner;
//                                      Jehad Hamad CS1150 #1 15/01/24
public class Task1 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("Welcome to Galton Box");

        int amount_balls = 1;
        System.out.print("How many balls do you want to drop:  ");
        amount_balls = input.nextInt();

        int amount_slots = 1;
        boolean state = false;
        do {
            System.out.print("How many slots do you want to have (choose more than one):  ");
            amount_slots = input.nextInt();
            if (amount_slots <= 1) {
                state = true;
            } else {
                state = false;
            }
        } while (state);

        System.out.println();

        int number_Nails = amount_slots - 1;
        int position = 0;

        String[] path_of_ball = new String[amount_balls];

        for (int i = 0; i < amount_balls; i++) {
            path_of_ball[i] = "";
            for (int L_R = 0; L_R < number_Nails; L_R++) {
                position = (int) (Math.random() * 2);
                if (position == 0) {
                    path_of_ball[i] += "L";
                } else {
                    path_of_ball[i] += "R";
                }
            }
            System.out.println(path_of_ball[i]);
        }

        int Position = 0;
        int[] ball_Position = new int[amount_slots];

        for (int m = 0; m < amount_balls; m++) {
            Position = 0;
            for (int n = 0; n < path_of_ball[m].length(); n++) {
                if (path_of_ball[m].charAt(n) == 'R') {
                    Position++;
                }
            }
            ball_Position[Position] += 1;
        }

        System.out.println();

        int num = 1;

        for (int n = 0; n < amount_slots; n++) {
            System.out.println("Slots Position " + num + " " + ball_Position[n]);
            num++;
        }

        System.out.println();


        int max_num = 0;
        for (int i = 0; i < ball_Position.length; i++) {
            if (ball_Position[i] >= max_num) {
                max_num = ball_Position[i];
            }

        }
        int numm = max_num;
        for (int i = 0; i < max_num; i++) {
            for (int j = 0; j < ball_Position.length; j++) {
                if (ball_Position[j] >= numm) {
                    System.out.print("O ");
                    ball_Position[j] -= 1;
                } else {
                    System.out.print("* ");
                }
            }
            numm--;
            System.out.println();
        }
        input.close();
    }
}
