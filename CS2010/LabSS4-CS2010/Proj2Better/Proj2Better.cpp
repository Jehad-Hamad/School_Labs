#include <iostream>
#include "gameOfLife.h"
using namespace std;

int main()
{
	MATRIX currentMat(80 + 2, VEC(24 + 2, ' '));

	placeCells(currentMat);
	printMat(currentMat);

	MATRIX copyMat = currentMat;
	generations(copyMat, currentMat);
}