#include<vector>
#include <iostream>
#include <ncurses.h>
#include <cstring>
#include <string>
#include <unistd.h>
using namespace std;

using VEC = vector<char>;
using MATRIX = vector<VEC>;

MATRIX makeMat();
void printMat(MATRIX currentMat);
void placeCells(MATRIX& currentMat);
void rules(MATRIX& copyMat, MATRIX& currentMat);
void generations(MATRIX& copyMat, MATRIX& currentMat);