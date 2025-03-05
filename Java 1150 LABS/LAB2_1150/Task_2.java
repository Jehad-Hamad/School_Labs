public class Task_2 {
                                                            // Jehad Hamad CS1150 #2 26/01/24
    public static int binary_Search(char[] tmp, char key_holder) {
        int max = tmp.length - 1;
        int min = 0;
        while (min <= max) {
            int mid = (max + min) / 2;
            if (key_holder == tmp[mid]) {
                return mid;
            } else if (key_holder < tmp[mid]) {
                max = mid - 1;
            } else
                min = mid + 1;
        }
        return -1;
    }

    public static void main(String args[]) {
        char[] data = { 'a', 'b', 'e', 'f' };
        char key = 'c';

        if (binary_Search(data, key) != -1) {
            System.out.println("The index of " + key + " is at " + binary_Search(data, key));
        } else {
            System.out
                    .println("The index of " + key + " is " + binary_Search(data, key) + " because it does not exist");
        }

    }
}
