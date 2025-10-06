public class Lab10_2 {
    public static void main(String[] args) {

        int[] initial_array = new int[15];
        for (int i = 0; i < initial_array.length; i++) {
            initial_array[i] = (int) (Math.random() * 99) + 1;
        }

        int even = 0;
        int odd = initial_array.length - 1;

        System.out.println("Initial");
        System.out.printf("List = ");

        int[] new_array = new int[initial_array.length];

        for (int i = 0; i < initial_array.length; i++) {
            System.out.printf("%3d ", initial_array[i]);
        }
        System.out.println();

        for (int k = 0; k < initial_array.length; k++) {
            if (initial_array[k] % 2 == 0) {
                new_array[even] = initial_array[k];
                even++;
            } else {
                new_array[odd] = initial_array[k];
                odd--;
            }
        }
        System.out.println();
        System.out.println("Even or Odd");
        System.out.printf("List = ");
        for (int i = 0; i < initial_array.length; i++) {
            System.out.printf("%3d ", new_array[i]);
        }
        System.out.println();
        System.out.println();
    }
}
