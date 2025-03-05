import java.*;

public class Task2 {
    // JehadMHamad LAB 11 02/04/23
    static int[] merge(int[] a, int[] b) {
        int aPoint = 0;
        int bPoint = 0;

        int[] c = new int[a.length + b.length];

        for (int i = 0; i < c.length; i++) {
            if (aPoint >= a.length) {
                c[i] = b[bPoint];
                bPoint++;
            } else if (bPoint >= b.length) {
                c[i] = a[aPoint];
                aPoint++;
            } else if (a[aPoint] < b[bPoint]) {
                c[i] = a[aPoint];
                aPoint++;
            } else {
                c[i] = b[bPoint];
                bPoint++;
            }
        }

        return c;

    }

    public static void main(String[] args) {
        int[] a = { 1, 3, 4 };
        int[] b = { 2, };
        int[] values = merge(a, b);
        for (int i = 0; i < values.length; i++) {
            System.out.printf(" %d ", values[i]);
        }
    }
}