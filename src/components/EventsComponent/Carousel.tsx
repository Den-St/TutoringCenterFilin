import { Carousel,  } from "antd"
import Image from 'next/image';
import "./carouselStyles.scss";
type Props = {
    photos:string[]
}

export const CarouselComponent:React.FC<Props> = ({photos}) => {
    return <div>
        {!!photos?.length && <Carousel style={{width:'700px'}} >
        {photos?.map((photo:string) => <div className="" key={photo}>
            <Image sizes="(max-width: 768px) 100vw, 33vw" className="carouselImage" src={photo}  width={300} height={300} alt={'Фото з події'}/>
        </div> 
        )}
        </Carousel>}
    </div>
    // return <Carousel style={{width:'500px'}}>
    //     {photos.map(photo => <Image width={'300px'} height={'200px'} style={{'objectFit':'contain'}} src={photo} preview={{src:photo}}/>)}
    // </Carousel>
}