#include <stdio.h>

// This program writes a char ('<char>') to stderr.
int main(int argc, char* argv[]) {
    unsigned int i = 0;

    while (1)
        if (!(i++ % 10000000)) putc(argv[1][0], stderr);
    return 0;
}
