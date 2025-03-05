#include<vector>
#include <iostream>
#include "gameOfLife.h"
using namespace std;

int main()
{
	MATRIX currentMat = makeMat();
	printMat(currentMat);
	placeCells(currentMat);
	printMat(currentMat);

	MATRIX copyMat = currentMat;
	genertions(copyMat, currentMat);
}