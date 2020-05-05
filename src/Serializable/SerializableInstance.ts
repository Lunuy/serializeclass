import { ID as Serailize_ID, Controllers } from "./SerializableClass";

interface SerializableInstance<ID, ControllerINSTANCE extends SerializableInstance<any, any>> {
    [Serailize_ID]: ID
    [Controllers]: {
        [controllerName : string]: ControllerINSTANCE
    }
}

export default SerializableInstance;