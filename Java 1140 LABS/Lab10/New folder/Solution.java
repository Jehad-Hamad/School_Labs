class Solution {
    public static void main(String[] args) {

        int k = 0;
        int m = 0;
        int[] nums = { 0, 0, 1, 1, 1, 2, 2, 3, 3, 4 };
        int[] expectedNums = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            boolean dupe = true;
            for (int j = 0; j < i; j++) {
                if (nums[i] == nums[j]) {
                    dupe = false;
                    break;
                }
            }
            if (dupe == true) {
                expectedNums[m] = nums[i];
                m++;
                k++;
            }
        }
        System.out.printf("%1d, nums = [", k);
        for (int j = 1; j < expectedNums.length; j++) {
            if ((expectedNums[j - 1] == 0) && expectedNums[j] == 0) {

            } else {
                System.out.printf("%3d,", expectedNums[j - 1]);
            }
        }
        System.out.printf("]");
    }
}