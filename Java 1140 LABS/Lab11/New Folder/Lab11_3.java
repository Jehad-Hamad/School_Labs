import java.util.Scanner;


public class Lab11_3 {
    public static void main(String[] args) {

        int BOMB = -1;
        int mapHeight = 10;
        int mapWidth = 10;
        System.out.print("How many bomb's would you like to place: ");
        Scanner input = new Scanner(System.in);
        int bombNumber = input.nextInt();
        int[][] map = new int[mapWidth][mapHeight];

        for (int i = 1; i <= bombNumber; i++) {
            int x_cor;
            int y_cor;
            while (true) {
                x_cor = (int) (Math.random() * mapWidth);
                y_cor = (int) (Math.random() * mapHeight);
                if (map[x_cor][y_cor] != BOMB) {
                    map[x_cor][y_cor] = BOMB;
                    break;
                }
            }
        }
        for (int x = 0; x < map.length; x++) {
            for (int y = 0; y < map[0].length; y++) {
                if (map[x][y] != BOMB) {
                    int bombCounter = 0;
                    // check left
                    // the if statement will check if x is inside the bounds.
                    // think about x = 0. its the left edge
                    // so no need to check the left of it
                    if (x - 1 >= 0) {
                        if (map[x - 1][y] == BOMB) {
                            bombCounter++;
                        }
                    }
                    // check right
                    // the if statement will check if x is inside the bounds.
                    // think about x = 8. thats the right edge
                    // no need to check the right of it
                    if (x + 1 < mapWidth)
                        if (map[x + 1][y] == BOMB) {
                            bombCounter++;
                        }
                    // check bottom
                    // the if statement will check if y is inside the bounds.
                    // think about y = 8. thats the bottom edge
                    // no need to check the bottom of it
                    if (y + 1 < mapHeight) {
                        if (map[x][y + 1] == BOMB) {
                            bombCounter++;
                        }
                    }
                    // check top
                    // the if statement will check if y is inside the bounds.
                    // think about y = 0. Thats the top edge
                    // no need to check on top of it
                    if (y - 1 >= 0) {
                        if (map[x][y - 1] == BOMB) {
                            bombCounter++;
                        }
                    }
                    // top left corner
                    // this is a combo of two conditions
                    // think about x=0 and y=
                    // it has no corner so need to look at it.
                    if ((x - 1 >= 0) && (y + 1 < mapHeight)) {
                        if (map[x - 1][y + 1] == BOMB) {
                            bombCounter++;
                        }
                    } // bottom left
                      // this is a combo of two conditions
                      // think about x=0 and y=0
                      // it has no corner so need to look at it.
                    if ((x - 1 >= 0) && (y - 1 >= 0)) {
                        if (map[x - 1][y - 1] == BOMB) {
                            bombCounter++;
                        }
                    } // top right
                    if ((x + 1 < mapWidth) && (y + 1 < mapHeight)) {
                        if (map[x + 1][y + 1] == BOMB) {
                            bombCounter++;
                        }
                    } // bottom right
                    if ((x + 1 < mapWidth) && (y - 1 >= 0)) {
                        if (map[x + 1][y - 1] == BOMB) {
                            bombCounter++;
                        }
                    }
                    map[x][y] = bombCounter;
                }
            }
        }
        for (int i = 0; i < map.length; i++) {
            for (int j = 0; j < map[0].length; j++) {
                if (map[i][j] == -1) {
                    System.out.print(" * ");
                } else if (map[i][j] == 0) {
                    System.out.print(" . ");
                } else {
                    System.out.printf("%2d ", map[i][j]);
                }
            }
            System.out.println();
        }
        System.out.println();
        input.close();
    }
}
