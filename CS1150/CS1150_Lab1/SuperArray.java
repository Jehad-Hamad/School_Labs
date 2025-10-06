public class SuperArray {
    //                                  Jehad Hamad CS1150 #1 15/01/24
    int[] arr;

    static final private int default_size = 20;
    int num_plus_one = 1;

    

    public SuperArray(int size) {
        if (size <= 0) {
            arr = new int[default_size];
        } else {
            arr = new int[size];
        }
    }

    public void fillSimple() {
        for (int i = 0; i < arr.length; i++) {
            arr[i] = i + 1;
        }
    }

    public void print() {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }

    public static void main(String[] args) {
        SuperArray OB1 = new SuperArray(5);
        System.out.println();
        OB1.fillSimple();
        OB1.print();
        System.out.println();

        SuperArray OB2 = new SuperArray(-1);
        System.out.println();
        OB2.fillSimple();
        OB2.print();
        System.out.println();

        SuperArray OB3 = new SuperArray(10);
        System.out.println();
        OB3.fillSimple();
        OB3.print();
        System.out.println();
    }
}
