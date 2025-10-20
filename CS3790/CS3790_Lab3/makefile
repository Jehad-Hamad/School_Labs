CC=g++
CC_FLAGS= -std=c++11 -Wall -Wextra -pedantic 

all: hash.out

hash.out: 
	$(CC) $(CC_FLAGS) hash.cpp -o hash.out



check: hash.cpp
	cppcheck hash.cpp

clean:
	rm -f hash.out