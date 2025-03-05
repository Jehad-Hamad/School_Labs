#include <iostream>
using namespace std;

extern int dollor;
extern int quarter;
extern int dime;
extern int nickle;
extern int pennie;
extern int usr_pennie;
extern int total;
extern int rmd;

int main() {
	cout << "how many pennies less than 100 do you want to use ";
	cin >> usr_pennie;
	usr_pennie = 100 - usr_pennie;
	total = usr_pennie / dollor;
	rmd = usr_pennie % dollor;
	cout << "your number of dollor is " << total << " \n";

	total = rmd / quarter;
	rmd = rmd % quarter;
	cout << "your number of quarter is " << total << " \n";

	total = rmd / dime;
	rmd = rmd % dime;
	cout << "your number of dime is " << total << " \n";

	total = rmd / nickle;
	rmd = rmd % nickle;
	cout << "your number of nickle is " << total << " \n";

	total = rmd / pennie;
	rmd = rmd % pennie;
	cout << "your number of pennie is " << total << " \n";




	return 0;
}