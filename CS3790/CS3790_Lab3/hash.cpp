#include <unistd.h>  // crypt
#include <stdio.h>
#include <string.h>
#include <string>
#include <iostream>

using namespace std;

string hasher(string);

string hasher(string password) {
    const char* salt = "$6$imsosalty$";
    char* hash = crypt(password.c_str(), salt);
    if (!hash) {
        perror("crypt");
        return "Error";
    }

    return string(hash);
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        cout << "I need a username and password!";
    }
    string hashedPassword = hasher(argv[2]);
    cout << "UserName: " << argv[1] << endl;
    cout << "Password: " << argv[2] << endl;
    cout << "HashedPassword: " << hashedPassword << endl;
}