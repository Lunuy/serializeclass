const { fromData, toData, Import, Export, controllerFromData } = require("../dist/index");


class ConsoleLog {
    constructor(args = []) {
        this.args = args;
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

    static [Import](data) {
        return new Number(data);
    }
    static [Export](number) {
        return number.value;
    }
}

class ConsoleLogCompiler {
    constructor(args = [], hasSpace = false) {
        this.args = args;
        this.hasSpace = hasSpace;
    }
    compile() {
        return `console.log(${this.args.map(arg => arg.compile()).join(`,${this.hasSpace ? " " : ""}`)})`;
    }

    static [Import](consoleLog, data = {args : []}, fromData) {
        return new ConsoleLogCompiler(data.args.map((compilerData, index) => fromData(consoleLog.args[index], compilerData)), data.hasSpace);
    }
    static [Export](consoleLogCompiler, toData) {
        return {
            args : consoleLogCompiler.args.map(toData),
            hasSpace : consoleLogCompiler.hasSpace
        };
    }
}
class SinCompiler {
    constructor(input) {
        this.input = input;
    }
    compile() {
        return `Math.sin(${this.input.compile()})`;
    }

    static [Import](sin, data, fromData) {
        return new SinCompiler(fromData(sin.input, data));
    }
    static [Export](sinCompiler, toData) {
        return toData(sinCompiler.input);
    }
}
class NumberCompiler {
    constructor(number) {
        this.number = number;
    }
    compile() {
        return this.number.value;
    }

    static [Import](number, data, fromData) {
        return new NumberCompiler(number);
    }
    static [Export](numberCompiler, toData) {
        return null;
    }
}

const codeClasses = {
    ConsoleLog,
    Sin,
    Number
};

const compilerClasses = {
    ConsoleLog: ConsoleLogCompiler,
    Sin: SinCompiler,
    Number: NumberCompiler  
};

const codeClassLoader = (classId) => codeClasses[classId];
const compilerClassLoader = (classId) => compilerClasses[classId];

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
const compilerData = [
    "ConsoleLog",
    {
        args: [
            [
                "Sin",
                [
                    "Number",
                    null
                ]
            ],
            [
                "Number",
                null
            ]
        ]
    }
];

const consoleLog = fromData(data, codeClassLoader);
const consoleLogCompiler = controllerFromData(consoleLog, "compiler", compilerData, compilerClassLoader);
console.log(consoleLogCompiler.compile());
consoleLog.args[0].input.value = 7;
console.log(consoleLogCompiler.compile());
consoleLogCompiler.hasSpace = true;
console.log(consoleLogCompiler.compile());
console.log(JSON.stringify(toData(consoleLog, codeClassLoader)));
console.log(JSON.stringify(toData(consoleLogCompiler, compilerClassLoader)));