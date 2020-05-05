import SerializableInstance from "../Serializable/SerializableInstance";
import { ID, Export } from "../Serializable/SerializableClass";
import InstanceData from "../Data/InstanceData";
import ExportableClassLoader from "../loader/ExportableClassLoader";


function toData<ID, DATA, INSTANCE extends SerializableInstance<ID, any>>(serializableInstance : INSTANCE, classLoader : ExportableClassLoader<ID, DATA, INSTANCE>) : InstanceData<ID, DATA> {
    return [
        serializableInstance[ID],
        classLoader(serializableInstance[ID])
        [Export](
            serializableInstance,
            (serializableInstance : SerializableInstance<ID, any>) => {
                return toData(serializableInstance, classLoader);
            }
        )
    ];
}

export default toData;