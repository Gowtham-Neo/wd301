var user = {
    name: 'Alice',
    id: 1,
    greet: function () {
        return "Hello, my name is ".concat(this.name);
    },
};
function printHello() {
    console.log("Hello!");
}
function throwError() {
    throw new Error("An error occurred!");
}
function addUser(user) {
    return user.name + " added successfully";
}
var getGreeting = function (user) {
    return user.greet();
};
console.log(getGreeting(user));
