public class Lab11_2 {
    public static void main(String[] args) {
        int[][] sudoku = {
                // { 1, 5, 7, 4, 8, 3, 6, 2, 9 },
                // { 6, 3, 8, 1, 2, 9, 7, 5, 4 },
                // { 4, 9, 2, 5, 6, 7, 1, 3, 8 },
                // { 8, 4, 5, 9, 7, 6, 3, 1, 2 },
                // { 7, 2, 1, 3, 5, 8, 9, 4, 6 },
                // { 3, 6, 9, 2, 1, 4, 5, 8, 7 },
                // { 5, 1, 6, 7, 4, 2, 8, 9, 3 },
                // { 2, 8, 3, 6, 9, 1, 4, 7, 5 },
                // { 9, 7, 4, 8, 3, 5, 2, 6, 1 },
                // //
                //the top one works
                { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
                { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
                { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
                { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
                { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
                { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
                { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
                { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
                { 1, 2, 3, 4, 5, 6, 7, 8, 9 },
                //this one will get you isuues with col

        };
        // Makes an array called sudoku with the values he game me
        int size = sudoku[0].length;
        boolean check = true;
        boolean[] badRow = new boolean[size]; // boolean array for the values of my badrow
        int[] badRowSpot = new int[size]; // gets me my spot for my bad row.

        for (int row = 0; row < size; row++) {
            boolean[] checker = new boolean[size];
            for (int col = 0; col < size; col++) {
                if (checker[sudoku[row][col] - 1] == false) {
                    checker[sudoku[row][col] - 1] = true;
                } else {
                    badRow[row] = true;
                    badRowSpot[row] = row;
                    check = false;
                }
            }
        }
        // for loops that starts my rows at 0
        // boolean array named values thast all false
        // for loops of my coulmns starts at 0
        // if statement that will check if my boolean array (CHECKER) at my sudoku array
        // at rows and columns -1 == false
        // if it is, it turns the value at the CHECKER into true
        // the else statement will come into play if that value at values is already
        // true
        // if so it puts true into my badRow array at the values of that row

        // Example row = 0 and col = 0. Our for sudoku at that is 1 then we subtract 1.
        // Then we check if the state at 0 for checker is false if it is it turns it
        // true and we move on.

        // example lets say that our row =0 and col =1. Our sudoku value at that is 1
        // then we subtract 1.
        // then we check if the state at 0 for cheacker is false. ITS NOT DUH DUHD UDUH
        // The else statement will first turn badRow at row =0 into a true to tell us
        // that theres an issue at that point.
        // then in our badRowSpot array at the value of our row which is 0 we will put
        // in the problem row which is 0
        // So at badRowSpot[1] =0
        boolean[] badCol = new boolean[size];
        int[] badColSpot = new int[size];

        for (int col = 0; col <sudoku[0].length; col++) {
            boolean[] checker = new boolean[size];
            for (int row = 0; row < size; row++) {
                if (checker[sudoku[row][col] -1] == false) {
                    checker[sudoku[row][col] -1] = true;
                } else {
                    badCol[col] = true;
                    badColSpot[col] = col;
                    check = false;
                }
            }
        }
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                System.out.print(" " + sudoku[i][j]);
            }
            System.out.println();
        }
        System.out.println();

        for (int i = 0; i < size; i++) {
            if (badRow[i] == true) {
                System.out.println("Fails at row : " + badRowSpot[i]);
                System.out.println();
            }
        }
        // for loop to check badRow values at i
        // if statement will ask if if at value (i) the boolean is true and if so it
        // will print the badRowSpot[i]
        for (int i = 0; i < size; i++) {
            if (badCol[i] == true) {
                System.out.println("Fails at Col : " + badColSpot[i]);
                System.out.println();
            }
        }
        if (check==true){
            System.out.println("CORRECT");
        } else {
            System.out.println("WRONG");
        }
    }
}