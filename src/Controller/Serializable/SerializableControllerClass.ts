import { Import, Export } from "../../Serializable/SerializableClass";
import InstanceData from "../../Data/InstanceData";
import SerializableInstance from "../../Serializable/SerializableInstance";
import Exportable from "../../Serializable/Exportable";


interface SerializableControllerClass<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID, any>, CONTEXT> extends Exportable<ID, DATA, INSTANCE> {
    [Import](target : TARGET, data : DATA, fromData : (target : TARGET, instanceData : InstanceData<ID, DATA>) => INSTANCE, context : CONTEXT): INSTANCE
}

export default SerializableControllerClass;