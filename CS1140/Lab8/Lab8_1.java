import java.util.Scanner;

public class Lab8_1 {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        double limit, hormonicNumber, k, sumHV, HV;

        System.out.println("Harmonic numbers");
        System.out.print("Enter the harmonic number that you wish computed : ");
        hormonicNumber = input.nextInt();
        k = 1;
        limit = 0;
        HV = 1 / k;
        sumHV = 0;
        sumHV = sumHV + HV;
        // My k is one as in the harmonic series you have to to start as 1
        // Limit is what I will use TO reach the HN i want to find.
        // at the end of the loop it will increase till the limit is greater than my HN.
        // this will cause the loop to end.
        // term is simply 1/starting value as my starting value goes up every time.
        // sumHV is the sum of my past harmonicValue and the new harmonic values
        while (limit < hormonicNumber) {
            System.out.printf("k = %3.0f  term = %7.5f   Harmonic value = %7.5f \n", k, HV, sumHV);
            k = k + 1;
            HV = 1 / k;
            sumHV = sumHV + HV;
            limit++;
        }
        input.close();
        // while my limit is less than my HN do this.
        // take my term number (k) and add one its self.
        // take my HV and put 1/my term number(k) in it
        // take the sum of my HV and add its pervious value and the new HV
        // increase my limit by one, run until the limit overcomes my HN
    }
}
