import InstanceData from "../Data/InstanceData";
import SerializableInstance from "./SerializableInstance";

export const Import = Symbol("Import");
export const Export = Symbol("Export");
export const ID = Symbol("ID");

interface SerializableClass<ID, DATA> {
    [Import](data : DATA, fromData : (instanceData : InstanceData<ID, DATA>) => SerializableInstance<ID>): SerializableInstance<ID>
    [Export](serializableInstance : SerializableInstance<ID>, toData : (serializableInstance : SerializableInstance<ID>) => InstanceData<ID, DATA>): DATA
}

export default SerializableClass;