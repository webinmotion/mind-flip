---
sidebar_position: 4
---

# Refactor with State Pattern

Examining the most recent solution of the **Rover** class reveals a trend. The **left** and **right** methods both deal
with turning the direction around, while the **move** method changes the position's coordinates. In other words, all 
the core methods of the **Rover** class are manipulating its **state**. This lends the class easily for refactoring to 
use the **State Design Pattern**.

## Encapsulating the state

It's pretty obvious that the state of the rover is defined by its **x** and **y** coordinate, and its **cardinal 
direction**. This can be moved into a **State** object, and then **MOST** importantly, the **Rover** class will require
a *setter* method to update the **Rover's** state.

```java title="introducing a State object"
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public abstract class State {

    int x;
    int y;
    String dir;

    public State(int x, int y, String dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
    }

    public abstract void move(int mx, int my);

    public abstract State left();

    public abstract State right();

    @Override
    public String toString() {
        return String.format("%d %d %s", this.x, this.y, this.dir);
    }
}
```

The nature of the **State** class requires a little more explanation. The **State** class is _abstract_ because the
specific implementations of the **move**, **left** and **right** methods are specific to the concrete implementation 
of any abstract **State** class. 

The **State** object is also able to **print** itself which is a reflection of the **Rover's** position when its
current state is interrogated. The **Rover** would now also need a slight update.

```java title="Rover using State attribute"
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Rover {

    int mx;
    int my;
    State state;

    public Rover(String plateau, String initial) {
        String[] size = plateau.split(" ");
        this.mx = Integer.parseInt(size[0]);
        this.my = Integer.parseInt(size[1]);
        
        String[] split = initial.split(" ");
        var x = Integer.parseInt(split[0]);
        var y = Integer.parseInt(split[1]);
        var dir = split[2];
        
        this.state = Rover.newState(x, y, dir);
    }
    
    ...<REST OF THE CLASS>
}
```

## Rover factory method

The _state_ of the **Rover** is created by a factory method *(Rover.newState(x, y, dir))*, based on the coordinates 
and cardinal direction provided. This is a static method in the **Rover** class.

```java title="State factory method"
public static State newState(int x, int y, String dir) {
    switch (dir) {
        case "N":
            return new NorthState(x, y);
        case "E":
            return new EastState(x, y);
        case "S":
            return new SouthState(x, y);
        case "W":
            return new WestState(x, y);
        default:
            return null;
    }
}
```

Immediately, one can quickly see that there are 4 different states that exist, each of which behaves slightly 
differently when given the same instruction. This is the key essence of the **State** design pattern - the specific 
implementation details of any concrete State entity can now evolve separately from the Rover entity whose state 
it describes.

Each of the concrete **State** classes are illustrated below.

```java title="NorthState"
public class NorthState extends State {

    public NorthState(int x, int y) {
        super(x, y, "N");
    }

    @Override
    public void move(int mx, int my) {
        if (this.y + 1 <= my)
            this.y += 1;
    }

    @Override
    public State left() {
        return new WestState(x, y);
    }

    @Override
    public State right() {
        return new EastState(x, y);
    }
}
```

The implementation of the **NorthState** class can be interpreted as described below

>The **NorthState** takes *x* and *y* coordinates in the constructor, and the cardinal direction is assigned by default.
> 
> The **move** operation when facing *North* only affects the *y* coordinate, so the **move** method only tests the
> upper limit of the **plateau** bounds along the **y-axis** before it can determine whether the **y** position should 
> be incremented by 1 or not.
> 
> The **right** operation when facing *North* will yield a new state - the **East** state which will have the same
> *x* and *y* coordinates as the *North* state.
> 
> The **left** operation when facing *North* will yield a new state - the **West** state which will have the same 
> *x* and *y* coordinates as the *North* state.

The other concrete *State* classes are illustrated below as well.

```java title="EastState"
public class EastState extends State {

    public EastState(int x, int y) {
        super(x, y, "E");
    }

    @Override
    public void move(int mx, int my) {
        if (this.x + 1 <= mx)
            this.x += 1;
    }

    @Override
    public State left() {
        return new NorthState(x, y);
    }

    @Override
    public State right() {
        return new SouthState(x, y);
    }
}
```

```java title="WestState"
public class WestState extends State {

    public WestState(int x, int y) {
        super(x, y, "W");
    }

    @Override
    public void move(int mx, int my) {
        if (this.x - 1 >= 0)
            this.x -= 1;
    }

    @Override
    public State left() {
        return new SouthState(x, y);
    }

    @Override
    public State right() {
        return new NorthState(x, y);
    }
}
```

```java title="SouthState"
public class SouthState extends State {

    public SouthState(int x, int y) {
        super(x, y, "S");
    }

    @Override
    public void move(int mx, int my) {
        if (this.y - 1 >= 0)
            this.y -= 1;
    }

    @Override
    public State left() {
        return new EastState(x, y);
    }

    @Override
    public State right() {
        return new WestState(x, y);
    }
}
```

The **navigate** method of the **Rover** class will remain unchanged.

```java
public void navigate(String commands) {
    for (String input : commands.split("")) {
        switch (input) {
            case "M":
                this.move();
                break;
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
}
```

However, the **position**, **move**, **left** and **right** methods in the **Rover** class will need to be updated to 
make use of the underlying **State** object methods.

```java
@Data
@NoArgsConstructor
public class Rover {

    ...<PREVIOUS CODE UNCHANGED>
    
    public String position() {
        return this.state.toString();
    }

    public void move() {
        this.state.move(this.mx, this.my);
    }

    public void left() {
        this.state = this.state.left();
    }

    public void right() {
        this.state = this.state.right();
    }
    
    ...<REST OF THE CLASS>
}
```

The entirety of the **Rover** class should look as shouwn below

```java
@Data
@NoArgsConstructor
public class Rover {

    int mx;
    int my;
    State state;

    public Rover(String terrain, String initial) {
        String[] size = terrain.split(" ");
        this.mx = Integer.parseInt(size[0]);
        this.my = Integer.parseInt(size[1]);
        String[] split = initial.split(" ");
        var x = Integer.parseInt(split[0]);
        var y = Integer.parseInt(split[1]);
        var dir = split[2];
        this.state = Rover.newState(x, y, dir);
    }

    public static State newState(int x, int y, String dir) {
        switch (dir) {
            case "N":
                return new NorthState(x, y);
            case "E":
                return new EastState(x, y);
            case "S":
                return new SouthState(x, y);
            case "W":
                return new WestState(x, y);
            default:
                return null;
        }
    }

    public String position() {
        return this.state.toString();
    }

    public void move() {
        this.state.move(this.mx, this.my);
    }

    public void left() {
        this.state = this.state.left();
    }

    public void right() {
        this.state = this.state.right();
    }

    public void navigate(String commands) {
        for (String input : commands.split("")) {
            switch (input) {
                case "M":
                    this.move();
                    break;
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
    }
}
```

## Test class updates

The *Test* class remains unchanged, which implicitly validates that the changes that were made to the **Rover** and
associated **State** classes did not beak any existing code.

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
void testNavigationInputs(String position, String navigate, String destination) {
    Rover rover = new Rover("5 5", position);
    rover.navigate(navigate);
    assertThat(rover.position()).isEqualTo(destination);
}
```

Can this same way of reasoning be extrapolated to make use of a different *design pattern* like the **Strategy** or 
**Visitor** pattern? These are all **Behavioral design patterns**. This would be a good exercise for contemplation.