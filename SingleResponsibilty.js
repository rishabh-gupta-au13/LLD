/*The single responsibility principle says that a class or module should have only a single purpose.
For example, if you have a wallet class, that class should only implement wallet functionality.
It’s fine to call other functionality, but it shouldn’t be written there.

Let’s look at a bad example. In the code below, the Car class has a single method; start.
 When this method is called the car may or may not start, depending on some logic which isn’t 
 included here as it’s not important. The class will then log some information depending on 
 the outcome.But notice how the logging functionality is implemented as a method of this class:
*/

class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    start() {
        if () { // Logic to determine whether or not the car should start
            this.errorLog(`The car ${this.make} ${this.model} started.`);
            return true;
        }
        this.errorLog(`The car ${this.make} ${this.model} failed to start.`);
        return false;
    }

    errorLog(message) {
        console.log(message);
    }
}

/*This violates the single responsibility principle, because the logic for logging the information should not be a responsibility of the Car class.

There are a number of readability and code management issues that are caused by this, but the easiest issue to describe is actually refactoring.

Let’s say your logger logs to a file, and this works great for several months. Suddenly, an update occurs on the underlying system that the car class is running on, and you need to change the way you write to files. Suddenly you now need to update every file writing instance of every class you’ve ever implemented a logger inside of. The task would be huge! But what if you’d followed the single responsibility principle?*/

class ErrorLog {
    static log(message) {
        console.log(message);
    }
}

class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    start() {
        if (...) { // Logic to determine whether or not the car should start
            ErrorLog.log(`The car ${this.make} ${this.model} started.`);
            return true;
        }
        ErrorLog.log(`The car ${this.make} ${this.model} failed to start.`);
        return false;
    }
}
/*As you can see here, we wouldn’t have this problem. The logger is stored in a separate class, which means its functionality is separate to the Car class. The Car class can be changed, moved around or even deleted without affecting the logger class. Likewise, if a change is required to the logger class, it only needs to be carried out in a single place.*/