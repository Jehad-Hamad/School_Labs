#include <iostream>
#include <fstream>
#include "Tree/node.h" // Include the header

using namespace std;

int main()
{
    Node *root; // Create a new Node

    ifstream f("morse.txt");
    string s;
    while (getline(f, s))
    {
        cout << s << endl;
    }

    f.close();
    return 0;
}
