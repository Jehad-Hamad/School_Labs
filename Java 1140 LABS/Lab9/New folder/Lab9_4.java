import java.util.Scanner; 

public class Lab9_4{
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);

		while(true){
			System.out.printf("Pattern generator program\n");
			int pattern;
			while (true) {
				System.out.printf("Choose pattern (1-4) : ");
				pattern = input.nextInt();
				if(pattern >= 1 && pattern <= 4){
					break;
				} else{
					System.out.printf("Incorrect – must be between 1 – 4\n\n");
				}
			}
			int rows;
			while (true) {
				System.out.printf("How many rows(3-9)   : ");
				rows = input.nextInt();
				if(rows >= 3 && rows <= 9){
					break;
				} else{
					System.out.printf("Incorrect – must be between 3 – 9\n\n");
				}
			}

			switch (pattern) {
				case 1:
					for(int i = 0; i < rows; i++){
						for(int j = 0; j < i + 1; j++){
							System.out.printf("%d ", j + 1);
						}
						System.out.printf("\n");
					}
					break;
				case 2:
					for(int i = rows; i > 0; i--){
						for(int j = 0; j < i; j++){
							System.out.printf("%d ", j + 1);
						}
						System.out.printf("\n");
					}
					break;
				case 3:
					for(int i = rows; i > 0; i--){
						for(int j = 0; j < i; j++){
							System.out.printf("  ");
						}
						for(int j = rows - i + 1; j > 0; j--){
							System.out.printf("%d ", j);
						}
						System.out.printf("\n");
					}
					break;
				case 4:
					for(int i = 0; i < rows; i++){
						for(int j = 0; j < i; j++){
							System.out.printf("  ");
						}
						for(int j = 0; j < rows - i; j++){
							System.out.printf("%d ", j + 1);
						}
						System.out.printf("\n");
					}
					break;
					
				default:
					System.err.println("You messed up");
					return;
			}
			System.out.print("Do you wish to do another (Y/N)? : ");
			char repeat = input.next().charAt(0);
			if(repeat == 'n' || repeat == 'N'){
				input.close();
				break;
			}
		}
	}
}