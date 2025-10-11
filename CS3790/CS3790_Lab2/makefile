CC=g++
CC_FLAGS= -std=c++11 -Wall -Wextra -pedantic 

all: boss.out worker.out

boss.out: boss.cpp boss.h
	$(CC) $(CC_FLAGS) boss.cpp -o boss.out

worker.out: worker.cpp worker.h
	$(CC) $(CC_FLAGS) worker.cpp -o worker.out

 

check: worker.cpp boss.cpp
	cppcheck worker.cpp boss.cpp

clean:
	rm -f boss.out worker.out