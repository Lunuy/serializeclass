import InstanceData from "../../Data/InstanceData";

type ControllerData<TARGET, ID, DATA> = [
    TARGET,
    ControllerData<TARGET, ID, DATA>
];

export default ControllerData;