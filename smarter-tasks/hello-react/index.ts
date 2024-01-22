interface User {
    name: string;
    id: number;
    greet(): string;
  }
  
//   const user: User = {
//     name: 'Alice',
//     id: 1,
//     greet() {
//       return `Hello, my name is ${this.name}`;
//     },
//   };

//   function printHello(): void {
//     console.log("Hello!");
    
//   }

//   function throwError(): never {
//     throw new Error("An error occurred!");
//   }

//   function addUser(user: User): string {
//     return user.name + " added successfully";
// }

// interface GetGreetingFn {
//     (user: User): string;
//   }
//   const getGreeting: GetGreetingFn = (user: User) => {
//     return user.greet();
//   };
  
  console.log(getGreeting(user)); 
  interface Employee extends User {
    salary: number;
  }
  class Manager implements Employee {
    name: string;
    id: number;
    salary: number;
  
    constructor(name: string, id: number, salary: number) {
      this.name = name;
      this.id = id;
      this.salary = salary;
    }
  
    greet() {
      return `Hi, my name is ${this.name} and I am the manager.`;
    }
  }
  
  const manager = new Manager('Bob', 4, 50000);
  console.log(getGreeting(manager)); // "Hi, my name is Bob and I am the manager."