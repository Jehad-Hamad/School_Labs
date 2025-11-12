CC = g++
CC_FLAGS = -std=c++11 -Wall -Wextra -pedantic

BIN = bin
SCHEDULE = Schedule

all: $(BIN)/main.out $(BIN)/period.out

# Build scheduler object file
$(BIN)/scheduler.o: $(SCHEDULE)/scheduler.cpp $(SCHEDULE)/scheduler.h
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) -c $(SCHEDULE)/scheduler.cpp -o $(BIN)/scheduler.o

# Period program
$(BIN)/period.out: period.cpp
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) period.cpp -o $(BIN)/period.out

# Main program
$(BIN)/main.out: main.cpp $(BIN)/scheduler.o
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) main.cpp $(BIN)/scheduler.o -o $(BIN)/main.out

check:
	cppcheck period.cpp main.cpp $(SCHEDULE)/scheduler.cpp $(SCHEDULE)/scheduler.h

clean:
	rm -rf $(BIN)
