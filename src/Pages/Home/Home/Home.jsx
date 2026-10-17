import Services from "../Services/Services";
import Works from "../Works/Works";
import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Support from "../../Support/Support";
import Reviews from "../Reviews/Reviews";

const reveiwsData = fetch('/reviews.json').then(res => res.json())


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Works></Works>
            <Services></Services>
            <Brands></Brands>
            <Support></Support>
            <Reviews reveiwsData={reveiwsData}></Reviews>
        </div>
    );
};

export default Home;