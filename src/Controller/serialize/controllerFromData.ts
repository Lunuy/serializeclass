import SerializableControllerClass from "../Serializable/SerializableControllerClass";
import SerializableInstance from "../../Seirlaizable/SerializableInstance";
import InstanceData from "../../Data/InstanceData";
import { Import, ID } from "../../Seirlaizable/SerializableClass";


export type ControllerClassLoader<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID>> = (id : ID) => SerializableControllerClass<TARGET, ID, DATA, INSTANCE>

function controllerFromData<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID>>(target : TARGET, instanceData : InstanceData<ID, DATA>, classLoader : ControllerClassLoader<TARGET, ID, DATA, INSTANCE>) : INSTANCE {
    const instance = classLoader(instanceData[0])[Import](
        target,
        instanceData[1],
        (target : TARGET, instanceData : InstanceData<ID, DATA>) => {
            return controllerFromData(target, instanceData, classLoader);
        }
    );
    instance[ID] = instanceData[0];

    return instance;
}

export default controllerFromData;