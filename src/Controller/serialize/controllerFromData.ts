import SerializableControllerClass from "../Serializable/SerializableControllerClass";
import SerializableInstance from "../../Serializable/SerializableInstance";
import InstanceData from "../../Data/InstanceData";
import { Import, ID } from "../../Serializable/SerializableClass";


export type Options<ID, INSTANCE extends SerializableInstance<ID>> = { willAttach? : INSTANCE };
export type ControllerClassLoader<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID>> = (id : ID) => SerializableControllerClass<TARGET, ID, DATA, INSTANCE>

function controllerFromData<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID>>(target : TARGET, instanceData : InstanceData<ID, DATA>, classLoader : ControllerClassLoader<TARGET, ID, DATA, INSTANCE>, options : Options<ID, INSTANCE>) : INSTANCE {
    if(options.willAttach !== undefined) {
        const instance = options.willAttach;
        delete options.willAttach;
        return instance;
    }
    
    const instance = classLoader(instanceData[0])[Import](
        target,
        instanceData[1],
        (target : TARGET, instanceData : InstanceData<ID, DATA>) => {
            return controllerFromData(target, instanceData, classLoader, options);
        }
    );
    instance[ID] = instanceData[0];

    return instance;
}

export default controllerFromData;