#include <iostream>
#include <cstdlib>
#include <time.h>
#include <string>
using namespace std;

static int die();
static void playGame(int& credits);
static void winner(int& credits, int& wager, bool& playing);
static void loser(int& credits, int& wager, bool& playing);

//Main
int main() {
	int credits = 100;
	srand(time(NULL));
	string ans = "n";
	bool done = false;

	while (!done) {
		playGame(credits);
		if (credits == 0) {
			break;
		}
		cout << " Play again (y/n) ? ";
		while (ans != "n" || ans != "N" || ans != "y" || ans != "y") {
			cin >> ans;
			if (ans == "n" || ans == "N") {
				done = true;
				break;
			}
			else if (ans == "y" || ans == "y") {
				done = false;
				break;
			}
			else
				cout << "enter either a y or n : ";
		}

		cout << endl;
	}
	return 0;
}

//function for dice roll that will roll two dice and return thier some
static int die() {
	int d1 = rand() % 6 + 1;
	int d2 = rand() % 6 + 1;
	int sum = d1 + d2;
	cout << "player rolled " << d1 << " + " << d2 << " = " << sum << endl;
	return sum;
}

//does winner stuff
static void winner(int& credits, int& wager, bool& playing) {
	credits += wager;
	cout << "player wins\n\nyou won " << wager << " Your new balance is " << credits << " credits";
	playing = false;
}

//does loser stuff
static void loser(int& credits, int& wager, bool& playing) {
	credits -= wager;
	if (credits == 0) {
		cout << "\nyou lost " << wager << " credits You are out of credits - game over";
	}
	else {
		cout << "player loses\n\nyou lost " << wager << " Your new balance is " << credits << " credits";
	}
	playing = false;
}

//function for playGame, will implement the rules for craps
static void playGame(int& credits) {
	int wager = 0;
	int playPoint = 0;
	bool playing = true;

	cout << "You have " << credits << " credits \n";
	cout << "How much do you wager: ";

	while (wager <= 0 || wager > credits) {
		cin >> wager;
		if (wager <= 0 || wager > credits) {
			cin.clear();
			cin.ignore();
			cout << "Invalid wager. Try again please: ";
		}
	}

	while (playing) {
		cout << endl;
		int roll = die();

		if ((roll == 7) || (roll == 11)) {
			winner(credits, wager, playing);
		}
		else if ((roll == 2) || (roll == 3) || (roll == 12)) {
			loser(credits, wager, playing);
		}
		else {
			playPoint = roll;
			cout << "point is " << playPoint << "\n";
			int newRoll = 0;
			while (playing) {
				newRoll = die();

				if (newRoll == 7) {
					loser(credits, wager, playing);
				}
				else if (newRoll == playPoint) {
					winner(credits, wager, playing);
				}
			}
		}
	}
}