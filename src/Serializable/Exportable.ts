import SerializableInstance from "./SerializableInstance";
import { Export } from "./SerializableClass";
import InstanceData from "../Data/InstanceData";

interface Exportable<ID, DATA, INSTANCE extends SerializableInstance<ID, any>> {
    [Export](serializableInstance : INSTANCE, toData : (serializableInstance : INSTANCE) => InstanceData<ID, DATA>): DATA
}

export default Exportable;