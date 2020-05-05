import SerializableInstance from "../Serializable/SerializableInstance";
import Exportable from "../Serializable/Exportable";

type ExportableClassLoader<ID, DATA, INSTANCE extends SerializableInstance<ID, any>> = (id : ID) => Exportable<ID, DATA, INSTANCE>

export default ExportableClassLoader;