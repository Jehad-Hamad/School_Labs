public class Lab10_1 {
    public static void main(String[] args) {
        int m = 1;
        int[] array = new int[10];
        int gap = 0;
        for (int i = 0; i < array.length; i++) {
            array[i] = (int) (Math.random() * 21);
        }

        System.out.println("Array Processing");
        System.out.print("List is : ");
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + "  ");
        }
        System.out.println();

        boolean sort = true;
        System.out.println();
        for (int i = 0; i < array.length - 1; i++) {
            gap = array[i + 1] - array[i];
            System.out.printf("Gap  %2d  :     %3d \n", m, gap);
            m++;
            if (gap < 0) {
                sort = false;
            }
        }
        System.out.println();

        if (sort == false) {
            System.out.println("This matrix is not sorted");
        } else {
            System.out.println("This array is sorted");
        }
        System.out.println();
    }
}