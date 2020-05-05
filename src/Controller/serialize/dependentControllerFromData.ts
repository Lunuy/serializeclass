import SerializableControllerClass from "../Serializable/SerializableControllerClass";
import SerializableInstance from "../../Serializable/SerializableInstance";
import InstanceData from "../../Data/InstanceData";
import { Import, ID, Controllers } from "../../Serializable/SerializableClass";
import SerializableDependentControllerClass from "../Serializable/SerializableDependentControllerClass";


export type DependentControllerClassLoader<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID, any>, CONTEXT> = (id : ID) => SerializableDependentControllerClass<TARGET, ID, DATA, INSTANCE, CONTEXT>

function dependentControllerFromData<TARGET extends SerializableInstance<ID, any>, ID, DATA, INSTANCE extends SerializableInstance<ID, any>, CONTEXT>(target : TARGET, controllerName : string | Symbol, instanceData : DATA, classLoader : DependentControllerClassLoader<TARGET, ID, DATA, INSTANCE, CONTEXT>, context? : CONTEXT) : INSTANCE {
    if(!target[Controllers][<string>controllerName]) {
        const instance = classLoader(target[ID])[Import](
            target,
            instanceData,
            (target : TARGET, instanceData : DATA) => {
                return dependentControllerFromData(target, controllerName, instanceData, classLoader, context);
            },
            context
        );
        instance[ID] = target[ID];
        instance[Controllers] = {};
        
        target[Controllers][<string>controllerName] = instance;
    }

    return target[Controllers][<string>controllerName];
}

export default dependentControllerFromData;