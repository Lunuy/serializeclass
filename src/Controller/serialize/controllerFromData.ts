import SerializableControllerClass from "../Serializable/SerializableControllerClass";
import SerializableInstance from "../../Serializable/SerializableInstance";
import InstanceData from "../../Data/InstanceData";
import { Import, ID, Controllers } from "../../Serializable/SerializableClass";


export type ControllerClassLoader<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID, any>, CONTEXT> = (id : ID) => SerializableControllerClass<TARGET, ID, DATA, INSTANCE, CONTEXT>

function controllerFromData<TARGET extends SerializableInstance<any, any>, ID, DATA, INSTANCE extends SerializableInstance<ID, any>, CONTEXT>(target : TARGET, controllerName : string | Symbol, instanceData : InstanceData<ID, DATA>, classLoader : ControllerClassLoader<TARGET, ID, DATA, INSTANCE, CONTEXT>, context? : CONTEXT) : INSTANCE {
    if(!target[Controllers][<string>controllerName]) {
        const instance = classLoader(instanceData[0])[Import](
            target,
            instanceData[1],
            (target : TARGET, instanceData : InstanceData<ID, DATA>) => {
                return controllerFromData(target, controllerName, instanceData, classLoader, context);
            },
            context
        );
        instance[ID] = instanceData[0];
        instance[Controllers] = {};

        target[Controllers][<string>controllerName] = instance;
    }

    return target[Controllers][<string>controllerName];
}

export default controllerFromData;