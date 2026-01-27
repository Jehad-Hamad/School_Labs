
"Get the file and parse it"
'Please enter the name of your file: ' displayNl.
fileName := 'File.txt'.
'' displayNl.

"Open the file and save the sentence"
f := FileStream open: fileName mode: FileStream read.
fileContents := WriteStream on: (String new).
linesCount := 0.
f linesDo: [:x | x printOn: fileContents. linesCount := linesCount + 1].

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
    
    (charBag occurencesOf char) <= 10 ifTrue: [
        1 to: (charBag occurencesOf char) do
    ].
].