public class Task2 {       
                                 //Jehad M HAMAD 12/02/2024 LAB5

    public static void main(String[] args) {
        String word = "abcabcdgabxy";
        String seq = "";
        int seq_num = 0;
        String true_word = "";
        int true_seq = 0;

        for (int i = 0; i <= word.length() - 1; i++) {
            if (i < word.length() - 1 && word.charAt(i) < word.charAt(i+1)) {
                seq += word.charAt(i);
                seq_num++;
            } else {
                seq += word.charAt(i);  // Include the current character in the sequence
                seq_num++;
                if (true_seq < seq_num) {
                    true_word = seq;
                    true_seq = seq_num;
                }
                seq = "";  // Reset sequence
                seq_num = 0;  // Reset sequence count
            }
        }
        System.out.println(true_word);
    }
}
