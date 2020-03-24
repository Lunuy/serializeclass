import InstanceData from "../Data/InstanceData";
import SerializableClass, { Import, ID } from "../Seirlaizable/SerializableClass";
import SerializableInstance from "../Seirlaizable/SerializableInstance";

export type ClassLoader<ID, DATA> = (id : ID) => SerializableClass<ID, DATA>

function fromData<ID, DATA>(instanceData : InstanceData<ID, DATA>, classLoader : ClassLoader<ID, DATA>) : SerializableInstance<ID> {
    const instance = classLoader(instanceData[0])[Import](instanceData[1], (instanceData : InstanceData<ID, DATA>) => {
        return fromData(instanceData, classLoader)
    });
    instance[ID] = instanceData[0];

    return instance;
}

export default fromData;