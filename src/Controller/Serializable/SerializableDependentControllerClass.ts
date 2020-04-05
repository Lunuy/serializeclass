import { Import, Export } from "../../Serializable/SerializableClass";
import SerializableInstance from "../../Serializable/SerializableInstance";


interface SerializableDependentControllerClass<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID>> {
    [Import](target : TARGET, data : DATA, fromData : (target : TARGET, instanceData : DATA) => INSTANCE): INSTANCE
    [Export](serializableInstance : INSTANCE, toData : (serializableInstance : INSTANCE) => DATA): DATA
}

export default SerializableDependentControllerClass;