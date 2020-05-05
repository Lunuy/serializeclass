import InstanceData from "../Data/InstanceData";
import SerializableClass, { Import, ID, Controllers } from "../Serializable/SerializableClass";
import SerializableInstance from "../Serializable/SerializableInstance";

export type ClassLoader<ID, DATA, INSTANCE extends SerializableInstance<ID, INSTANCE>, CONTEXT> = (id : ID) => SerializableClass<ID, DATA, INSTANCE, CONTEXT>

function fromData<ID, DATA, INSTANCE extends SerializableInstance<ID, any>, CONTEXT>(instanceData : InstanceData<ID, DATA>, classLoader : ClassLoader<ID, DATA, INSTANCE, CONTEXT>, context? : CONTEXT) : INSTANCE {
    const instance = classLoader(instanceData[0])[Import](instanceData[1], (instanceData : InstanceData<ID, DATA>) => {
        return fromData(instanceData, classLoader, context);
    }, context);
    instance[ID] = instanceData[0];
    instance[Controllers] = {};

    return instance;
}

export default fromData;