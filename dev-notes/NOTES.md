# Design and implementation notes

## Type of games (refer to tbl_playbook for more details - this is still very fluid)

### manual progression vs auto progression

Manual implies that the player is moving at their own pace, and clicking 'Next' to proceed. There is no 'Back' option

Auto implies that the player is not in control of the game progression. The questions are updated based on a timer.

- When the game is being played by an individual (without others participating in the **_same_** game), then "manual" progression is applicable. 

- When the **_same_** game is being played by multiple participants, then "auto" progression is applicable. In this case, "manual" cannot even be considered.

### free_form_forward_only

The response should match the correct answer as closely as possible, as defined by the response criteria.

- question does not have multiple choices. 
- question has no timer. 
- player can only more forward with no option to skip and go back. 
- response to the question is free-form and requires typing, like with a quiz or exam

![Free Form Forward](./free-form-forward-only.png)

### free_form_free_flow

The response should match the correct answer as closely as possible, as defined by the response criteria.

- question does not have multiple choices. 
- question has no timer. 
- player can only more forward and backwards freely
- response to the question is free-form and requires typing, like with a quiz or exam

![Free Form Free Flow](./free-form-free-flow.png)

### clue_swipe_out

Wrong choices are **_swiped_** out

- Each choice is **_swiped_** out as time winds down.
- Points decrease as the available time remaining decreases. 
- No points are available when the clock runs out.

![Swipe Out](./clue_swipe_out.png)

Example

- Points start at 1000.
- Delay countdown for 5 seconds (allow player to read question and consider choices)
- start countdown
- for every two seconds, remove a wrong choice from the list of choices. 
- Shave off 100 points per second
- when clock reaches zero, reveal the correct answer and a reason why

### elimination_clues

Clues for the incorrect choices are **_swopped_** in

- Each clue is associated with exactly one choice. 
- Each clue informs whether the choice is correct or incorrect. 
- Each clue is revealed one at a time with delays in between. 
- Points decrease as the available time remaining decreases. 
- No points are available when the clock runs out.

![Elimination](./elimination_by_clues.png)

Example

- Points start at 1000.
- Delay countdown for 5 seconds (allow player to read question and consider choices)
- start countdown
- for every two seconds, reveal a clue for an incorrect choice. 
- Shave off 100 points per second
- when clock reaches zero, reveal confirmation of correct answer

### closest_but_not_over

The anwser to thie question must to be a numeric value

- Answers that match the exact numeric value get maximum points. 
- Points decrease with increasing distacne from the correct value. 
- Any answer above correct value gets no points. 
- Any answer below 1 percent of the correct value gets no points either.

![Choice Matcher](./numeric_answer_only.png)

The UI is very similar to that of free_form except that the response submited can ONLY be a numeric value.

### choice matcher

Each matcher is associated with exactly one choice only.

![Choice Matcher](./choice_matcher.png)

