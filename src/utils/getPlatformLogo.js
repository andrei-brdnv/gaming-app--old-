import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox, faApple, faWindows, faAndroid } from "@fortawesome/free-brands-svg-icons";

const getPlatformLogo = (platform) => {
    switch (platform) {
        case "PlayStation":
            return <div><FontAwesomeIcon icon={faPlaystation} title={platform} /></div>;
        case "PlayStation 2":
            return <div><FontAwesomeIcon icon={faPlaystation} title={platform} /></div>;
        case "PlayStation 3":
            return <div><FontAwesomeIcon icon={faPlaystation} title={platform} /></div>;
        case "PlayStation 4":
            return <div><FontAwesomeIcon icon={faPlaystation} title={platform} /></div>;
        case "PlayStation 5":
            return <div><FontAwesomeIcon icon={faPlaystation} title={platform} /></div>;
        case "Xbox Series S/X":
            return <div><FontAwesomeIcon icon={faXbox} title={platform} /></div>;
        case "Xbox S":
            return <div><FontAwesomeIcon icon={faXbox} title={platform} /></div>;
        case "Xbox One":
            return <div><FontAwesomeIcon icon={faXbox} title={platform} /></div>;
        case "Xbox 360":
            return <div><FontAwesomeIcon icon={faXbox} title={platform} /></div>;
        case "Xbox":
            return <div><FontAwesomeIcon icon={faXbox} title={platform} /></div>;
        case "PC":
            return <div><FontAwesomeIcon icon={faWindows} title={platform} /></div>;
        case "Nintendo Switch":
            return <div><FontAwesomeIcon icon={faGamepad} title={platform} /></div>;
        case "iOS":
            return <div><FontAwesomeIcon icon={faApple} title={platform} /></div>;
        case "Android":
            return <div><FontAwesomeIcon icon={faAndroid} title={platform} /></div>;
        case "macOS":
            return <div><FontAwesomeIcon icon={faApple} title={platform} /></div>;
        case "Web":
            return <div><FontAwesomeIcon icon={faDesktop} title={platform} /></div>;
        default:
            return <div><FontAwesomeIcon icon={faGamepad} title={platform} /></div>;
    }
}

export default getPlatformLogo