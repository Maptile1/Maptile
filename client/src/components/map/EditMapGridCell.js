const EditMapGridCell = (props) => {
    let style='w-[20px] h-[20px] bg-white text-black border-[1px] border-maptile-background-mid'
    if(props.width / 10 === 2){
        style='w-[20px] h-[20px] bg-white text-black border-[1px] border-maptile-background-mid'
    }
    if(props.width / 10 === 3){
        style='w-[30px] h-[30px] bg-white text-black border-[1px] border-maptile-background-mid'
    }
    if(props.width / 10 === 4){
        style='w-[40px] h-[40px] bg-white text-black border-[1px] border-maptile-background-mid'
    }
    if(props.width / 10 === 5){
        style='w-[50px] h-[50px] bg-white text-black border-[1px] border-maptile-background-mid'
    }
    if(props.width / 10 === 6){
        style='w-[60px] h-[60px] bg-white text-black border-[1px] border-maptile-background-mid'
    }
    
    
    return(
        <div className={style}>
            
        </div>
    )
}

export default EditMapGridCell