public class Lab8_4 {
    public static void main(String args[]) {

        int i = 0;
        int winnings = 0;
        while (i < 10000) {
            int dice1 = (int) (Math.random() * 6) + 1;
            int dice2 = (int) (Math.random() * 6) + 1;
            int dice3 = (int) (Math.random() * 6) + 1;
            // grabbing numbers from 1 -- 6

            if ((dice1 == 6) && (dice2 == 6) && (dice3 == 6)) {
                winnings = winnings + 20;
                //
            } else if ((dice1 == dice2) && (dice1 == dice3)) {
                winnings = winnings + 10;

            } else if ((dice1 == dice2) || (dice1 == dice3) || (dice3 == dice2)) {
                winnings = winnings + 5;

            } else {
                winnings--;
            }
            i++;
        }
        System.out.println("After 10,000 runs the player made " + winnings);
        if (winnings > 0) {
            System.out.println("This is a bad game for the casino");
        } else {
            System.out.println("This is a good game for the casino");
        }
    }
}
