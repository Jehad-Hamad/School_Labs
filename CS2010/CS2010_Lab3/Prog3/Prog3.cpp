// Prog3.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
using namespace std;
int main()
{
	using VEC = int*;
	using MATRIX = VEC*;

	int a = 5;
	VEC v = &a;
	MATRIX m = &v;

	cout << " this is a " << a << " This is VEC v " << *v << " this is MATRIX m " << **m;
}