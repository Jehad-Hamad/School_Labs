public class Task_1 {
//                                       Jehad Hamad CS1150 #2 26/01/24
    public static void printMat(int[][] data) {
        for (int i = 0; i < data.length; i++) {
            for (int j = 0; j < data[i].length; j++) {
                if (data[i][j] != 0) {
                    System.out.printf("%2d ", data[i][j]);
                }
            }
            System.out.println();
        }
    }

    public static void flipMatRows(int[][] data) {
        // I have two cases I didnt know which way you wnated me to do it.

        // Case one is if you wanted me to make a new array and copy the values to that
        // tmp array.
        // in that case i woould have to call my print method from within the
        // flipMatRows method
        // This is because im passing the tmp assay into the printMat Method

        int width = 0;
        int length = data.length;
        for (int m = 0; m < length; m++) {
            if (data[m].length >= width) {
                width = data[m].length;
            }
        }
        int[][] tmp = new int[length][width];
        int start_POS = 0;
        for (int end_POS = length - 1; end_POS >= 0; end_POS--) {
            for (int col = 0; col < data[end_POS].length; col++) {
                tmp[start_POS][col] = data[end_POS][col];

            }
            start_POS++;
        }
        printMat(tmp);

        // Case two is if im allowed to flip pointers instead.
        // This would leave my pointers fliped when i use the flipMatCols

        // int length = data.length;
        // for (int i = 0; i < length / 2; i++) {
        // int tmp[] = data[i];
        // data[i] = data[length - i - 1];
        // data[length - i - 1] = tmp;
        // }
    }

    public static void flipMatCols(int[][] data) {
        for (int i = 0; i < data.length; i++) {
            for (int j = 0; j < data[i].length / 2; j++) {
                int holder = data[i][j];
                data[i][j] = data[i][data[i].length - j - 1];
                data[i][data[i].length - j - 1] = holder;
            }
        }
    }

    public static void main(String[] args) {
        int[][] d = { { 1, 2, 3, 4, 5 },
                { 2, 3, 4, 5, 6, 7 },
                { 3, 4, 5, 6 },
                { 4, 5, 6, 7 }
        };
        System.out.println("Print the Normal array");
        printMat(d);
        System.out.println();

        System.out.println("Print the flipedMatRows array Case 1");
        flipMatRows(d);
        System.out.println();

        System.out.println("Print the flipedMatCols array for Case 1");
        flipMatCols(d);
        printMat(d);

        // System.out.println("Print the flipedMatRows array Case 2");
        // flipMatRows(d);
        // printMat(d);
        // System.out.println();

        // I dont know if you want the array to be fliped in terms of rows then flip
        // them in terms of columns but just incase
        
        // flipMatRows(d);
        // This will flip the pointer back to where they were before

        // System.out.println("Print the flipedMatCols array Case 2");
        // flipMatCols(d);
        // printMat(d);
    }
}