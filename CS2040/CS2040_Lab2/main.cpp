#include <iostream>
#include <fstream>
#include "Tree/node.h" // Include the header

using namespace std;

int main()
{
    Node *root = new Node(' '); // Create a new Node
    


    
    ifstream f("file.txt");
    string s;
    char d;
    string pattern;
    while (getline(f, s))
    {
        d = s[0];
        pattern = s.substr(2);
        root->insertNode(root, d, pattern);

    }
    preorder(root);
    cout << endl;


    f.close();
    
    return 0;
}
