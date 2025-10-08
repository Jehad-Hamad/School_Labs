#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char* argv[]) {
    execl("./worker.out", argv[0], argv[1], argv[2], (char*)NULL);
    perror("execl failed");  // only runs if execl fails
    return 1;
}
