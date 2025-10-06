public class Lab11_1 {
    public static void main(String[] args) {
        int[][] magic_square = { { 1, 1, 1, 1 },
                                 { 1, 1, 1, 1 },
                                 { 1, 2, 1, 1 },
                                 { 1, 1, 1, 1 }
        }; // My magic matrix is just ones

        System.out.println("Magic square");
        System.out.println();
        boolean magic = true;
        for (int row = 0; row < magic_square.length; row++) {
            for (int col = 0; col < magic_square[0].length; col++) {
                System.out.printf("  %2d  ", magic_square[row][col]);
            }
            System.out.println();
        } // simply prints the values of my magic array

        System.out.println();
        System.out.println();

        int check = 0;
        int sum = 0;

        for (int row = 0; row < 1; row++) {
            for (int col = 0; col < magic_square[0].length; col++) {
                check = check + magic_square[row][col];
            }
        } // this is used to get the value that will be used to check all other rows and
          // columns

        for (int row = 0; row < magic_square.length; row++) {
            sum = 0;
            for (int col = 0; col < magic_square[0].length; col++) {
                sum = sum + magic_square[row][col];
            }
            for (int number = 0; number < 1; number++) {
                if (sum == check) {
                    System.out.printf("Row   %2d   =   %2d   Ok", row, sum);
                } else {
                    System.out.printf("Row   %2d   =   %2d   false", row, sum);
                    magic = false;
                }
                System.out.println();
            }
        }
        System.out.println();
        // This part will first get the sum of each row than compare it to my check
        // value.
        // If it is equal to my check it prints the value and "ok" else the value then
        // false
        // The sum is inside the first for loop so it can reset back to 0 everytime i
        // change rows
        for (int col = 0; col < magic_square[0].length; col++) {
            sum = 0;
            for (int row = 0; row < magic_square.length; row++) {
                sum = sum + magic_square[row][col];
            }
            for (int number = 0; number < 1; number++) {
                if (sum == check) {
                    System.out.printf("Col   %2d   =   %2d   Ok", col, sum);
                } else {
                    System.out.printf("Col   %2d   =   %2d   false", col, sum);
                    magic = false;
                }
                System.out.println();
            }
        }
        System.out.println();
        // This part will first get the sum of each col than compare it to my check
        // value.
        // If it is equal to my check it prints the value and "ok" else the value then
        // false
        // The sum is inside the first for loop so it can reset back to 0 everytime i
        // change col
        sum = 0;
        for (int i = 0; i < 1; i++) {
            for (int row = 0; row < magic_square.length; row++) {
                sum = sum + magic_square[row][row];
            }
            for (int number = 0; number < 1; number++) {
                if (sum == check) {
                    System.out.printf("Major Diagonal    =   %2d   Ok", sum);
                } else {
                    System.out.printf("Major Diagonal    =   %2d   false", sum);
                    magic = false;
                }
                System.out.println();
            }
        }
        // This part of my code will add the magic array at [row][row] as 0,0 1,1 2,2
        // 3,3 is the major diag

        sum = 0;
        for (int i = 0; i < 1; i++) {
            for (int row = 0; row < magic_square.length; row++) {
                sum += magic_square[row][magic_square.length - row - 1];
            }
            // This part of my code will add the magic array at [row][[magic_square.length -
            // row - 1].
            // This is becuase i want to start at my first row and last col then add to my
            // rows as i decrease my columns.
            // SO 0,3 1,2 ,2,1 3,0
            for (int number = 0; number < 1; number++) {
                if (sum == check) {
                    System.out.printf("Minor Diagonal    =   %2d   Ok", sum);
                } else {
                    System.out.printf("Minor Diagonal    =   %2d   false", sum);
                    magic = false;
                }
                System.out.println();
            }
        }
        System.out.println();

        if (magic == true) {
            System.out.println("This Square is Magical");
        } else {
            System.out.println("This Square is Not Magical");
        }
        System.out.println();
        // Theres a boolean that checks if at anypoint it has turned false in every else statement
        // if at any point its false it will print ("This Square is Not Magical")
        // if not it will print("This Square is Magical");
    }
}
