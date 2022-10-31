const EditMapTileDisplay = (props) => {
    return(
        <div className="bg-white text-black w-[75px] h-[75px] ml-2 mr-2 mb-2 text-center justtify rounded-xl">
            {props.tile}
        </div>
    )
}

export default EditMapTileDisplay