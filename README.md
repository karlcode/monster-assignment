# Assignment

## Setup

Requires Typescript installed

`tsc solution.ts` to transpile to JS

## Assumptions

-   Inputs are in list format - could otherwise be a stream of data etc
-   Assumed all size values are non-negative integers
-   Tuples are allowed to be duplicated - each hole or ball is unique so returning two identical tuples is fine
-   Inputs are validated and each input is of the correct type containing all required properties e.g .size is present

## Solution

Observe that the max number of fits we can match are equal to the number of largest balls mapped to largest holes possible.

We sort both collections in order of largest size to smallest

We set pointers on each sorted array and advance position. Append the elements which fit the criteria. Otherwise, the ball is too large and we advance only the pointer on the ball array.

If there are more balls than holes or vice versa, we append the remainder to the unassigned at the end.

Since we are only traversing each array in one pass, the time complexity of this function will take `O(N+M)` i.e Holes + Balls

Sorting in reverse order in JS (dependent on runtime) should take `O(NlogN)` time for each array

Required `O(N+M)` additional memory for result arrays

## Improvements

Could have used a hashmap to map the balls assigned to holes, especially if we need to fit multiple balls into a single hole.

Could use a Set in the event we require uniqueness of tuples.

Could reduce memory usage with reusing the input arrays

Could prevent the need to sort through smarter methods - could exploit properties of input and use a specialised sort to bring it to linear sort time

TS is structurally typed so it would not issue error if we pass in a ball as a hole (since the member properties in this example are identical).
