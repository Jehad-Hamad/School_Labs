CC = g++
CC_FLAGS = -std=c++11 -Wall -Wextra -pedantic -Ilib

BIN = bin

all: $(BIN)/main.out 

# Main program
$(BIN)/main.out: main.cpp lib/lib.cpp lib/lib.h
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) main.cpp lib/lib.cpp -o $(BIN)/main.out

check:
	cppcheck main.cpp

clean:
	rm -rf $(BIN)