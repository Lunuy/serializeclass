const { fromData, toData, Import, Export, dependentControllerFromData, dependentControllerToData } = require("../dist/index");
const { Primitive, String, Array, Boolean, Function, cF, fromC, C, O } = require("changy");
const Number_changy = require("changy").Number;

class ConsoleLog {
    constructor(args = []) {
        this.args = args;
    }

    static [Import](data, fromData) {
        return new ConsoleLog(new Array(data ? data.map(fromData) : []));
    }
    static [Export](consoleLog, toData) {
        return consoleLog.args[O].map(toData);
    }
}
class Sin {
    constructor(input) {
        this.input = input;
    }

    static [Import](data, fromData) {
        return new Sin(new Primitive(data ? fromData(data) : undefined));
    }
    static [Export](sin, toData) {
        return sin.input[O] ? toData(sin.input[O]) : undefined;
    }
}
class Number {
    constructor(value) {
        this.value = value;
    }

    static [Import](data) {
        return new Number(new Number_changy(data));
    }
    static [Export](number) {
        return number.value[O];
    }
}

class ConsoleLogCompiler {
    constructor(args, hasSpace) {
        this.args = args;
        this.hasSpace = hasSpace;
    }
    compile() {
        return cF((args, hasSpace) => `console.log(${args.join(`,${hasSpace ? " " : ""}`)})`, String)
                 (Array.FromChangeable(this.args.Map(new Function(arg => arg.compile()))), this.hasSpace);
    }

    static [Import](consoleLog, data = {args : []}, fromData) {
        return new ConsoleLogCompiler(consoleLog.args.Map(new Function(arg => fromData(arg, data.args[consoleLog.args[O].indexOf(arg)]))), new Boolean(data.hasSpace));
    }
    static [Export](consoleLogCompiler, toData) {
        return {
            args : consoleLogCompiler.args[O].map(toData),
            hasSpace : consoleLogCompiler.hasSpace[O]
        };
    }
}
class SinCompiler {
    constructor(input) {
        this.input = input;
    }
    compile() {
        return cF(input => `Math.sin(${input})`, String)
                 (fromC(cF(input => input ? input.compile() : new Primitive(undefined))(this.input)));
        //         (cF(input => input.compile(), String, true)(this.input));
    }

    static [Import](sin, data, fromData) {
        return new SinCompiler(cF(input => fromData(input, data), Primitive, true)(sin.input));
    }
    static [Export](sinCompiler, toData) {
        return sinCompiler.input[O] ? toData(sinCompiler.input[O]) : undefined;
    }
}
class NumberCompiler {
    constructor(number) {
        console.log("NumberCompiler loaded");
        this.number = cF(value => "".constructor(value), String, true)(number.value);
    }
    compile() {
        return this.number;
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
const compilerData = undefined;

// Import
const consoleLog = fromData(data, codeClassLoader);
const consoleLogCompiler = dependentControllerFromData(consoleLog, "compiler", compilerData, compilerClassLoader);
const compiled = consoleLogCompiler.compile();

// Changy
console.log("COMPILED :", compiled[O]);
compiled[C].on("set", (compiled) => {
    console.log("COMPILED :", compiled);
});
consoleLogCompiler.hasSpace.set(true);

const number = consoleLog.args[O][0].input[O];
number.value.set(7);
consoleLog.args[O][0].input.set(undefined);
consoleLog.args.splice(1,1, number);

const newNumber = fromData(["Number", undefined], codeClassLoader);
newNumber.value.set(200);
consoleLog.args[O][0].input.set(newNumber);

// Export
console.log(JSON.stringify(toData(consoleLog, codeClassLoader)));
console.log(JSON.stringify(dependentControllerToData(consoleLogCompiler, compilerClassLoader)));