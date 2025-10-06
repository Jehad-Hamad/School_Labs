
import java.util.Scanner;
import java.io.File;

public class PayCheck {

    public static void main(String args[]) throws Exception {
        Scanner inputFile = new Scanner(new File("PaycheckData.txt"));
        double wage, hMon, hTue, hWed, hThu, hFri, hSat, hSun, totalhours;
        System.out.println("Employee Paystub");
        System.out.println();
        wage = inputFile.nextDouble();
        System.out.println("Hourly wage                 : "+  wage);
        hMon = inputFile.nextDouble();
        System.out.println("Hours worked on Monday      : "+  hMon);
        hTue = inputFile.nextDouble();
        System.out.println("Hours worked on Tuesday     : " + hTue);
        hWed = inputFile.nextDouble();
        System.out.println("Hours worked on Wednesday   : " + hWed);
        hThu = inputFile.nextDouble();
        System.out.println("Hours worked on Thursday    : " + hThu);
        hFri = inputFile.nextDouble();
        System.out.println("Hours worked on Friday      : " + hFri);
        hSat = inputFile.nextDouble();
        System.out.println("Hours worked on Saturday    : " + hSat);
        hSun = inputFile.nextDouble();
        System.out.println("Hours worked on Subday      : " + hSun);
        System.out.println();
        totalhours = hMon + hTue + hWed + hThu + hFri + hSat + hSun;
        System.out.println("Total Hours worked          : " + totalhours);
        System.out.println();
        System.out.println("Monday earnings             : $ " + (hMon * wage));
        System.out.println("Tuesday earnings            : $" + (hTue * wage));
        System.out.println("Wednesday earnings          : $ " + (hWed * wage));
        System.out.println("Thursday earnings           : $ " + (hThu * wage));
        System.out.println("Friday earnings             : $ " + (hFri * wage));
        System.out.println("Saturday earnings           : $" + (hSat * wage));
        System.out.println("Sunday earnings             : $" + (hSun * wage));
        System.out.println("Sunday earnings             : $" + (hSun * wage));
        System.out.println();
        System.out.println("Weekday earnings            : $" + ((hMon + hTue + hWed + hThu + hFri) * wage));
        System.out.println("Weekday earnings            : $" + ((hSat + hSun) * wage));
        System.out.println();
        System.out.println("Total Salary                : $" + totalhours*wage);
    }
}
