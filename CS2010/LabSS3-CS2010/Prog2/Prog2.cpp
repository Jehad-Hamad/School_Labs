// Prog2.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
using namespace std;
int main()
{
    double x = 1.00;
    double y = 2.00;

    cout << "the value of x is " << x << "\nthe value of y is " << y << "\n\n";

    double* ptr_x = &x;
    double* ptr_y = &y;

    cout << "the value of x using ptr is " << *ptr_x << "\nthe value of y using ptr is " << *ptr_y << "\n\n";
    cout << "the sum of x and y using pointers is " << *ptr_x + *ptr_y << "\n\n";
    return 0;

}