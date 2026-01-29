# CS3860 - Lab 2

**Name:** Jehad Hamad
**Course:** CS3860
**Assignment:** Lab 2

## Description

This GNU Smalltalk program analyzes a text file and produces the following statistics:

- Displays the original file contents
- Lists all unique words in a dictionary
- Counts the number of letters, words, and lines
- Shows letter frequency as a horizontal bar chart (a-z)
- Displays a word dictionary with frequency counts
- Generates a vertical histogram showing word frequency distribution

## How to Run

```bash
gst -Q fileStats.st
```

When prompted, enter the name of the text file to analyze (e.g., `File.txt`).

The `-Q` flag suppresses garbage collection messages for cleaner output.
