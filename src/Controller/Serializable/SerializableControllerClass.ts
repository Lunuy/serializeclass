import { Import, Export } from "../../Seirlaizable/SerializableClass";
import InstanceData from "../../Data/InstanceData";
import SerializableInstance from "../../Seirlaizable/SerializableInstance";
import Exportable from "../../Seirlaizable/Exportable";


interface SerializableControllerClass<TARGET, ID, DATA, INSTANCE extends SerializableInstance<ID>> extends Exportable<ID, DATA, INSTANCE> {
    [Import](target : TARGET, data : DATA, fromData : (target : TARGET, instanceData : InstanceData<ID, DATA>) => INSTANCE): INSTANCE
}

export default SerializableControllerClass;