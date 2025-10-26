#include <iostream>
#include <fstream>
#include <cstdlib>

using namespace std;

int main(int argc, char* argv[]) {
    if (argc < 3) {
        cout << "Usage: " << argv[0] << " <num1> <num2>\n";
        return 1;
    }

    int a = atoi(argv[1]);
    int b = atoi(argv[2]);
    int sum = a + b;

    // filename: "a_b.txt"
    string filename = string(argv[1]) + "_" + string(argv[2]) + ".txt";

    ofstream out(filename);

    out << sum << endl;

    return 0;
}
