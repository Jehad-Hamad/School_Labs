buildVec := [:start :end | | oc |
    oc := OrderedCollection new.
    start to: end do: [:i |
        oc add: i.
    ].
    oc.
].

displayOc := [:oc |
    '[' display.
    1 to: oc size do: [:i |
        (i > 1) ifTrue: [',' display].
        (oc at: i) asString display.
    ].
    ']' display.
].

chunkIt := [:n :oc |
    (n < 1 or: [oc isEmpty])
        ifTrue: [OrderedCollection new]
        ifFalse: [| chunk dropped result actualN |
            actualN := n min: oc size.
            chunk := oc copyFrom: 1 to: actualN.
            dropped := oc copyFrom: actualN + 1 to: oc size.
            result := OrderedCollection new.
            result add: chunk.
            dropped isEmpty
                ifFalse: [result addAll: (chunkIt value: n value: dropped)].
            result.
        ].
].



('How much do you want to chunk by? ') display.
chunk := stdin nextLine asInteger.

'' displayNl.

('Enter range') displayNl.
('Start: ') display.
start := stdin nextLine asInteger.
('End: ') display.
end := stdin nextLine asInteger.

oc := buildVec value: start value: end.

result := chunkIt value: chunk value: oc.

'[' display.
1 to: result size do: [:i |
    (i > 1) ifTrue: [',' display].
    displayOc value: (result at: i).
    ].
']' display.
