"Get the file and parse it"
'Please enter the name of your file: ' display.
fileName := stdin nextLine.
'' displayNl.

"Open the file and save the sentence and also print the orginal sentence"
f := FileStream open: fileName mode: FileStream read.
fileContents := WriteStream on: (String new).
linesCount := 0.
'This is the orginal sentece: ' displayNl.
f linesDo: [:x | 
    x display. 
    x printOn: fileContents. 
    linesCount := linesCount + 1
].

'' displayNl.
'' displayNl.

"Parse the sentence into words (case-sensitive)"
words := fileContents contents tokenize: '[^A-Za-z]+'.

wordsCollection := OrderedCollection new.
words do: [:word |
    (word size > 0) ifTrue: [
        (wordsCollection includes: word) ifFalse: [ wordsCollection add: word. ].
    ].
].

"Part one - Words in dictionary"
'Words in dictionary – ' display.
1 to: wordsCollection size do: [:x |
    (wordsCollection at: x) display.
    (x ~= (wordsCollection size)) ifTrue: [', ' display. ].
].
'' displayNl.
'' displayNl.

"Count only alphabetic letters"
letterCount := 0.
fileContents contents do: [:ch |
    (ch isLetter) ifTrue: [ letterCount := letterCount + 1. ].
].



('Number of Letters    : ', (letterCount) asString) displayNl.
('Number of Words      : ', (words size - 1) asString) displayNl.
('Number of Lines      : ', (linesCount) asString) displayNl.
'' displayNl.
'' displayNl.

'/--------------\' displayNl.
'|  Letter Freq |' displayNl.
'\--------------/' displayNl.
'' displayNl.

allChars := fileContents contents select:[:c | c isLetter].
charBag := allChars asLowercase asBag.

97 to: 122 do:[:asciiValue | 
    char := Character value: asciiValue.
    (char asString , '        | ') display.
    
    (charBag occurrencesOf: char) <= 10 ifTrue: [
        1 to: (charBag occurrencesOf: char) do: [:i |
            ('*') display.
        ].
    ] ifFalse: [
        ('********** ', '(', (charBag occurrencesOf: char) asString, ')') display.
    ].
    '' displayNl
].

'' displayNl.
'' displayNl.

'/--------------\' displayNl.
'|  Dictionary  |' displayNl.
'\--------------/' displayNl.
'' displayNl.
'' displayNl.
'Word             Frequency' displayNl.
'--------------------------' displayNl.

wordBag := words asBag.
wordBag remove: ''.
wordBag asSet do:[:word |
    (((word, '                         ') copyFrom: 1 to: 25), (wordBag occurrencesOf: word) asString) displayNl.
].
'' displayNl.
'' displayNl.


'/--------------\' displayNl.
'|   Histogram  |' displayNl.
'\--------------/' displayNl.
'' displayNl.
'' displayNl.

wordArray := wordBag asSet asArray.
mostStars :=  (wordBag sortedByCount first) key.
i := mostStars.

longestWord := 0.
wordArray do: [:word |
    ((word size) > longestWord) ifTrue:[
        longestWord := word size.
    ].
].

offset := (longestWord + 8).
amountOfWords := wordArray size.
1 to: i do: [ :m |
    (String new: offset withAll: $ ) display.
    1 to: (wordArray size) do: [:x |
        ((wordBag occurrencesOf: (wordArray at: x)) = mostStars) ifTrue: [
            wordBag remove: (wordArray at: x).
            ' *' display.
        ] ifFalse: [
            '  ' display.
        ].
    ].
    mostStars :=  mostStars - 1.
    mostStars > 0 ifTrue: [
        '' displayNl
    ] ifFalse: [
        '' displayNl.
        (offset + (wordArray size * 2)) timesRepeat: ['-' display].
        '' displayNl.
    ].
]
(String new: offset withAll: $ ) display.
((wordArray size )) timesRepeat: [' ^' display].
'' displayNl.

width := (offset + (wordArray size * 2)).
amountOfSpace := 0.

1 to: (wordArray size) do: [ :x |
    ((wordArray at: x)) display.
    amountOfSpace := (longestWord - ((wordArray at: x) size)).
    amountOfSpace timesRepeat: [' ' display].
    (offset - longestWord + (x * 2) - 1) timesRepeat: ['-' display].
    '/' display.
    ((wordArray size) - x) timesRepeat: [' |' display].
    ''displayNl.
].