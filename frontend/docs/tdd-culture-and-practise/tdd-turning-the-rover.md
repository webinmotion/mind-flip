---
sidebar_position: 2
---

# Turning to Rover around

Identifying domain objects and their interactions in any software system helps with understanding how to attack the 
software problem. Reading through the problem statement, one can immediately identify the following entities:

- rover
- plateau - rectangular terrain

With regards to attributes and behavior, one can quickly identify the following:

- plateau has min and max coordinates
- rover can move forward (within the plateau)
- rover can turn right or left
- rover has a position (x, y, dir)

There is no behavior prescribed for what happens when a rover reaches the edges of the plateau, so it's only fair to
make the assumption that the rover will not respond to any instruction which would move it beyond any edge. 

Given the information gathered so far, one can dive right into writing some tests.

## Red-Green-Refactor cycle 

Test-driven development (TDD) is an approach to software development where you write tests first, then use those tests 
to drive the design and development of your software application. The typical pattern is to repeat a short cycle of the 
following phases:

- Write a test (“red”).
- Get the test to pass (“green”).
- Optimize the design (“refactor”).

![red-green-refactor](/img/red-green-refactor.png)

When one uses the red, green, refactor TDD to approach large software implementation problems, it results implicitly 
into saved time, and the implementation details are more robust and well thought through.

## Initialized rover has a position

The first test that comes to mind would be to _assert_ that a **Rover** has a position when it is initialized

```java
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class RoverTest {

    @Test
    void when_initialized_the_rover_has_a_valid_position() {
        Rover rover = new Rover("1 2 N");
        assertThat(rover.position()).isEqualTo("1 2 N");
    }
}
```

Of course the test will complain that there doesn't exist a **Rover** class, so create one to fix that problem

```java title="Rover class"
import lombok.Data;

@Data
public class Rover {

    int mx;
    int my;
    String dir;
}
```

The Rover in the test assumes there exists a string argument in the constructor, so there needs to be one

```java
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Rover {

    int x;
    int y;
    String dir;

    public Rover(String position) {
        String[] split = position.split(" ");
        this.x = Integer.parseInt(split[0]);
        this.y = Integer.parseInt(split[1]);
        this.dir = split[2];
    }
}
```

At this point, the Rover is missing a **position** function, so this needs to be added as well, for the test to 
successfully compile

```java
public String position() {
    return String.format("%d %d %s", this.x, this.y, this.dir);
}
```
## Testing how direction is affected by turning right or left

From the information gathered so far, the rover can turn right or left for only 90 degrees at a time. This makes it a
good candidate for taking advantage of parameterized testing, and junit makes this quite a breeze. 

A parameterized test allows one at use the same test setup for several different tests, and more importantly, it allows 
one to pass different **test parameters** (hence the _parameterized_ name) during the execution of each test. This 
increases not only the readability of the test but also makes reasoning through the different test scenarios easier.

For a parameterized test, one can pass in the test parameters using different approaches. In this case, the test 
parameters are defined as comma-separated values (CSV). For each line of the input values, the CSV input is split at the
commas, and each value in the resulting array is passed into the test through the corresponding positional test 
arguments.

```java title="setting up parameterized test"
@ParameterizedTest
@CsvSource({
            "0 0 E, L, 0 0 N",})
void assert_position_when_rover_accepts_instructions_to_move_or_turn(String position, String navigate, String destination) {
    Rover rover = new Rover(position);
    rover.navigate(navigate);
    assertThat(rover.position()).isEqualTo(destination);
}
```

This is how one should interpret the test above

> given the test input is **"0 0 E, L, 0 0 N"**, 
> 
> when the rover is at position **0 0 E**, 
> 
> and it receives an instruction to **turn Left**, 
> 
> the final position should be **0 0 N**

The test however complains that a **navigate** function is missing in the Rover, so one should be added for the test 
to compile successfully

```java
public void navigate(String command) {
    switch(command){
        case "L":
            this.left();
            break;
        default:
            break;
    }
}
```

Adding the **navigate** method will make the test happy but the Rover is now missing a **left** function. It's more 
convenient to encapsulate behavior in a switch statement in its own function instead of sticking all the logic
inside the switch statement. So a **left** function needs to be added to the Rover to handle the specific behavior
expected.

```java
public void left() {
    switch (this.dir){
        case "N":
            this.dir = "W";
            break;
        case "W":
            this.dir = "S";
            break;
        case "S":
            this.dir = "E";
            break;
        case "E":
            this.dir = "N";
            break;
        default:
            break;
    }
}
```

Executing the test at this juncture should now pass. In the **left** function, the other scenarios having a different 
start position were handled as well, and the following test parameters should pass as well.

```java
@ParameterizedTest
@CsvSource({
    "0 0 E, L, 0 0 N",
    "0 0 N, L, 0 0 W",
    "0 0 W, L, 0 0 S",
    "0 0 S, L, 0 0 E",
})
```

In the same manner, one can implement the behavior of a **turn Right** instruction with ease.

```java
public void navigate(String command) {
    switch(command){
        case "L":
            this.left();
            break;
        case "R":
            this.right();
            break;
        default:
            break;
    }
}
```

This requires implementing the logic for turning right in a "right" function

```java
public void right() {
    switch (this.dir){
        case "N":
            this.dir = "E";
            break;
        case "E":
            this.dir = "S";
            break;
        case "S":
            this.dir = "W";
            break;
        case "W":
            this.dir = "N";
            break;
        default:
            break;
    }
}
```

In doing so, the following test cases should also pass

```java
@ParameterizedTest
@CsvSource({
    "0 0 E, L, 0 0 N",
    "0 0 N, L, 0 0 W",
    "0 0 W, L, 0 0 S",
    "0 0 S, L, 0 0 E",
    "0 0 E, R, 0 0 S",
    "0 0 S, R, 0 0 W",
    "0 0 W, R, 0 0 N",
    "0 0 N, R, 0 0 E",
})
```

In the next section, the discussion will investigate **moving** the Rover forward.