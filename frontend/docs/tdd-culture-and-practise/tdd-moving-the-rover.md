---
sidebar_position: 3
---

# Moving the Rover forward

The previous section examined how the **turn L** and **turn R** instructions affected the position of the **Rover**. 
This section continues by examining how the **move** instruction affects the position of the **Rover**. Continuing on, 
add test scenarios for examining the **move** command

```java
@ParameterizedTest
@CsvSource({
        ...,
        "1 1 E, M, 2 1 E",
        "1 1 N, M, 1 2 N",
        "1 1 W, M, 0 1 W",
        "1 1 S, M, 1 0 S",
})
```

This is how one should interpret the tests above

> given the test input is **"1 1 E, M, 2 1 E"**,
>
> when the rover is at position **1 1 E**,
>
> and it receives an instruction to **Move forward**,
>
> the final position should be **2 1 E**

In the case or moving, only the **x** and **y** coordinates are affected, and the **cardinal dir** is unaffected. 

Running the text will now fail because there is no case statement handing **M** in the **navigate** function, and 
therefore this needs to be added.

```java title="Handling the move case"
public void navigate(String command) {
    switch(command){
        case "L":
            this.left();
            break;
        case "R":
            this.right();
        case "M":
            this.move();
            break;
        default:
            break;
    }
}
```

The test now complains that a **move** function is missing in the Rover, so one should be added for the test 
to compile successfully

```java title="The move method"
public void move() {
    switch(this.dir){
        case "N":
            this.y += 1;
            break;
        case "E":
            this.x += 1;
            break;
        case "S":
            this.y -= 1;
            break;
        case "W":
            this.x -= 1;
            break;
        default:
            break;
    }
}
```

## Handling series of commands

At this point, the Rover class is able to handle **move** and **turn** commands, so it's time to up the ante and test
handling a series of commands

```java title="handling series of commands"
@ParameterizedTest
@CsvSource({
        ...
        "1 2 N, LMLMLMLMM, 1 3 N",
        "1 3 N, ---------, 1 3 N",
        "3 3 E, MMRMMRMRRM, 5 1 E",
})
```

Executing the test at this juncture should fail. The reason is subtle but very obvious. So far, the **navigate** 
function has been handling individual instructions. It now needs to handle a series of instructions, so it will 
need a slight modification.

```java
public void navigate(String commands) {
    for (String command : commands.split("")) {
        switch (command) {
            case "L":
                this.left();
                break;
            case "R":
                this.right();
                break;
            case "M":
                this.move();
                break;
            default:
                break;
        }
    }
}
```

Following this fix, executing the test now should pass.

## Handling upper bounds of the plateau

So far, all the testing has not taken into consideration the upper and lower bounds of the plateau, which needs to be 
incorporated into the test. It should be relatively easy to do so. The problem statement identifies that the lower 
bounds of the plateau should be assumed to be **(0, 0)**. Handling this requirement will require adding the 
upper bounds **(mx, my)** of the plateau to the rover.

```java
@Data
@NoArgsConstructor
public class Rover {

    // plateau upper bounds
    int mx;
    int my;
    
    // rover position
    int x;
    int y;
    String dir;

    public Rover(String plateau, String position) {
        String[] size = plateau.split(" ");
        this.mx = Integer.parseInt(size[0]);
        this.my = Integer.parseInt(size[1]);
        
        String[] split = position.split(" ");
        this.x = Integer.parseInt(split[0]);
        this.y = Integer.parseInt(split[1]);
        this.dir = split[2];
    }
    
    ...<REST OF THE CLASS>
}
```

Changing the signature of the Rover constructor will cause compilation errors in the test class. This can be resolved 
by passing into the constructor the **plateau** upper bounds.

```java
public class RoverTest {

    @Test
    void when_initialized_the_rover_has_a_valid_position() {
        String plateau = "5 5";
        String position = "1 2 N";
        Rover rover = new Rover(plateau, position);
        assertThat(rover.position()).isEqualTo(position);
    }
    
    ...<REST OF THE TEST CLASS>
}
```

In the parametrized test, new test parameters should be added to assert the behavior of the **Rover** when it is 
instructed to move while resting at any edge of the plateau

```java
@ParameterizedTest
@CsvSource({
    ...
    "5 5 E, M, 5 5 E",
    "5 5 N, M, 5 5 N",
    "0 0 W, M, 0 0 W",
    "0 0 S, M, 0 0 S",
})
```

Executing the test at this juncture will fail because the **move** behavior has not been adjusted to take the plateau 
limits into account. A plausible implementation can be as illustrated below.

```java
public void move() {
    switch(this.dir){
        case "N":
            if(this.y + 1 <= this.my) {
                this.y += 1;
            }
            break;
        case "E":
            if(this.x + 1 <= this.mx) {
                this.x += 1;
            }
            break;
        case "S":
            if(this.y - 1 >= 0) {
                this.y -= 1;
            }
            break;
        case "W":
            if(this.x - 1 >= 0) {
                this.x -= 1;
            }
            break;
        default:
            break;
    }
}
```

The entirety of the test class fo the first iteration is as shown below. 

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class RoverTest {

    @Test
    void when_initialized_the_rover_has_a_valid_position() {
        String plateau = "5 5";
        String position = "1 2 N";
        Rover rover = new Rover(plateau, position);
        assertThat(rover.position()).isEqualTo(position);
    }

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
            "1 1 E, M, 2 1 E",
            "1 1 N, M, 1 2 N",
            "1 1 W, M, 0 1 W",
            "1 1 S, M, 1 0 S",
            "1 2 N, LMLMLMLMM, 1 3 N",
            "1 3 N, ---------, 1 3 N",
            "3 3 E, MMRMMRMRRM, 5 1 E",
            "5 5 E, M, 5 5 E",
            "5 5 N, M, 5 5 N",
            "0 0 W, M, 0 0 W",
            "0 0 S, M, 0 0 S",
    })
    void assert_position_when_rover_accepts_instructions_to_move_or_turn(String position, String navigate, String destination) {
        String plateau = "5 5";
        Rover rover = new Rover(plateau, position);
        rover.navigate(navigate);
        assertThat(rover.position()).isEqualTo(destination);
    }
}
```

## Refactoring the implementation

This first iteration has been very imperative, meaning that there has been no consideration of using contemporary 
design patterns to make the design choices more explicit and to also make the implementation details easier to consume. 

This is arguably so because there hasn't been time spent to examine the solution and identifying opportunities for 
applying design patterns. Doing so would make this solution more easily recognizable to any experienced eye, and would 
make it very much easier to maintain or modify in the future. Design patterns are very important and core tools for 
effective design and communication of implementation details.

Before diving into refactoring using design pattern, the current solution can be made a bit more terse by using more 
recent updates to the java programming language, and specifically the **switch** statements, to capture their semantics
more elegantly.

Below is the entirety of the **Rover** class with the **switch** cases adopting the newer syntax.

```java
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Rover {

    int mx;
    int my;
    int x;
    int y;
    String dir;

    public Rover(String plateau, String position) {
        String[] size = plateau.split(" ");
        this.mx = Integer.parseInt(size[0]);
        this.my = Integer.parseInt(size[1]);

        String[] split = position.split(" ");
        this.x = Integer.parseInt(split[0]);
        this.y = Integer.parseInt(split[1]);
        this.dir = split[2];
    }

    public String position() {
        return String.format("%d %d %s", this.x, this.y, this.dir);
    }

    public void navigate(String commands) {
        for (String command : commands.split("")) {
            switch (command) {
                case "L" -> this.left();
                case "R" -> this.right();
                case "M" -> this.move();
                default -> {
                }
            }
        }
    }

    public void move() {
        switch (this.dir) {
            case "N" -> {
                if (this.y + 1 <= this.my) {
                    this.y += 1;
                }
            }
            case "E" -> {
                if (this.x + 1 <= this.mx) {
                    this.x += 1;
                }
            }
            case "S" -> {
                if (this.y - 1 >= 0) {
                    this.y -= 1;
                }
            }
            case "W" -> {
                if (this.x - 1 >= 0) {
                    this.x -= 1;
                }
            }
            default -> {
            }
        }
    }

    public void right() {
        switch (this.dir) {
            case "N" -> this.dir = "E";
            case "E" -> this.dir = "S";
            case "S" -> this.dir = "W";
            case "W" -> this.dir = "N";
            default -> {
            }
        }
    }

    public void left() {
        switch (this.dir) {
            case "N" -> this.dir = "W";
            case "W" -> this.dir = "S";
            case "S" -> this.dir = "E";
            case "E" -> this.dir = "N";
            default -> {
            }
        }
    }
}
```