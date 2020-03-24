import { ID as Serailize_ID } from "./SerializableClass";

interface SerializableInstance<ID> {
    [Serailize_ID]: ID
}

export default SerializableInstance;