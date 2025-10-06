#include <iostream>
#include "gameOfLife.h"
using namespace std;

//printing my matrix
void printMat(MATRIX M) {
	initscr();
	noecho();
	cbreak();
	for (auto iter = 0; iter < 1; iter++) {
		for (auto y = 1; y < M[0].size() - 1; y++)
			for (auto x = 1; x < M[y].size() - 1; x++)
			{
				mvprintw(y, x, "%c", M[y][x]);
			}
		refresh();
		usleep(500000);
	}
	endwin();
}

//place cells
void placeCells(MATRIX& currentMat) {
	MEVENT event;
	int yMax = 0, yMin = currentMat.size(), xMax = 0, xMin = currentMat.size();
	initscr();
	noecho();
	cbreak();
	keypad(stdscr, TRUE);
	curs_set(0);
	mouseinterval(3);
	mousemask(ALL_MOUSE_EVENTS, NULL);

	while (1)
	{
		int c = getch();
		switch (c)
		{
		case KEY_MOUSE:
			if (getmouse(&event) == OK)
				if (event.bstate & BUTTON1_PRESSED)
				{
					if (event.y > 0 && event.y < currentMat.size() - 1 && event.x > 0 && event.x < currentMat[0].size()) {
						mvprintw(0, 0, "screen press 'q' to exit");
						currentMat[event.y][(event.x)] = (currentMat[event.y][(event.x)] == ' ') ? 'X' : ' ';
						printMat(currentMat);
						refresh();
					}
				}
			break;
		case 'q':
			goto end;
		}
	}
end:
	endwin();
}

//rules
void rules(MATRIX& copyMat, MATRIX& currentMat) {
	for (auto y = 1; y < currentMat[0].size() - 1; y++) {
		for (auto x = 1; x < currentMat[y].size() - 1; x++) {
			int neighbours = 0;
			if (currentMat[y - 1][x] == 'X')      //checks up
				neighbours += 1;

			if (currentMat[y + 1][x] == 'X')      //checks down
				neighbours += 1;

			if (currentMat[y][x - 1] == 'X')        // checks left
				neighbours += 1;

			if (currentMat[y][x + 1] == 'X')        //checks right
				neighbours += 1;

			if (currentMat[y - 1][x - 1] == 'X')    //checks left upper corner
				neighbours += 1;

			if (currentMat[y - 1][x + 1] == 'X')  //checks right upper corner
				neighbours += 1;

			if (currentMat[y + 1][x - 1] == 'X')  //checks left lower corner
				neighbours += 1;

			if (currentMat[y + 1][x + 1] == 'X')  //checks right lower corner
				neighbours += 1;

			if (currentMat[y][x] == 'X') {
				if (neighbours < 2) {
					copyMat[y][x] = ' ';
				}
				else if (neighbours == 2 || neighbours == 3) {
					copyMat[y][x] = 'X';
				}
				else if (neighbours > 3) {
					copyMat[y][x] = ' ';
				}
			}
			else if (currentMat[y][x] == ' ') {
				if (neighbours == 3) {
					copyMat[y][x] = 'X';
				}
				else {
					copyMat[y][x] = ' ';
				}
			}
		}
	}
	currentMat = copyMat;
}

//genertations
void generations(MATRIX& copyMat, MATRIX& currentMat) {
	int generations = 1;
	cout << "how many generations do you want: ";
	cin >> generations;
	cout << endl;
	clear();

	for (auto i = 0; i <= generations; i++) {
		mvprintw(0, 0, "generations: %d", i);
		printMat(currentMat);
		rules(copyMat, currentMat);
	}
}
