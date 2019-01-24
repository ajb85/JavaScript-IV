// CODE here for your Lambda Classes

class Person {
  constructor(attrs) {
    this.name = attrs.name;
    this.age = attrs.age;
    this.location = attrs.location;
    this.gender = attrs.gender;
  }

  speak() {
    console.log(`Hello my name is ${this.name}, I am from ${this.location}`);
  }
}

// Instructors will receive all of Persons props and
// methods
class Instructor extends Person {
  constructor(attrs) {
    super(attrs);

    this.specialty = attrs.specialty;
    this.favLanguage = attrs.favLanguage;
    this.catchPhrase = attrs.catchPhrase;
  }

  demo(subject) {
    console.log(`Today we are learning about ${subject}`);
  }

  grade(student, subject) {
    console.log(`${student.name} receives a perfect score on ${subject}`);
  }

  updateGrade(student) {
    const grade = student.grade;
    // Do not let grade exceed 100
    const addAtMost = 100 - student.grade;
    // Do not let grade fall below 0
    const subtractAtMost = student.grade - 1;
    const roll = Math.round(Math.random() * 10); // 0 - 10
    // I just don't like/trust decimals in JS
    student.grade =
      roll >= 5
        ? grade + changeGrade(addAtMost)
        : grade - changeGrade(subtractAtMost);

    function changeGrade(changeMax) {
      // Something must be added/subtracted so minimum value is 1
      // Math.random()*(max-min)+min = random num between max and min
      return Math.round(Math.random() * (changeMax - 1) + 1);
    }
  }
}

// PM will receive Instructors (and thus Persons) props
// and methods
class ProjectManager extends Instructor {
  constructor(attrs) {
    super(attrs);

    this.gradClassName = attrs.gradClassName;
    this.favInstructor = attrs.favInstructor;
  }

  standUp(channel) {
    console.log(`${this.name} announces to ${channel}, @channel standy times!`);
  }

  debugsCode(student, subject) {
    console.log(`${this.name} debugs ${student.name}'s code on ${subject}'`);
  }
}

// Students will receive props and methods from Person
class Student extends Person {
  constructor(attrs) {
    super(attrs);

    this.previousBackground = attrs.previousBackground;
    this.className = attrs.className;
    this.favSubjects = attrs.favSubjects;
    // Math.random()*(max-min)+min = random num between max and min
    this.grade = Math.round(Math.random() * 99 + 1);
  }

  listsSubjects() {
    this.favSubjects.forEach(subject => console.log(subject));
  }

  PRAssignment(subject) {
    console.log(`${this.name} has submitted a PR for ${subject}`);
  }

  sprintChallenge(subject) {
    console.log(`${this.name} has begun sprint challenge on ${subject}`);
  }

  graduate(instructor) {
    // If the student has a passing grade, the loop ends and he has graduated!
    if (this.grade > 70) {
      console.log(`${this.name} has graduated from Lambda School!`);
      // Or he will fail, go into async, the instructor will update the grade
      // and student try to gradulate again
    } else {
      console.log(`${this.name} has failed.  Going async!`);
      instructor.updateGrade(this);
      this.graduate(instructor);
    }
  }
}

const instructorAttrs = {
  name: "Joe Snell",
  age: 30,
  location: "New York, NY",
  gender: "M",
  specialty: "FSW",
  favLanguage: "JavaScript",
  catchPhrase: "It's all good in the hood"
};
const joe = new Instructor(instructorAttrs);

const pmAttrs = {
  name: "Amber Grange",
  age: 40,
  location: "San Diego, CA",
  gender: "F",
  gradClassName: "CS1",
  favInstructor: joe
};
const amber = new ProjectManager(pmAttrs);

const studentAttrs = {
  name: "Stephen Tall",
  age: 24,
  location: "Seattle, WA",
  gender: "M",
  previousBackground: "Ran a non-profit",
  className: "web17",
  favSubjects: ["HTML", "CSS", "JavaScript", "React"]
};
const stephen = new Student(studentAttrs);

joe.speak();
joe.demo("JavaScript I");
joe.grade(stephen, "JavaScript I");
amber.speak();
amber.standUp("web17-amber");
amber.debugsCode(stephen, "JavScript II");
stephen.speak();
stephen.listsSubjects();
stephen.PRAssignment("JavaScript III");
stephen.sprintChallenge("Fundamentals of JavaScript");
stephen.graduate(amber);
