import { Carousel, Image } from "antd"
import "./carouselStyles.scss";
type Props = {
    photos:string[]
}

export const CarouselComponent:React.FC<Props> = ({photos}) => {
    return <div>
        {!!photos?.length && <Carousel style={{width:'700px'}} >
        {photos?.map((photo:string) => <div className="" key={photo}>
            <Image src={photo} preview={{src:photo}}/>
        </div>
        )}
        </Carousel>}
    </div>
    // return <Carousel style={{width:'500px'}}>
    //     {photos.map(photo => <Image width={'300px'} height={'200px'} style={{'objectFit':'contain'}} src={photo} preview={{src:photo}}/>)}
    // </Carousel>
}