import SerializableInstance from "../Seirlaizable/SerializableInstance";
import { ID, Export } from "../Seirlaizable/SerializableClass";
import { ClassLoader } from "./fromData";
import InstanceData from "../Data/InstanceData";


function toData<ID, DATA, INSTANCE extends SerializableInstance<ID>>(serializableInstance : INSTANCE, classLoader : ClassLoader<ID, DATA, INSTANCE>) : InstanceData<ID, DATA> {
    return [
        serializableInstance[ID],
        classLoader(serializableInstance[ID])
        [Export](
            serializableInstance,
            (serializableInstance : SerializableInstance<ID>) => {
                return toData(serializableInstance, classLoader);
            }
        )
    ];
}

export default toData;