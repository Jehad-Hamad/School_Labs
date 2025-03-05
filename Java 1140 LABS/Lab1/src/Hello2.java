/*
 A simple program demonstrating console printing and numeric output and
 also simple integer numeric variable declaration and assignment.
*/
public class Hello2 {
    public static void main(String[] args) {
        int tmpX; // reserve space for an integer
        System.out.println("This is Hello2");
        System.out.println();
        System.out.println("There should be blank line above this one");
        System.out.println();
        tmpX = 112; // I put the number 112 into the variable identifier tmpX
        System.out.println("I can also print numbers : ");
        System.out.println(tmpX);
        System.out.println();

        System.out.println("I can print numbers on the same line : " + tmpX);
        tmpX = 555; // I can put a new number into tmpx
        System.out.print("A different way to print numbers on the same line ");
        System.out.println(tmpX);
        System.out.println();
        System.out.println("Hope you understand what we just did!");
    } // end method main
} // end class Hello2