import InstanceData from "../Data/InstanceData";
import SerializableClass, { Import, ID } from "../Serializable/SerializableClass";
import SerializableInstance from "../Serializable/SerializableInstance";

export type ClassLoader<ID, DATA, INSTANCE extends SerializableInstance<ID>> = (id : ID) => SerializableClass<ID, DATA, INSTANCE>

function fromData<ID, DATA, INSTANCE extends SerializableInstance<ID>>(instanceData : InstanceData<ID, DATA>, classLoader : ClassLoader<ID, DATA, INSTANCE>) : INSTANCE {
    const instance = classLoader(instanceData[0])[Import](instanceData[1], (instanceData : InstanceData<ID, DATA>) => {
        return fromData(instanceData, classLoader)
    });
    instance[ID] = instanceData[0];

    return instance;
}

export default fromData;