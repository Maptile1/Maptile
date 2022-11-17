import { React, useState } from "react";

const RecentCard = (props) =>{
    const [image, setImage] = useState("https://maptilefiles.blob.core.windows.net/maptile-tileset-image/6372801adf17e9e9316f1b4c")
    
    return(
        <div className={`bg-gradient-to-br from-maptile-green/60 to-maptile-green-alt/60 bg-opacity-10 w-full h-[180px] rounded-[40px] z-30 relative`}>
        <div className="flex flex-row w-full h-[180px] overflow-hidden relative left-10">
            <div className="grid place-items-center w-1/3 h-full">
                <img
                    class="w-[160px] h-[160px] border border-white cursor-pointer object-cover object-center rounded-[50px] left-[50px] mt-1"
                    style={{ "image-rendering": "pixelated" }}
                    src={image}
                    alt=""
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        setImage(
                            "https://maptilefiles.blob.core.windows.net/maptile-tileset-image/6372801adf17e9e9316f1b4c"
                        );
                    }}
                />
            </div>
            <div className="flex flex-col w-2/3 text-white font-bold mt-10 left-10 relative">
                <div className="flex flex-row ">
                    <div className="text-5xl p-2 underline">{props.name}</div>
                </div>
                <div className="flex flex-row ">
                    <div className="text-1xl p-2 cursor-pointer text-center">Tileset</div>
                    
                </div>    
            </div>
        </div>
    </div>
    )
}

export default RecentCard