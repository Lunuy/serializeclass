import InstanceData from "../Data/InstanceData";
import SerializableInstance from "./SerializableInstance";
import Exportable from "./Exportable";

export const Import = Symbol("Import");
export const Export = Symbol("Export");
export const ID = Symbol("ID");

interface SerializableClass<ID, DATA, INSTANCE extends SerializableInstance<ID>> extends Exportable<ID, DATA, INSTANCE> {
    [Import](data : DATA, fromData : (instanceData : InstanceData<ID, DATA>) => INSTANCE): INSTANCE
}

export default SerializableClass;