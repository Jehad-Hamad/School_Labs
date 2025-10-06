#include<vector>
#include <iostream>
#include "gameOfLife.h"
using namespace std;

//make a matrix
 MATRIX makeMat() {
	int row, col = 0;
	cout << "how big do your want your matrix to be? \n";
	cout << "your row is: ";
	cin >> row;
	cout << "your coloumn is: ";
	cin >> col;
	MATRIX currentMat(row + 2, VEC(col + 2, 0));
	cout << endl;
	return currentMat;
}

//printing my matrix
 void printMat(MATRIX currentMat) {
	for (auto y = 1; y < currentMat[0].size() - 1; y++) {
		for (auto x = 1; x < currentMat[y].size() - 1; x++) {
			cout << currentMat[y][x];
		}
		cout << endl;
	}
	cout << endl;
}

//place cells
 void placeCells(MATRIX& currentMat) {
	cout << "how mant cells do you want to place: ";
	int col, row, cell = 0;
	cin >> cell;
	for (auto i = 0; i < cell; i++) {
		cin >> row;
		cin >> col;
		currentMat[row + 1][col + 1] = 1;
	}
	cout << endl;
}

//rules
 void rules(MATRIX& copyMat, MATRIX& currentMat) {
	for (auto y = 1; y < currentMat[0].size() - 1; y++) {
		for (auto x = 1; x < currentMat[y].size() - 1; x++) {
			int neighbours = 0;
			if (currentMat[y - 1][x] == 1)      //checks up
				neighbours += 1;

			if (currentMat[y + 1][x] == 1)      //checks down
				neighbours += 1;

			if (currentMat[y][x - 1] == 1)        // checks left
				neighbours += 1;

			if (currentMat[y][x + 1] == 1)        //checks right
				neighbours += 1;

			if (currentMat[y - 1][x - 1] == 1)    //checks left upper corner
				neighbours += 1;

			if (currentMat[y - 1][x + 1] == 1)  //checks right upper corner
				neighbours += 1;

			if (currentMat[y + 1][x - 1] == 1)  //checks left lower corner
				neighbours += 1;

			if (currentMat[y + 1][x + 1] == 1)  //checks right lower corner
				neighbours += 1;

			if (currentMat[y][x] == 1) {
				if (neighbours < 2) {
					copyMat[y][x] = 0;
				}
				else if (neighbours == 2 || neighbours == 3) {
					copyMat[y][x] = 1;
				}
				else if (neighbours > 3) {
					copyMat[y][x] = 0;
				}
			}
			else if (currentMat[y][x] == 0) {
				if (neighbours == 3) {
					copyMat[y][x] = 1;
				}
				else {
					copyMat[y][x] = 0;
				}
			}
		}
	}
	currentMat = copyMat;
}

//genertations
 void genertions(MATRIX& copyMat, MATRIX& currentMat) {
	int genertions = 1;
	cout << "how many genertions do you want: ";
	cin >> genertions;
	cout << endl;
	for (auto i = 0; i < genertions; i++) {
		rules(copyMat, currentMat);
		printMat(currentMat);
	}
}