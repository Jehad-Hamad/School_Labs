#include <iostream>
#include "hash.h"
#include "../lib/commonFunctions.h"

int main(int argc, char* argv[]) {
    if (argc < 3) {
        cout << "I need a username and password!";
        return -1;
    }

    string hashedPassword = hasher(argv[2]);
    cout << "UserName: " << argv[1] << endl;
    cout << "Password: " << argv[2] << endl;
    cout << "HashedPassword: " << hashedPassword << endl;
    return 0;
}