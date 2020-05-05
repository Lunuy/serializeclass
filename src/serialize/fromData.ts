import InstanceData from "../Data/InstanceData";
import SerializableClass, { Import, ID, Controllers } from "../Serializable/SerializableClass";
import SerializableInstance from "../Serializable/SerializableInstance";

export type ClassLoader<ID, DATA, INSTANCE extends SerializableInstance<ID, INSTANCE>> = (id : ID) => SerializableClass<ID, DATA, INSTANCE>

function fromData<ID, DATA, INSTANCE extends SerializableInstance<ID, any>>(instanceData : InstanceData<ID, DATA>, classLoader : ClassLoader<ID, DATA, INSTANCE>) : INSTANCE {
    const instance = classLoader(instanceData[0])[Import](instanceData[1], (instanceData : InstanceData<ID, DATA>) => {
        return fromData(instanceData, classLoader)
    });
    instance[ID] = instanceData[0];
    instance[Controllers] = {};

    return instance;
}

export default fromData;