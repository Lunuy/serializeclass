const { fromData, toData, Import, Export } = require("../dist/index");


class ConsoleLog {
    constructor(args = []) {
        this.args = args;
    }
    compile() {
        return `console.log(${this.args.map(arg => arg.compile()).join(", ")})`;
    }

    static [Import](data, fromData) {
        return new ConsoleLog(data.map(fromData));
    }
    static [Export](consoleLog, toData) {
        return consoleLog.args.map(toData);
    }
}

class Sin {
    constructor(input) {
        this.input = input;
    }
    compile() {
        return `Math.sin(${this.input.compile()})`;
    }

    static [Import](data, fromData) {
        return new Sin(fromData(data));
    }
    static [Export](sin, toData) {
        return toData(sin.input);
    }
}

class Number {
    constructor(value) {
        this.value = value;
    }
    compile() {
        return `${this.value}`;
    }

    static [Import](data) {
        return new Number(data);
    }
    static [Export](number) {
        return number.value;
    }
}

const classes = {
    ConsoleLog,
    Sin,
    Number
}

const classLoader = (classId) => classes[classId];

const data = [
    "ConsoleLog",
    [
        [
            "Sin",
            [
                "Number",
                5
            ]
        ],
        [
            "Number",
            10
        ]
    ]
];

const consoleLog = fromData(data, classLoader);
console.log(consoleLog.compile());
consoleLog.args[0].input.value = 7;
console.log(consoleLog.compile());
console.log(JSON.stringify(toData(consoleLog, classLoader), null, 2));