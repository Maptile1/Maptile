import Modal from "react-modal";
import { useState } from "react";
import Select from "react-select";

const CustomOptionsModal = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [customVal, setCustomVal] = useState(null)
    const [propName, setPropName] = useState(null)

    const typeOptions = [
        {value: "bool", label: "Boolean"},
        {value: "int", label: "Int"},
        {value: "float", label: "Float"},
        {value: "string", label: "String"}
    ]

    const boolOptions = [
        {value: true, label: "True"},
        {value: false, label: "False"}
    ]

    const handleTypeChange = (e) =>{
        setSelectedOption(e.value)
    }

    const handleBoolChange = (e) =>{
        setCustomVal(e.value)
    }

    const handleOtherChange = (e) => {
        setCustomVal(e.target.value)
    }

    const handleNameChange = (e) => {
        setPropName(e.target.value)
    }

    const handleSave = () => {
        
        if((selectedOption !== null && selectedOption !== "") && (propName !== null && propName !== "") && (customVal !== null && customVal !== "")){
            props.updateLayerProp(props.id,propName, selectedOption, customVal)
        }
    }

    const handleClose = () => {
        setPropName(null)
        setSelectedOption(null)
        setCustomVal(null)
        props.setCustomPropModal(false)
    }

    return (
        <Modal
        isOpen={props.modalOpen}
        onRequestClose={handleClose}
        contentLabel="Share"
        className="createModal bg-maptile-background-mid w-1/3 h-1/2 rounded-xl"
        overlayClassName="modalOverlay"
        >
        <div className="flex flex-col items-left justify-center text-2xl">
            <button
            className="text-white w-full text-right text-lg font-bold opacity-50"
            onClick={handleClose}
            >
            X
            </button>
            <div className="text-white text-4xl underline font-bold text-center">
            Add a Custom Property
            </div>
            <div class="flex flex-col space-y-5 items-left  ">
            <div className="flex flex-col w-full mt-8">
                <input
                    type="text"
                    id="name"
                    name="prop-name"
                    onChange={handleNameChange}
                    placeholder="Custom Property Name"
                    className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl"
                />
                <div className="flex flex-wrap items-center lg:justify-between justify-center mt-5 w-full">
                    <div className="w-full px-2	">
                        <Select placeholder="Custom Property Type" options={typeOptions} onChange={ handleTypeChange} />
                    </div>
                </div>
                {selectedOption === null ? <></>:selectedOption === "bool" ? 
                <div className="flex flex-wrap items-center lg:justify-between justify-center mt-5 w-full">
                    <div className="w-full px-2	">
                        <Select placeholder="Boolean Value" options={boolOptions} onChange={ handleBoolChange} />
                    </div>
                </div>
                :
                <input
                    type="text"
                    id="name"
                    name="prop-name"
                    placeholder={selectedOption + ` value`}
                    onChange={handleOtherChange}
                    className="w-full border-none bg-maptile-background-light outline-none placeholder:italic focus:outline-none text-white h-14 p-2.5 rounded-xl mt-5"
                />
                }
                <button
                onClick={()=>handleSave()}
                className="transform  rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl text-white p-2 mt-5 "
                >
                Save Custom Property
              </button>
            </div>
            </div>
        </div>
        </Modal>
    );
};

export default CustomOptionsModal;
