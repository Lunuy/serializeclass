import SerializableInstance from "../../Serializable/SerializableInstance";
import { ID, Export } from "../../Serializable/SerializableClass";
import { ClassLoader } from "../../serialize/fromData";
import InstanceData from "../../Data/InstanceData";
import { DependentControllerClassLoader } from "./dependentControllerFromData";


function dependentControllerToData<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID>>(serializableInstance : INSTANCE, classLoader : DependentControllerClassLoader<TARGET, ID, DATA, INSTANCE>) : DATA {
    return (
        classLoader(serializableInstance[ID])
        [Export](
            serializableInstance,
            (serializableInstance : SerializableInstance<ID>) => {
                return dependentControllerToData(serializableInstance, classLoader);
            }
        )
    );
}

export default dependentControllerToData;