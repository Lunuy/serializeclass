import SerializableControllerClass from "../Serializable/SerializableControllerClass";
import SerializableInstance from "../../Serializable/SerializableInstance";
import InstanceData from "../../Data/InstanceData";
import { Import, ID, Controllers } from "../../Serializable/SerializableClass";
import SerializableDependentControllerClass from "../Serializable/SerializableDependentControllerClass";


export type DependentControllerClassLoader<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID, any>> = (id : ID) => SerializableDependentControllerClass<TARGET, ID, DATA, INSTANCE>

function dependentControllerFromData<TARGET extends SerializableInstance<ID, any>, ID, DATA, INSTANCE extends SerializableInstance<ID, any>>(target : TARGET, controllerName : string | Symbol, instanceData : DATA, classLoader : DependentControllerClassLoader<TARGET, ID, DATA, INSTANCE>) : INSTANCE {
    if(!target[Controllers][<string>controllerName]) {
        const instance = classLoader(target[ID])[Import](
            target,
            instanceData,
            (target : TARGET, instanceData : DATA) => {
                return dependentControllerFromData(target, controllerName, instanceData, classLoader);
            }
        );
        instance[ID] = target[ID];
        instance[Controllers] = {};
        
        target[Controllers][<string>controllerName] = instance;
    }

    return target[Controllers][<string>controllerName];
}

export default dependentControllerFromData;