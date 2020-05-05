import { Import, Export } from "../../Serializable/SerializableClass";
import SerializableInstance from "../../Serializable/SerializableInstance";


interface SerializableDependentControllerClass<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID, any>, CONTEXT> {
    [Import](target : TARGET, data : DATA, fromData : (target : TARGET, instanceData : DATA) => INSTANCE, context : CONTEXT): INSTANCE
    [Export](serializableInstance : INSTANCE, toData : (serializableInstance : INSTANCE) => DATA): DATA
}

export default SerializableDependentControllerClass;