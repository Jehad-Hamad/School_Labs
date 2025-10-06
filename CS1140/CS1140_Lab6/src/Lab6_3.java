
import java.util.Scanner;
import java.io.File;

public class Lab6_3 {

    public static void main(String[] args) throws Exception {
        Scanner inputFile = new Scanner(new File("PaycheckData3.txt"));
        double hwage, mon, tue, wen, thur, fri, sat, sun;
        double m1, m2, m3, m4, m5, m6, m7;
        double otm, ott, otw, otth, otf, ots, outsun;
        double otm1, ott1, otw1, otth1, otf1, ots1, outsun1;

        System.out.printf("Employee Paystub \n");
        System.out.println();
        System.out.printf("Employee First Name       : " + inputFile.next() + "\n");
        System.out.printf("Employee Last Name        : " + inputFile.next() + "\n");
        System.out.printf("Employee Number           : " + inputFile.next() + "\n");
        hwage = inputFile.nextDouble();
        System.out.printf("Hourly wage               : " + hwage + "\n\n");
        mon = inputFile.nextDouble();
        System.out.printf("Hours worked on Monday    :%6.1f ", mon);
        System.out.println();
        tue = inputFile.nextDouble();
        System.out.printf("Hours worked on Tuesday   :%6.1f ", tue);
        System.out.println();
        wen = inputFile.nextDouble();
        System.out.printf("Hours worked on Wednesday :%6.1f ", wen);
        System.out.println();
        thur = inputFile.nextDouble();
        System.out.printf("Hours worked on Thursday  :%6.1f  ", thur);
        System.out.println();
        fri = inputFile.nextDouble();
        System.out.printf("Hours worked on Friday    :%6.1f ", fri);
        System.out.println();
        sat = inputFile.nextDouble();
        System.out.printf("Hours worked on Saturday  :%6.1f ", sat);
        System.out.println();
        sun = inputFile.nextDouble();
        System.out.printf("Hours worked on Sunday    :%6.1f ", sun);
        System.out.println();
        System.out.printf("Hours worked on Sunday    :%6.1f ", sun);
        System.out.println();
        System.out.println();
        m1 = mon * hwage;
        m2 = tue * hwage;
        m3 = wen * hwage;
        m4 = thur * hwage;
        m5 = fri * hwage;
        m6 = sat * hwage;
        m7 = sun * hwage;
        System.out.printf("Monday earnings           :$%8.2f ", m1);
        System.out.println();
        System.out.printf("Tuesday earnings          :$%8.2f ", m2);
        System.out.println();
        System.out.printf("Wenesday earnings         :$%8.2f ", m3);
        System.out.println();
        System.out.printf("Thursday earnings         :$%8.2f ", m4);
        System.out.println();
        System.out.printf("Friday earnings           :$%8.2f ", m5);
        System.out.println();
        System.out.printf("Saturday earnings         :$%8.2f ", m6);
        System.out.println();
        System.out.printf("Sunday earnings           :$%8.2f ", m7);
        System.out.println();
        if (mon >= 8) {
            otm = (mon - 8) * (16.5 * 1.5);
            otm1 = (mon - 8);
            mon = (mon - otm1) * (16.5);
//            System.out.print(mon + otm);
//            System.out.println();
            if (tue >= 8) {
                ott = (tue - 8) * (16.5 * 1.5);
                ott1 = (tue - 8);
                tue = (tue - ott1) * (16.5);
                System.out.print(tue + ott1);

            }
        }
    }
}
