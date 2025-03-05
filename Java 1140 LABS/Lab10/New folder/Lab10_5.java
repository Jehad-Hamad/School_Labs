public class Lab10_5 {
    public static void main(String[] args) {

        System.out.println("Yet More Array Processing");
        System.out.println();
        int[] list = new int[15];
        for (int i = 0; i < list.length; i++) {
            int numRange = (int) (Math.random() * 99) + 1;
            list[i] = numRange;
        }

        System.out.print("List is : ");
        for (int i = 0; i < list.length; i++) {
            System.out.print(list[i] + " ");
        }
        System.out.println();

        int sequence = 0;
        int sequenceLoco = 0;
        int longestSeq = 0;
        int longIndexLoco = 0;
        for (int i = 0; i < list.length - 1; i++) {
            if (list[i] <= list[i + 1]) {
                sequence++;
            } else {
                sequence = 1;
                sequenceLoco = i + 1;
            }
            if (sequence > longestSeq) {
                longestSeq = sequence;
                longIndexLoco = sequenceLoco;
            }
        }
        System.out.println();

        System.out.println("Longest sequence is : " + longestSeq);
        System.out.println("Longest location is : " + longIndexLoco);
        System.out.println();

        System.out.printf("sequence values are :");
        for (int i = 0; i < longestSeq; i++) {
            System.out.print("  " + list[i + longIndexLoco]);
        }
        System.out.println();
    }
}
